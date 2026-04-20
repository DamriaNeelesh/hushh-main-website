# GCP Website Deployment

The Hushh.ai website now runs a three-workflow release lane: one workflow for `main` CI, one for UAT deploys, and one for production deploys.

## Workflow model

- `Main CI`: validates pull requests and pushes to `main`
- `UAT Deploy`: manually deploys a selected `main` commit SHA to the UAT Cloud Run service
- `Production Deploy`: manually deploys a selected `main` commit SHA to the production Cloud Run service

Both deploy workflows refuse to run unless the selected checkout commit is a full 40-character SHA contained in `origin/main`.

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

Both deploy workflows accept a `deploy_sha` input.

- required value: a full 40-character commit SHA
- supported values: commit SHAs that belong to `main`
- rejected values: branch names, tags, short SHAs, and SHAs outside `main`
- recommended value for promotion: the exact commit SHA that already passed `Main CI`

## Promotion model

Promote the same SHA end to end:

1. select the exact `main` SHA that passed CI
2. deploy that SHA to UAT
3. verify env parity, route smoke, and auth flows in UAT
4. deploy the exact same SHA to production
5. roll back by redeploying the last known-good SHA if needed

The website still rebuilds once per environment because public Next.js build variables are environment-specific today. The optimization in this repo removes branch-promotion churn and duplicate CI runs, while keeping the UAT and production runtime contracts separate.
