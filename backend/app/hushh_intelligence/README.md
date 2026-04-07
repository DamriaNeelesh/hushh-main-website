# Hushh Intelligence

This package contains the identity-exploration product logic for the backend.

Structure:

- `api/` route handlers for public and internal endpoints
- `clients/` Google Maps and Gemini adapters
- `repositories/` Cloud SQL persistence logic
- `schemas/` request and response models
- `services/` orchestration, confidence scoring, and task dispatch

The generic FastAPI bootstrap, shared auth, config, database, and health routes remain under `backend/app/`.
