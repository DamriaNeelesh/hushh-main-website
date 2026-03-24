# Shared Hooks Guide

## `useHushhIdFlow`
This hook centralizes the "Get Your Hushh ID" authentication flow.

### Responsibilities
- read current auth state
- check whether the current user has completed registration
- route users to login, registration, or profile based on state
- expose a single loading surface for consumers

### Returned capabilities
- `handleGetHushhId`
- `isLoading`
- `isCheckingUser`
- `authLoading`
- `isAuthenticated`
- `user`
- direct navigation helpers for login, registration, and profile

### Usage rule
Prefer this shared hook over duplicating auth-flow branching inside buttons or route-local components.
