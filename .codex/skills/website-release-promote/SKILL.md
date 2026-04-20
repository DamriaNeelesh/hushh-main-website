---
name: website-release-promote
description: Promote or review hushh.ai website releases through the repo's SHA-only UAT and production workflows. Use when Codex needs to validate a deploy SHA, inspect the GitHub Actions and Cloud Build release path, verify rollout outputs, or prepare rollback guidance for this repository.
---

# Website Release Promote

Use this skill for deploy promotion, rollout review, and rollback guidance on the hushh.ai website.

## Sources of truth

- Read `references/release-assets.md` before changing release workflow logic.
- Treat the GitHub workflows, shared deploy action, Cloud Build config, and deploy docs in that reference as authoritative.

## Workflow

1. Resolve the exact 40-character commit SHA being promoted from `main`.
2. Verify the workflow input, checkout, preflight validation, image tag, rollout verification, and deployment summary all use the same SHA.
3. Keep UAT and production deploy behavior aligned except for environment-specific inputs.
4. Preserve immutable promotion: no branch-name or tag-based deploy guidance.
5. Prefer repo verification commands over manual reasoning:
   - `npm run release:ci`
   - `npm run release:visual`
   - `BASE_URL=... bash scripts/ops/smoke-website-routes.sh`

## Constraints

- Rollback must redeploy the last known-good SHA.
- Deployment summaries should surface environment, deploy SHA, image tag, revision, frontend URL, and public URL.
- Do not introduce alternate deployment systems or bypass the shared deploy action.
