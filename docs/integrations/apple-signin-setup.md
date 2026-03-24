# Apple Sign-In Setup

## Required systems
- Apple Developer account
- Supabase authentication provider configuration
- website redirect URLs for local and production environments

## Minimum setup checklist
- create an App ID with Sign In with Apple enabled
- create a Services ID for the web client
- configure website domains and callback URLs
- create and download the Apple private key
- capture the Team ID and Key ID
- generate the Apple client secret
- enable Apple in Supabase Auth

## Canonical redirect URLs
- local: `http://localhost:3000/login/callback`
- production: `https://hushh.ai/login/callback`

## Maintenance rule
Keep Apple provider config in sync between Apple Developer settings, Supabase provider settings, and website callback URLs.
