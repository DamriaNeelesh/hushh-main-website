# Hushh Website

The website is a Next.js app with a shared site shell, marketing and product surfaces, developer flows, legal pages, and the active Hushh API plus Supabase integrations.

## Repository structure

- `src/` contains the application routes, shared shell, and feature components.
- `backend/` contains the Python FastAPI API scaffold plus its deploy/docs assets.
- `docs/` is the canonical home for architecture, design-system, feature, integration, operations, and runbook documentation.
- `support/postman/` contains durable Postman collections.
- `support/prompts/` contains durable prompt and query reference assets.
- The repo root is reserved for core project files, configs, and the canonical `README.md`.

## Getting started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:3002`.

## Local runtime contract

- `npm run dev`
  Starts local Turbopack dev on `http://localhost:3002` from the repo root.
- `npm run dev:clean`
  Removes `.next` first, then starts the same local dev server. Use this if valid routes suddenly start returning the app `404` page.
- `npm run dev:webpack`
  Starts webpack dev on `http://localhost:3002` for framework-level debugging.
- `npm run start:standalone:local`
  Starts the built standalone server on `http://localhost:3001` from the repo root and refuses to start if `.next/static` is missing.
- `npm run smoke:local:dev`
  Runs the Playwright smoke matrix against the local dev server.
- `npm run smoke:local:standalone`
  Runs the Playwright smoke matrix against the local standalone server.

Important local rule:

- Do not start the standalone server by `cd`-ing into `.next/standalone`.
  The local prod-like runtime must be started from the repo root so `.next/static` asset resolution stays intact.

## Verification

```bash
npm run local:ci
npm run build
npm run verify:oauth-branding
npm run audit:docs
BASE_URL=http://localhost:3002 npm run audit:shell
```

`npm run local:ci` is the local CI parity command for this repo. It runs the same curated blocking lane as `npm run ci:all` / `npm run release:ci`.

## Documentation

- [Architecture](docs/architecture/agent-api-proxy-pattern.md)
- [Next.js hardening baseline](docs/architecture/nextjs-hardening-baseline-2026-03-27.md)
- [Design system](docs/design-system/site-shell.md)
- [Features](docs/features/agent-signin.md)
- [Guides](docs/guides/hooks.md)
- [Integrations](docs/integrations/apple-signin-setup.md)
- [Operations](docs/operations/api-verification.md)
- [Backend deploy](backend/docs/gcp-cloud-run.md)
- [Runbooks](docs/runbooks/)
- [Runtime timeout handling](docs/operations/runtime-timeout.md)
- [Support assets](support/)
