#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
WEB_DIR="${PROJECT_DIR}/web"
LOG_DIR="${PROJECT_DIR}/deploy/logs"
LOCK_FILE="${PROJECT_DIR}/deploy/deploy.lock"
LOG_FILE="${LOG_DIR}/deploy.log"
BRANCH="${DEPLOY_BRANCH:-main}"
REMOTE_NAME="${DEPLOY_REMOTE:-origin}"
SKIP_GIT_PULL="${SKIP_GIT_PULL:-0}"

mkdir -p "${LOG_DIR}"

timestamp() {
  date "+%Y-%m-%d %H:%M:%S"
}

log() {
  printf "[%s] %s\n" "$(timestamp)" "$*" | tee -a "${LOG_FILE}"
}

run() {
  log "Run: $*"
  "$@" 2>&1 | tee -a "${LOG_FILE}"
}

cleanup() {
  local exit_code="$1"

  if [[ "${exit_code}" -eq 0 ]]; then
    log "Deployment finished"
  else
    log "Deployment failed with exit code: ${exit_code}"
  fi
}

trap 'cleanup $?' EXIT

exec 9>"${LOCK_FILE}"

if ! flock -n 9; then
  log "Another deployment is already running, skipping this trigger"
  exit 75
fi

log "Start deployment for ${PROJECT_DIR}"

if [[ "${SKIP_GIT_PULL}" != "1" ]]; then
  run git -C "${PROJECT_DIR}" fetch "${REMOTE_NAME}" "${BRANCH}"
  run git -C "${PROJECT_DIR}" pull --ff-only "${REMOTE_NAME}" "${BRANCH}"
else
  log "Skip git pull because SKIP_GIT_PULL=1"
fi

run sudo docker compose -f "${WEB_DIR}/docker-compose.yml" up -d --build
run sudo docker compose -f "${WEB_DIR}/docker-compose.yml" ps
