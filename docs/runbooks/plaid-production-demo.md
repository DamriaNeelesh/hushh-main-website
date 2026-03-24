# Plaid Production Demo Runbook

## Purpose
Use this runbook when preparing or verifying a Plaid-backed demo flow on the website.

## Checklist
- verify link-token generation
- verify exchange and resume behavior
- verify visible success/failure states
- verify any demo data expectations before the session

## Operational notes
- keep credentials and provider secrets outside the browser
- verify demo routes after any shell-wide layout change because the flow includes utility-style pages
