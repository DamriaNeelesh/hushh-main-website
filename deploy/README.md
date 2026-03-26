# Hushh.ai Website GCP Deployment

This repository keeps `main` as CI-only and uses branch-gated deploy lanes:

- `deploy_uat` -> `hushh-ai-uat`
- `deploy` -> `hushh-ai-prod`

Core deploy assets:

- `Dockerfile`
- `deploy/frontend.cloudbuild.yaml`
- `scripts/ci/require-branch-contains-main.sh`
- `scripts/ci/cloudrun-retention.sh`
- `scripts/ops/verify-website-env-secrets-parity.py`
- `scripts/ops/smoke-website-routes.sh`
- `scripts/env/use_profile.sh`

Expected Artifact Registry repository:

- `website-images` in `us-central1`

Expected Cloud Run service name:

- `hushh-ai-website`

Expected UAT public hostname:

- `https://uat.hushh.ai`

The production public hostname remains on Vercel until an explicit DNS cutover plan is approved.
