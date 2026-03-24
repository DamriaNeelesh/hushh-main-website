# API Verification

## Purpose
Use this runbook to verify that proxy-backed integrations are working through the website surface.

## Typical verification steps
1. start the website locally
2. issue a request against the website proxy route
3. confirm:
   - HTTP success status
   - `upstreamUrl`
   - `upstreamStatus`
   - parsed response body

## Example focus areas
- A2A agents
- email integrations
- WhatsApp integrations

## Failure handling
- inspect whether the browser is hitting the website route or a direct upstream URL
- inspect timeout behavior
- inspect upstream status separately from route status
