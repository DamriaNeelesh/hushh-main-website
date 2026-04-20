# Website Release Operator Checklist

Use this checklist when promoting the website through the SHA-only release lane.

## Local confidence gate

Run the curated checks before requesting or executing a deploy:

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run audit:routes`
- `BASE_URL=http://localhost:3002 npm run audit:shell`
- `BASE_URL=http://localhost:3002 npm run audit:seo`
- `npm run audit:security`
- `npm run audit:docs`
- `npm run audit:brand`
- `npm run verify:oauth-branding`
- `npm audit --omit=dev --audit-level=high`

## Promotion flow

1. Select the exact 40-character commit SHA from `main`.
2. Deploy that SHA to UAT with `.github/workflows/deploy-uat.yml`.
3. Verify UAT route smoke, `/foundation`, and auth flows.
4. Promote the exact same SHA to production with `.github/workflows/deploy-production.yml`.
5. Record the deployed SHA, image tag, Cloud Run revision, frontend URL, and public URL.

## Rollback

Rollback uses the same deploy workflow with the last known-good `main` SHA. Do not roll back with branch names, tags, or short SHAs.

## Codex skills

Install the repo-managed skills into your Codex home:

- `npm run codex:skills:install`
- `npm run codex:skills:validate`
