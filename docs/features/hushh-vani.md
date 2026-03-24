# Hushh Vani

## Overview
Hushh Vani is a self-contained module inside the website for vernacular marketing and localization.

## Route
- `/hushh-vani`

## Local module boundaries
- own layout
- own components
- own constants and helpers
- own tests
- own Supabase-facing helpers and table namespace

## Maintenance rule
Keep Hushh Vani internally modular, but align any global chrome, footer, and bottom-bar behavior with the shared site shell unless a route-level exception is intentionally documented.
