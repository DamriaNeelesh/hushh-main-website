# Developer Console Sign-In

## Scope
The active developer sign-in flow lives under `/developers/login` and uses the same shared site shell as the rest of the website.

## Current shape
- route: `/developers/login`
- auth stack: Supabase OAuth
- primary outcomes:
  - authenticate the user
  - move the user into developer setup
  - keep developer identity consistent before consent requests are created in Kai

## Key implementation notes
- There is no active NextAuth route in the current website contract.
- Google and Apple continue through the Supabase-based auth flow.
- The developer surface should stay aligned to the runtime values exposed on `/developers`.

## Maintenance notes
- Keep the developer login route discoverable from the `/developers` hub and doc pages.
- If the auth provider surface changes, update this document and the live verification checklist together.
