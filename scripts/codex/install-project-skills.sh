#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SOURCE_DIR="$ROOT_DIR/.codex/skills"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
DEST_DIR="$CODEX_HOME/skills"
MODE="symlink"
FORCE="0"

usage() {
  cat <<'EOF'
Usage: bash scripts/codex/install-project-skills.sh [--copy] [--symlink] [--force]

Installs repo-managed Codex skills from .codex/skills into $CODEX_HOME/skills.
Default mode is --symlink.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --copy)
      MODE="copy"
      shift
      ;;
    --symlink)
      MODE="symlink"
      shift
      ;;
    --force)
      FORCE="1"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

mkdir -p "$DEST_DIR"

installed_count=0

for skill_dir in "$SOURCE_DIR"/*; do
  if [[ ! -d "$skill_dir" || ! -f "$skill_dir/SKILL.md" ]]; then
    continue
  fi

  skill_name="$(basename "$skill_dir")"
  target_dir="$DEST_DIR/$skill_name"
  source_real="$(cd "$skill_dir" && pwd -P)"
  target_real=""

  if [[ -e "$target_dir" ]]; then
    target_real="$(cd "$target_dir" 2>/dev/null && pwd -P || true)"
    if [[ "$target_real" == "$source_real" ]]; then
      echo "Skill already installed: $skill_name -> $target_dir"
      continue
    fi

    if [[ "$FORCE" != "1" ]]; then
      echo "Refusing to replace existing skill at $target_dir without --force." >&2
      exit 1
    fi

    rm -rf "$target_dir"
  fi

  if [[ "$MODE" == "copy" ]]; then
    cp -R "$skill_dir" "$target_dir"
  else
    ln -s "$source_real" "$target_dir"
  fi

  installed_count=$((installed_count + 1))
  echo "Installed $skill_name ($MODE) -> $target_dir"
done

echo "Installed $installed_count repo-managed Codex skill(s). Restart Codex to pick up new skills."
