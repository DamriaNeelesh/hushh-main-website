---
name: website-runtime-verify
description: Verify hushh.ai website runtime readiness after local or deployed changes. Use when Codex needs to run or interpret route smoke checks, shell and SEO audits, env parity, public-domain verification, or Foundation route validation for this repository.
---

# Website Runtime Verify

Use this skill for post-change and post-deploy runtime verification.

## Sources of truth

- Read `references/runtime-sources.md` before changing verification logic.
- Treat `/foundation` as an audited first-class route even though it is hidden-chrome.

## Workflow

1. Confirm the target base URL.
2. Run the relevant repo checks:
   - `BASE_URL=... bash scripts/ops/smoke-website-routes.sh`
   - `BASE_URL=... npm run audit:shell`
   - `BASE_URL=... npm run audit:seo`
   - `python3 scripts/ops/verify-website-env-secrets-parity.py ...`
   - `python3 scripts/ops/verify-website-rollout.py ...`
3. Distinguish hidden-chrome routes from standard-shell routes when interpreting results.
4. Ensure verification covers `/foundation`, canonical metadata, and deploy image-tag traceability.

## Constraints

- Do not skip env parity or rollout verification for deployed environments.
- Hidden-chrome routes must still be auditable and reachable.
