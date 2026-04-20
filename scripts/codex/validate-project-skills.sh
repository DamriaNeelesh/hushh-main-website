#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SKILLS_DIR="$ROOT_DIR/.codex/skills"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
VALIDATOR="${CODEX_SKILL_VALIDATOR:-$CODEX_HOME/skills/.system/skill-creator/scripts/quick_validate.py}"

if [[ ! -f "$VALIDATOR" ]]; then
  echo "Skill validator not found at $VALIDATOR" >&2
  echo "Set CODEX_SKILL_VALIDATOR or install the system skill-creator validator under \$CODEX_HOME." >&2
  exit 1
fi

validated_count=0

for skill_dir in "$SKILLS_DIR"/*; do
  if [[ ! -d "$skill_dir" || ! -f "$skill_dir/SKILL.md" ]]; then
    continue
  fi

  echo "Validating $(basename "$skill_dir")"
  python3 "$VALIDATOR" "$skill_dir"
  validated_count=$((validated_count + 1))
done

echo "Validated $validated_count repo-managed Codex skill(s)."
