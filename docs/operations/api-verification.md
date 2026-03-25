# API Verification

## Purpose
Use this runbook to verify the active website integrations without relying on local Docker stacks.

## Current verification set
1. verify the Hushh API anon key against the dummy `check-user` path
2. verify Supabase auth settings via the auth project HTTP endpoint
3. verify the Supabase data root/OpenAPI endpoint
4. verify the service-role key with a read-only `user_profiles` select
5. verify `supabase projects list` and `supabase functions list --project-ref ...` for cloud state only

## Important note on Supabase CLI
- `supabase status` is a local-container command and needs Docker because it checks the local Supabase stack.
- It is not required for cloud verification of this website.

## Failure handling
- confirm the environment values match the website runtime contract in `.env.example`
- confirm the route or secret being tested is still part of the public website
- remove stale envs and detached features instead of keeping broken checks around
