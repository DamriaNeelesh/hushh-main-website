#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
HOST="${VISUAL_AUDIT_HOST:-127.0.0.1}"
EXISTING_DEV_PORT="${VISUAL_AUDIT_EXISTING_DEV_PORT:-3001}"
DEV_PORT="${VISUAL_AUDIT_DEV_PORT:-3101}"
PROD_PORT="${VISUAL_AUDIT_PROD_PORT:-3104}"
SERVER_PID=""
USING_EXISTING_DEV_SERVER=0

cleanup() {
  if [[ -n "${SERVER_PID}" ]]; then
    kill "${SERVER_PID}" >/dev/null 2>&1 || true
    wait "${SERVER_PID}" >/dev/null 2>&1 || true
    SERVER_PID=""
  fi
}

trap cleanup EXIT

wait_for_server() {
  local url="$1"

  for _ in {1..60}; do
    if curl -fsS "$url" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done

  echo "Server failed to start at ${url}" >&2
  return 1
}

start_dev_server() {
  cleanup
  if curl -fsS "http://${HOST}:${EXISTING_DEV_PORT}/" >/dev/null 2>&1; then
    DEV_PORT="$EXISTING_DEV_PORT"
    USING_EXISTING_DEV_SERVER=1
    return 0
  fi

  (
    cd "$ROOT_DIR"
    npm run dev -- --hostname "$HOST" --port "$DEV_PORT"
  ) >"$ROOT_DIR/.artifacts/visual/dev-server.log" 2>&1 &
  SERVER_PID=$!
  wait_for_server "http://${HOST}:${DEV_PORT}/"
}

start_prod_server() {
  cleanup
  (
    cd "$ROOT_DIR"
    npm run start -- --hostname "$HOST" --port "$PROD_PORT"
  ) >"$ROOT_DIR/.artifacts/visual/prod-server.log" 2>&1 &
  SERVER_PID=$!
  wait_for_server "http://${HOST}:${PROD_PORT}/"
}

mkdir -p "$ROOT_DIR/.artifacts/visual"

cd "$ROOT_DIR"
npm run playwright:install

start_dev_server
npm run audit:visual -- --base-url "http://${HOST}:${DEV_PORT}" --label "dev"

cleanup
npm run build
start_prod_server
npm run audit:visual -- --base-url "http://${HOST}:${PROD_PORT}" --label "prod"
