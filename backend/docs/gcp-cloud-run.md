# GCP Backend Deployment

## Purpose

Deploy the identity exploration backend in `backend/` as a dedicated Cloud Run service with public API-key auth and Google OIDC reserved for internal worker callbacks. The product code itself now lives under `backend/app/hushh_intelligence/`.

## Production architecture

- Cloud Run service: public edge with app-level API-key auth
- Cloud SQL PostgreSQL: durable job and result storage
- Cloud Tasks: one task per identity item
- Vertex AI Gemini: grounded digital-footprint synthesis
- Google Maps Geocoding API: deterministic reverse geocoding
- Internal worker route: Google OIDC protected in-app

## Runtime contract

- `DATABASE_URL`
- `AUTH_ENABLED`
- `AUTH_MODE`
- `AUTH_AUDIENCE`
- `AUTH_ALLOWED_CALLER_EMAILS`
- `AUTH_API_KEY_HEADER`
- `AUTH_API_KEYS`
- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_CLOUD_LOCATION`
- `IDENTITY_EXPLORATION_MODEL`
- `IDENTITY_JOB_TTL_DAYS`
- `TASK_QUEUE_MODE`
- `TASK_QUEUE_PROJECT`
- `TASK_QUEUE_LOCATION`
- `TASK_QUEUE_NAME`
- `TASK_QUEUE_SERVICE_ACCOUNT_EMAIL`
- `WORKER_TARGET_URL`
- `WORKER_AUDIENCE`

## Local run

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
pytest
```

Recommended local env:

- `AUTH_ENABLED=false`
- `DATABASE_URL=sqlite:///./identity_exploration.db`
- `TASK_QUEUE_MODE=disabled`

## Cloud Build deploy

```bash
gcloud builds submit \
  --config backend/deploy/cloudbuild.yaml \
  --substitutions=_IMAGE_TAG=$(git rev-parse --short HEAD),_SERVICE_BASE_URL=https://replace-me.run.app \
  .
```

Important:

- `_SERVICE_BASE_URL` must be the Cloud Run base URL used as the worker ID-token audience
- `IDENTITY_BACKEND_DATABASE_URL` must exist in Secret Manager
- `IDENTITY_BACKEND_API_KEYS` should exist in Secret Manager and contain the developer-facing API keys
- the runtime service account needs Cloud SQL Client, Vertex AI User, Maps API access, Secret Manager access, and Cloud Tasks enqueuer permissions
- internal caller service accounts must be listed in `AUTH_ALLOWED_CALLER_EMAILS`
- public clients should send `X-Hushh-API-Key`; they do not need Google sign-in

## Cleanup

Schedule `POST /api/v1/internal/identity-exploration/cleanup` from Cloud Scheduler or another internal control plane. TTL defaults to 7 days and can be tuned with `IDENTITY_JOB_TTL_DAYS`.
