#!/usr/bin/env python3

import json
import logging
import os
import subprocess
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOOK_HOST = os.getenv("HOOK_HOST", "127.0.0.1")
HOOK_PORT = int(os.getenv("HOOK_PORT", "9001"))
HOOK_SECRET = os.getenv("HOOK_SECRET", "")
DEPLOY_BRANCH = os.getenv("DEPLOY_BRANCH", "main")
DEPLOY_REMOTE = os.getenv("DEPLOY_REMOTE", "origin")
DEPLOY_PATH = Path(os.getenv("DEPLOY_PATH", "/www/image-2-prompt-site")).resolve()
DEPLOY_SCRIPT = DEPLOY_PATH / "deploy" / "deploy.sh"


logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s %(message)s",
)


def is_push_for_main(payload: dict) -> bool:
    ref = payload.get("ref", "")
    return ref in {f"refs/heads/{DEPLOY_BRANCH}", DEPLOY_BRANCH}


def trigger_deploy() -> None:
    env = os.environ.copy()
    env["DEPLOY_BRANCH"] = DEPLOY_BRANCH
    env["DEPLOY_REMOTE"] = DEPLOY_REMOTE
    subprocess.Popen(
        ["bash", str(DEPLOY_SCRIPT)],
        cwd=str(DEPLOY_PATH),
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


class HookHandler(BaseHTTPRequestHandler):
    server_version = "ImagePromptiveGiteeHook/1.0"

    def _json_response(self, status: HTTPStatus, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self) -> None:
        if self.path != "/deploy-hook":
            self._json_response(HTTPStatus.NOT_FOUND, {"error": "not found"})
            return

        token = self.headers.get("X-Gitee-Token", "")
        event = self.headers.get("X-Gitee-Event", "")

        if HOOK_SECRET and token != HOOK_SECRET:
            logging.warning("Rejected webhook because token mismatch")
            self._json_response(HTTPStatus.FORBIDDEN, {"error": "invalid token"})
            return

        if event not in {"Push Hook", "Push"}:
            self._json_response(HTTPStatus.ACCEPTED, {"ignored": True, "reason": "not push event"})
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length)

        try:
            payload = json.loads(raw_body.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self._json_response(HTTPStatus.BAD_REQUEST, {"error": "invalid json"})
            return

        if not is_push_for_main(payload):
            self._json_response(
                HTTPStatus.ACCEPTED,
                {"ignored": True, "reason": "not target branch"},
            )
            return

        if not DEPLOY_SCRIPT.exists():
            logging.error("Deploy script not found: %s", DEPLOY_SCRIPT)
            self._json_response(HTTPStatus.INTERNAL_SERVER_ERROR, {"error": "deploy script missing"})
            return

        logging.info("Accepted Gitee push webhook for branch %s", DEPLOY_BRANCH)
        trigger_deploy()
        self._json_response(HTTPStatus.ACCEPTED, {"queued": True})

    def do_GET(self) -> None:
        if self.path == "/healthz":
            self._json_response(HTTPStatus.OK, {"ok": True})
            return
        self._json_response(HTTPStatus.NOT_FOUND, {"error": "not found"})

    def log_message(self, fmt: str, *args) -> None:
        logging.info("%s - %s", self.address_string(), fmt % args)


def main() -> None:
    server = ThreadingHTTPServer((HOOK_HOST, HOOK_PORT), HookHandler)
    logging.info("Start Gitee webhook server on %s:%s", HOOK_HOST, HOOK_PORT)
    server.serve_forever()


if __name__ == "__main__":
    main()
