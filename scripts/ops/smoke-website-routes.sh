#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-${1:-}}"

if [[ -z "${BASE_URL}" ]]; then
  echo "Usage: BASE_URL=https://example.com bash scripts/ops/smoke-website-routes.sh" >&2
  exit 1
fi

BASE_URL="${BASE_URL%/}"

check_status() {
  local path="$1"
  local expected="$2"
  local status
  status="$(curl -sS -o /dev/null -w '%{http_code}' "${BASE_URL}${path}")"
  if [[ "$status" != "$expected" ]]; then
    echo "Expected ${path} -> ${expected}, got ${status}" >&2
    exit 1
  fi
  echo "${path} -> ${status}"
}

check_redirect() {
  local path="$1"
  local expected_status="$2"
  local expected_location="$3"
  local expected_relative
  local headers
  headers="$(curl -sSI "${BASE_URL}${path}")"
  local status
  local location
  status="$(printf '%s' "$headers" | awk 'toupper($1) ~ /^HTTP/ {print $2; exit}')"
  location="$(printf '%s' "$headers" | awk 'tolower($1) == "location:" {print $2}' | tr -d '\r' | head -n1)"
  expected_relative="${expected_location#${BASE_URL}}"
  if [[ "$status" != "$expected_status" ]]; then
    echo "Expected ${path} -> ${expected_status}, got ${status}" >&2
    exit 1
  fi
  if [[ "$location" != "$expected_location" && "$location" != "$expected_relative" ]]; then
    echo "Expected ${path} redirect location ${expected_location} or ${expected_relative}, got ${location}" >&2
    exit 1
  fi
  echo "${path} -> ${status} ${location}"
}

check_status "/" "200"
check_status "/privacy" "200"
check_status "/terms" "200"
check_status "/developers" "200"
check_status "/developers/agent-kai" "200"
check_status "/contact-us" "200"
check_status "/login" "200"
check_redirect "/developers/rootEndpoints" "308" "${BASE_URL}/developers/agentic-apis"

echo "Website route smoke checks passed for ${BASE_URL}"
