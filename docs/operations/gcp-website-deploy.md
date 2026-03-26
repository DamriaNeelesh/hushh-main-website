# GCP Website Deployment

The Hushh.ai website now supports a branch-gated Cloud Run deployment lane in addition to CI on `main`.

## Branch model

- `main`: CI only
- `deploy_uat`: automatic UAT deploy workflow
- `deploy`: manual production deploy workflow

Both deploy workflows refuse to run unless the target branch already contains the latest `origin/main`.

## Infrastructure contract

- UAT project: `hushh-ai-uat`
- Production project: `hushh-ai-prod`
- Region: `us-central1`
- Artifact Registry repository: `website-images`
- Cloud Run service: `hushh-ai-website`

## Deploy assets

- `Dockerfile`
- `deploy/frontend.cloudbuild.yaml`
- `.github/workflows/deploy-uat.yml`
- `.github/workflows/deploy-production.yml`
- `scripts/ci/require-branch-contains-main.sh`
- `scripts/ci/cloudrun-retention.sh`
- `scripts/ops/verify-website-env-secrets-parity.py`
- `scripts/ops/smoke-website-routes.sh`

## Required secret contract

The website mirrors `.env.example` into Secret Manager per environment. Public values are still stored as secrets so Cloud Build and Cloud Run can share one source of truth.

Key families:

- public site origin and developer URLs
- Hushh API base URL and anon key
- Firebase client config
- Firebase admin/auth service account JSON
- Supabase public URL, anon key, and service-role key

## Validation

Use the existing repo gate before deployment:

- `npm run release:ci`
- `npm run release:visual`

After Cloud Run deploy, verify:

- env parity with `scripts/ops/verify-website-env-secrets-parity.py`
- route smoke with `scripts/ops/smoke-website-routes.sh`
- Firebase sign-in on the deployed hostname

