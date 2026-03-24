# Vercel Timeout Handling

## Problem
Long-running agent calls can exceed serverless execution limits if the route does not define an explicit duration and abort behavior.

## Current policy
- set route-level duration where required
- use `AbortController` for upstream fetches
- return an explicit timeout error instead of hanging until platform termination

## Operational rules
- keep timeouts lower than the platform hard limit to leave response buffer
- surface timeout-specific errors cleanly to the client
- treat timeouts as a route policy concern, not a client concern
