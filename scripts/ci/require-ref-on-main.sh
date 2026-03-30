#!/usr/bin/env bash
set -euo pipefail

MAIN_BRANCH="${1:-main}"

if [ -z "$MAIN_BRANCH" ]; then
  echo "Usage: scripts/ci/require-ref-on-main.sh <main-branch>" >&2
  exit 1
fi

CURRENT_SHA="$(git rev-parse HEAD)"

git fetch --no-tags origin "$MAIN_BRANCH"

if ! git merge-base --is-ancestor "$CURRENT_SHA" "origin/$MAIN_BRANCH"; then
  echo "Refusing deploy: ${CURRENT_SHA} is not contained in origin/${MAIN_BRANCH}." >&2
  echo "Deploy using a commit SHA, tag, or branch that belongs to ${MAIN_BRANCH}." >&2
  exit 1
fi

echo "Deploy preflight passed: ${CURRENT_SHA} is contained in origin/${MAIN_BRANCH}."
