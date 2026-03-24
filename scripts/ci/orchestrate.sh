#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ARTIFACT_DIR="${CI_ARTIFACT_DIR:-"$ROOT_DIR/.artifacts/ci"}"
HOST="${CI_HOST:-127.0.0.1}"
PORT="${CI_PORT:-3005}"
MODE="${1:-all}"
SERVER_PID=""

mkdir -p "$ARTIFACT_DIR"

cleanup() {
  if [[ -n "${SERVER_PID}" ]]; then
    kill "${SERVER_PID}" >/dev/null 2>&1 || true
    wait "${SERVER_PID}" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT

run_logged() {
  local name="$1"
  shift

  echo "==> ${name}"
  (
    cd "$ROOT_DIR"
    "$@"
  ) 2>&1 | tee "$ARTIFACT_DIR/${name}.log"
}

wait_for_server() {
  local url="http://${HOST}:${PORT}/"

  for _ in {1..45}; do
    if curl -fsS "$url" >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done

  echo "Server failed to start at ${url}" | tee -a "$ARTIFACT_DIR/next-start.log"
  return 1
}

start_server() {
  echo "==> next_start"
  (
    cd "$ROOT_DIR"
    npm run start -- --hostname "$HOST" --port "$PORT"
  ) >"$ARTIFACT_DIR/next-start.log" 2>&1 &
  SERVER_PID=$!
  wait_for_server
}

run_npm_audit() {
  echo "==> npm_audit"
  (
    cd "$ROOT_DIR"
    npm audit --omit=dev --audit-level=high --json
  ) >"$ARTIFACT_DIR/npm-audit.json"
}

write_route_manifest() {
  (
    cd "$ROOT_DIR"
    node scripts/route-manifest.cjs --json
  ) >"$ARTIFACT_DIR/route-manifest.json"
}

case "$MODE" in
  all)
    run_logged typecheck npm run typecheck
    run_logged lint npm run lint
    run_logged test npm test
    run_logged build npm run build
    write_route_manifest
    run_logged audit_routes npm run audit:routes
    run_logged audit_security npm run audit:security
    run_logged audit_docs npm run audit:docs
    run_logged verify_oauth_branding npm run verify:oauth-branding
    run_npm_audit
    start_server
    run_logged audit_shell env BASE_URL="http://${HOST}:${PORT}" npm run audit:shell
    run_logged audit_seo env BASE_URL="http://${HOST}:${PORT}" npm run audit:seo
    run_logged verify_oauth_branding_live env BRANDING_BASE_URL="http://${HOST}:${PORT}" npm run verify:oauth-branding:live
    ;;
  route-manifest)
    write_route_manifest
    ;;
  *)
    echo "Unknown mode: ${MODE}" >&2
    exit 1
    ;;
esac
