# Website UAT Deploy Runbook

## Preconditions

- latest website changes are merged into `main`
- GCP project `hushh-ai-uat` exists with billing enabled
- required APIs are enabled
- Artifact Registry repository `website-images` exists in `us-central1`
- Secret Manager contains every key from `.env.example`
- Firebase auth project allows `uat.hushh.ai` as an authorized domain

## Trigger

Run `.github/workflows/deploy-uat.yml` manually and provide a `deploy_ref` from `main`.

## Workflow responsibilities

The UAT deploy workflow:

1. checks that the selected ref belongs to `main`
2. authenticates with the UAT deployment service account
3. builds and deploys the website image to Cloud Run
4. verifies runtime env parity
5. runs route smoke checks against both the deployed service URL and `https://uat.hushh.ai`

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
