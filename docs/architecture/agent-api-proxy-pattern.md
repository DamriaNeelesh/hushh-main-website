# Website Runtime Boundaries

## Purpose
The website keeps only the integrations that are part of the current public product surface:
- Hushh API reads for profile status
- Supabase auth and data access
- `/developers` runtime discovery for Kai and PKM

Detached route families such as A2A, WhatsApp relay flows, Plaid tooling pages, and Hushh Vani are intentionally out of scope.

## Active boundaries
- Browser code uses public Hushh API and public Supabase values only.
- Server routes use the service-role key only for read-only profile checks and related website operations.
- `/developers` renders runtime URLs for Kai, the REST base, and the MCP endpoint without embedding removed proxy contracts.

## Operational rules
- Do not reintroduce browser-visible secrets or dead provider envs.
- Keep the public website focused on canonical routes only: `/`, `/privacy`, `/terms`, `/developers`, auth/profile surfaces, and the kept product pages.
- When a feature is removed from the public route tree, its env contract and docs should be removed in the same pass.

## Related docs
- [Developer sign-in and console flow](../features/agent-signin.md)
- [API verification](../operations/api-verification.md)
- [Vercel timeout handling](../operations/vercel-timeout.md)
