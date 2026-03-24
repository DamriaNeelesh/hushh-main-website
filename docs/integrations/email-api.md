# Email API Integration

## Purpose
Document the email integration surface used by the website and related operational flows.

## Guidance
- Keep provider credentials server-side.
- Route browser-triggered email operations through server endpoints or trusted providers.
- Verify delivery behavior with controlled test payloads before using the flow in production demos.

## Operational checks
- confirm the API route returns the expected upstream status
- verify response parsing in the client
- ensure production domains and sender identities are valid
