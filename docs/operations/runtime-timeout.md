# Runtime Timeout Handling

## Problem
Long-running agent calls can exceed route execution limits if the handler does not define an explicit duration and abort behavior.

## Current policy
- set route-level duration where required
- use `AbortController` for upstream fetches
- return an explicit timeout error instead of hanging until platform termination

## Operational rules
- keep upstream timeouts lower than the route hard limit to leave response buffer
- surface timeout-specific errors cleanly to the client
- treat timeouts as a route policy concern, not a client concern
