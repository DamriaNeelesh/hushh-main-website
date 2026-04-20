# Release Assets

These files define the release lane and must stay aligned:

- `.github/workflows/deploy-uat.yml`
- `.github/workflows/deploy-production.yml`
- `.github/actions/deploy-website/action.yml`
- `deploy/frontend.cloudbuild.yaml`
- `scripts/ci/require-ref-on-main.sh`
- `scripts/ops/verify-website-rollout.py`
- `scripts/ops/smoke-website-routes.sh`
- `docs/operations/gcp-website-deploy.md`
- `docs/runbooks/website-uat-deploy.md`
- `docs/operations/website-release-operator.md`
