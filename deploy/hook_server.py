#!/usr/bin/env python3

import hmac
import json
import os
import subprocess
from datetime import datetime
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOST = os.environ.get("DEPLOY_HOOK_HOST", "127.0.0.1")
PORT = int(os.environ.get("DEPLOY_HOOK_PORT", "9001"))
HOOK_PATH = os.environ.get("DEPLOY_HOOK_PATH", "/deploy-hook")
HOOK_SECRET = os.environ.get("DEPLOY_HOOK_SECRET", "")
DEPLOY_BRANCH = os.environ.get("DEPLOY_BRANCH", "main")
DEPLOY_SCRIPT = os.environ.get(
    "DEPLOY_SCRIPT",
    "/www/image-2-prompt-site/deploy/deploy.sh",
)
LOG_DIR = Path(os.environ.get("DEPLOY_LOG_DIR", "/www/image-2-prompt-site/deploy/logs"))
REQUEST_LOG = LOG_DIR / "hook.log"


def write_log(message: str) -> None:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with REQUEST_LOG.open("a", encoding="utf-8") as fh:
        fh.write(f"[{timestamp}] {message}\n")


def safe_equal(left: str, right: str) -> bool:
    return hmac.compare_digest(left.encode("utf-8"), right.encode("utf-8"))


class DeployHookHandler(BaseHTTPRequestHandler):
    server_version = "ImagePromptiveDeployHook/1.0"

    def log_message(self, fmt: str, *args) -> None:
        write_log("%s - %s" % (self.address_string(), fmt % args))

    def do_POST(self) -> None:
        if self.path != HOOK_PATH:
            self.send_error(HTTPStatus.NOT_FOUND, "Not Found")
            return

        token = self.headers.get("X-Gitee-Token", "")
        event = self.headers.get("X-Gitee-Event", "")
        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length) if content_length > 0 else b"{}"

        if HOOK_SECRET and not safe_equal(token, HOOK_SECRET):
            write_log(f"Rejected request: invalid token, event={event}")
            self.respond({"ok": False, "error": "invalid token"}, HTTPStatus.UNAUTHORIZED)
            return

        try:
            payload = json.loads(raw_body.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self.respond({"ok": False, "error": "invalid json"}, HTTPStatus.BAD_REQUEST)
            return

        ref = str(payload.get("ref", ""))
        expected_ref = f"refs/heads/{DEPLOY_BRANCH}"

        if ref and ref != expected_ref:
            write_log(f"Ignored request: branch mismatch, ref={ref}")
            self.respond(
                {"ok": True, "ignored": True, "reason": f"branch mismatch: {ref}"},
                HTTPStatus.ACCEPTED,
            )
            return

        try:
            with REQUEST_LOG.open("a", encoding="utf-8") as stdout:
                subprocess.Popen(
                    [DEPLOY_SCRIPT],
                    stdout=stdout,
                    stderr=subprocess.STDOUT,
                    start_new_session=True,
                    env=os.environ.copy(),
                )
        except FileNotFoundError:
            write_log(f"Trigger failed: deploy script not found: {DEPLOY_SCRIPT}")
            self.respond(
                {"ok": False, "error": "deploy script not found"},
                HTTPStatus.INTERNAL_SERVER_ERROR,
            )
            return
        except Exception as exc:
            write_log(f"Trigger failed: {exc}")
            self.respond(
                {"ok": False, "error": "failed to launch deploy"},
                HTTPStatus.INTERNAL_SERVER_ERROR,
            )
            return

        write_log(f"Deployment accepted, event={event or 'unknown'}, ref={ref or '(empty)'}")
        self.respond({"ok": True, "accepted": True}, HTTPStatus.ACCEPTED)

    def do_GET(self) -> None:
        if self.path == "/health":
            self.respond({"ok": True, "service": "deploy-hook"}, HTTPStatus.OK)
            return

        self.send_error(HTTPStatus.METHOD_NOT_ALLOWED, "POST only")

    def respond(self, data: dict, status: HTTPStatus) -> None:
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    write_log(f"Deploy hook server started at {HOST}:{PORT}{HOOK_PATH}")
    server = ThreadingHTTPServer((HOST, PORT), DeployHookHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
