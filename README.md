# Hushh Website

The website is a Next.js app with a shared site shell, marketing and product surfaces, developer flows, legal pages, and the active Hushh API plus Supabase integrations.

## Repository structure

- `src/` contains the application routes, shared shell, and feature components.
- `docs/` is the canonical home for architecture, design-system, feature, integration, operations, and runbook documentation.
- `support/postman/` contains durable Postman collections.
- `support/prompts/` contains durable prompt and query reference assets.
- The repo root is reserved for core project files, configs, and the canonical `README.md`.

## Getting started

```bash
npm install --legacy-peer-deps
npm run dev -- --port 3001
```

Open `http://localhost:3001`.

## Verification

```bash
npm run build
npm run verify:oauth-branding
npm run audit:docs
BASE_URL=http://localhost:3001 npm run audit:shell
```

## Documentation

- [Architecture](docs/architecture/agent-api-proxy-pattern.md)
- [Design system](docs/design-system/site-shell.md)
- [Features](docs/features/agent-signin.md)
- [Guides](docs/guides/hooks.md)
- [Integrations](docs/integrations/apple-signin-setup.md)
- [Operations](docs/operations/api-verification.md)
- [Runbooks](docs/runbooks/)
- [Timeout runbook](docs/operations/vercel-timeout.md)
- [Support assets](support/)
