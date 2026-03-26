#!/usr/bin/env bash
set -euo pipefail

EXPECTED_BRANCH="${1:-}"

if [ -z "$EXPECTED_BRANCH" ]; then
  echo "Usage: scripts/ci/require-branch-contains-main.sh <expected-branch>" >&2
  exit 1
fi

CURRENT_BRANCH="${GITHUB_REF_NAME:-$(git rev-parse --abbrev-ref HEAD)}"

if [ "$CURRENT_BRANCH" != "$EXPECTED_BRANCH" ]; then
  echo "Refusing workflow run: expected branch '$EXPECTED_BRANCH' but got '$CURRENT_BRANCH'." >&2
  exit 1
fi

git fetch --no-tags origin main

if ! git merge-base --is-ancestor origin/main HEAD; then
  echo "Refusing workflow run: '$CURRENT_BRANCH' must contain the latest origin/main." >&2
  echo "Update '$CURRENT_BRANCH' from main before deploying." >&2
  exit 1
fi

echo "Branch preflight passed: '$CURRENT_BRANCH' contains the latest origin/main."

