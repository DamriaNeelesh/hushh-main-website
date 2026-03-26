#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(git -C "$SCRIPT_DIR/../.." rev-parse --show-toplevel)"
source "$SCRIPT_DIR/runtime_profile_lib.sh"

usage() {
  cat <<'EOF'
Usage:
  scripts/env/use_profile.sh <uat-remote|prod-remote> [--dry-run]

Description:
  Activates a website runtime profile by copying:
    .env.<runtime-profile>.local -> .env.local

Notes:
  - Active local runtime file remains `.env.local`.
  - This command is intended for deliberate remote-infra testing only.
EOF
}

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ] || [ "$#" -lt 1 ]; then
  usage
  exit 0
fi

RAW_PROFILE="${1:-}"
shift || true

DRY_RUN=false
for arg in "$@"; do
  case "$arg" in
    --dry-run)
      DRY_RUN=true
      ;;
    *)
      echo "Unknown option: $arg" >&2
      usage
      exit 1
      ;;
  esac
done

if ! PROFILE="$(normalize_runtime_profile "$RAW_PROFILE")"; then
  echo "Invalid profile: $RAW_PROFILE" >&2
  echo "Expected one of: uat-remote, prod-remote" >&2
  exit 1
fi

SOURCE_FILE="$REPO_ROOT/$(runtime_profile_source "$PROFILE")"
TARGET_FILE="$REPO_ROOT/.env.local"

if [ ! -f "$SOURCE_FILE" ]; then
  echo "Missing runtime profile file: $SOURCE_FILE" >&2
  echo "Create it from ${SOURCE_FILE}.example before activation." >&2
  exit 1
fi

if [ "$DRY_RUN" != "true" ]; then
  cp "$SOURCE_FILE" "$TARGET_FILE"
fi

summary_key() {
  local file="$1"
  local key="$2"
  python3 - "$file" "$key" <<'PY'
import pathlib
import sys

path = pathlib.Path(sys.argv[1])
key = sys.argv[2]
needle = f"{key}="

for line in path.read_text(encoding="utf-8").splitlines():
    if line.startswith(needle):
        print(line.split("=", 1)[1])
        break
else:
    print("")
PY
}

echo "Activated website runtime profile: $PROFILE"
echo "Description: $(runtime_profile_description "$PROFILE")"
echo "NEXT_PUBLIC_SITE_URL: $(summary_key "$SOURCE_FILE" "NEXT_PUBLIC_SITE_URL")"
echo "NEXT_PUBLIC_DEVELOPER_API_URL: $(summary_key "$SOURCE_FILE" "NEXT_PUBLIC_DEVELOPER_API_URL")"
echo "HUSHH_API_BASE_URL: $(summary_key "$SOURCE_FILE" "HUSHH_API_BASE_URL")"
if [ "$DRY_RUN" = "true" ]; then
  echo "Dry run: no files were copied."
else
  echo "Active file: $TARGET_FILE"
fi

