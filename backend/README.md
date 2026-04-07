# Hushh Identity Exploration Backend

This service is a Python FastAPI backend for async identity exploration jobs. It is designed for Google Cloud Run, uses Cloud SQL PostgreSQL plus Cloud Tasks in production, and supports developer-facing API keys while keeping Google OIDC for internal worker callbacks.

## Structure

- `app/` contains the FastAPI bootstrap, shared config/auth/database code, and health route.
- `app/hushh_intelligence/` contains the Hushh Intelligence API package with routes, schemas, services, repositories, Google adapters, and package-level docs.
- `deploy/` contains the Cloud Build deploy config.
- `docs/` contains backend-specific operational notes.
- `tests/` contains API and worker tests.
- `Dockerfile` builds the production Cloud Run image.
- `.env.example` documents the local runtime contract.

## Main endpoints

- `POST /api/v1/identity-exploration/jobs`
- `GET /api/v1/identity-exploration/jobs/{job_id}`
- `POST /api/v1/internal/identity-exploration/worker`
- `POST /api/v1/internal/identity-exploration/cleanup`
- `GET /api/v1/health`

## Local development

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
pytest
```

Recommended local defaults:

- keep `AUTH_ENABLED=false`
- use `DATABASE_URL=sqlite:///./identity_exploration.db`
- keep `TASK_QUEUE_MODE=disabled`
- inject fake services in tests instead of calling Google or Cloud Tasks

Recommended auth modes:

- `AUTH_MODE=api_key` if public clients should use `X-Hushh-API-Key`
- `AUTH_MODE=hybrid` if you want to accept both API keys and Google ID tokens on public routes
- internal routes still expect Google OIDC when auth is enabled

## Production expectations

- public developer traffic should use `X-Hushh-API-Key` backed by `AUTH_API_KEYS` from Secret Manager
- Gemini and Google provider credentials remain server-side only
- internal worker callbacks should continue to use Google OIDC
- caller service accounts for internal routes must be listed in `AUTH_ALLOWED_CALLER_EMAILS`
- `DATABASE_URL` should point to Cloud SQL PostgreSQL
- `TASK_QUEUE_MODE=cloud_tasks`
- `WORKER_TARGET_URL` should point at the service's internal worker route
- another Hushh product submits jobs and polls status; this service does not write back into Hushh profile stores in v1

## GCP deploy

```bash
gcloud builds submit \
  --config backend/deploy/cloudbuild.yaml \
  --substitutions=_IMAGE_TAG=$(git rev-parse --short HEAD) \
  .
```

The Cloud Build config deploys the service from `backend/Dockerfile`, configures Cloud SQL and Cloud Tasks settings, injects server-side API keys from Secret Manager, and expects the PostgreSQL connection string from Secret Manager.

For product-specific backend code, start in [app/hushh_intelligence/README.md](/Users/ankitkumarsingh/Desktop/hushh.ai-website/backend/app/hushh_intelligence/README.md).
