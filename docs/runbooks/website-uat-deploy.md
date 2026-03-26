# Website UAT Deploy Runbook

## Preconditions

- latest website changes are merged into `main`
- `deploy_uat` has been updated from `main`
- GCP project `hushh-ai-uat` exists with billing enabled
- required APIs are enabled
- Artifact Registry repository `website-images` exists in `us-central1`
- Secret Manager contains every key from `.env.example`
- Firebase auth project allows `uat.hushh.ai` as an authorized domain

## Trigger

Push `deploy_uat` or run `.github/workflows/deploy-uat.yml` manually.

## Workflow responsibilities

The UAT deploy workflow:

1. checks branch containment against `main`
2. authenticates with the UAT deployment service account
3. builds and deploys the website image to Cloud Run
4. verifies runtime env parity
5. runs route smoke checks against the deployed service URL

## Post-deploy checks

- `/`
- `/privacy`
- `/terms`
- `/developers`
- `/developers/agent-kai`
- `/contact-us`
- `/login`

Also confirm:

- Google sign-in on `uat.hushh.ai`
- Apple sign-in on `uat.hushh.ai`
- session cookie creation and logout flow
- developer pages and contact form render correctly
