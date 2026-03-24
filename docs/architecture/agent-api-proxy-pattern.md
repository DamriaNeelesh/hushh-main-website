# Agent API Proxy Pattern

## Purpose
The website talks to external agents through server-side Next.js routes instead of direct browser calls.

## Why the proxy exists
- Prevent CORS failures from browser-to-agent calls.
- Keep agent URLs, secrets, and auth headers on the server.
- Add a single place for logging, timeout policy, and request shaping.
- Return upstream diagnostics without exposing the browser directly to third-party services.

## Request flow
```text
Browser -> /api/a2a/[agent] -> Next.js route -> upstream agent service
```

The browser correctly sees requests against `https://www.hushh.ai/api/a2a/...`. The upstream agent URL is visible in the JSON response payload and server logs.

## Core responsibilities of the route
- Map an internal agent slug to an upstream URL.
- Convert frontend input into the expected JSON-RPC or service-specific payload.
- Apply timeout and abort handling.
- Return `upstreamUrl`, `upstreamStatus`, and parsed response data for debugging.

## Operational rules
- Do not call agent services directly from client components.
- Keep per-agent URL mapping and auth handling server-side.
- Prefer explicit timeout handling for long-running agent requests.
- Treat the proxy route as the public contract and the upstream as implementation detail.

## Related docs
- [A2A website integration](../integrations/a2a-website-integration.md)
- [API verification](../operations/api-verification.md)
- [Vercel timeout handling](../operations/vercel-timeout.md)
