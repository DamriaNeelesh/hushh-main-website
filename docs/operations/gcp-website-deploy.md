# GCP Website Deployment

The Hushh.ai website now runs a three-workflow release lane: one workflow for `main` CI, one for UAT deploys, and one for production deploys.

## Workflow model

- `Main CI`: validates pull requests and pushes to `main`
- `UAT Deploy`: manually deploys a selected `main` ref or commit SHA to the UAT Cloud Run service
- `Production Deploy`: manually deploys a selected `main` ref or commit SHA to the production Cloud Run service

Both deploy workflows refuse to run unless the selected checkout commit is contained in `origin/main`.

## Infrastructure contract

- UAT project: `hushh-ai-uat`
- Production project: `hushh-ai-prod`
- Region: `us-central1`
- Artifact Registry repository: `website-images`
- Cloud Run service: `hushh-ai-website`

## Deploy assets

- `Dockerfile`
- `deploy/frontend.cloudbuild.yaml`
- `.github/workflows/cicd.yml`
- `.github/workflows/deploy-uat.yml`
- `.github/workflows/deploy-production.yml`
- `.github/actions/deploy-website/action.yml`
- `scripts/ci/require-ref-on-main.sh`
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

## Deployment inputs

Both deploy workflows accept a `deploy_ref` input.

- default: `main`
- supported values: branch names, tags, or commit SHAs that belong to `main`
- recommended value for promotion: the exact commit SHA that already passed `Main CI`

The website still rebuilds once per environment because public Next.js build variables are environment-specific today. The optimization in this repo removes branch-promotion churn and duplicate CI runs, while keeping the UAT and production runtime contracts separate.
