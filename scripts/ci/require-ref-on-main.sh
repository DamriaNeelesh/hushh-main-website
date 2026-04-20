#!/usr/bin/env bash
set -euo pipefail

MAIN_BRANCH="${1:-main}"
EXPECTED_SHA="${2:-$(git rev-parse HEAD)}"

if [ -z "$MAIN_BRANCH" ]; then
  echo "Usage: scripts/ci/require-ref-on-main.sh <main-branch> [deploy-sha]" >&2
  exit 1
fi

if ! [[ "$EXPECTED_SHA" =~ ^[0-9a-fA-F]{40}$ ]]; then
  echo "Refusing deploy: expected a full 40-character commit SHA, got '$EXPECTED_SHA'." >&2
  exit 1
fi

CURRENT_SHA="$(git rev-parse HEAD)"

if [ "$CURRENT_SHA" != "$EXPECTED_SHA" ]; then
  echo "Refusing deploy: checked out commit '$CURRENT_SHA' does not match requested SHA '$EXPECTED_SHA'." >&2
  exit 1
fi

git fetch --no-tags origin "$MAIN_BRANCH"

if ! git merge-base --is-ancestor "$CURRENT_SHA" "origin/$MAIN_BRANCH"; then
  echo "Refusing deploy: ${CURRENT_SHA} is not contained in origin/${MAIN_BRANCH}." >&2
  echo "Deploy using a full 40-character commit SHA that belongs to ${MAIN_BRANCH}." >&2
  exit 1
fi

echo "Deploy preflight passed: ${CURRENT_SHA} is contained in origin/${MAIN_BRANCH}."
