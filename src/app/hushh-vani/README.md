# Hushh वाणी (Vani)

> AI-powered vernacular marketing & localization for Bharat

## Overview

Hushh Vani is an **independent module** within the hushh.ai website that provides AI-powered marketing localization for the Indian market. It handles Hinglish/vernacular AI, voice & visual search, emotional/cultural bridge, social commerce, and Bharat-specific mobile-first experiences.

**Route:** `hushh.ai/hushh-vani`

## Architecture

```
src/app/hushh-vani/
├── page.jsx                    # Landing page (composes all sections)
├── layout.jsx                  # Independent layout (Plus Jakarta Sans font)
├── README.md                   # This file
├── lib/
│   ├── constants.js            # Design tokens, features, stats, nav items
│   └── supabase.js             # Own Supabase client (vani_* tables only)
├── components/
│   ├── HushhVaniHeader.jsx     # Sticky header with mobile menu
│   ├── HeroSection.jsx         # Hero with stats grid
│   ├── FeatureCard.jsx         # Individual feature card
│   ├── FeaturesSection.jsx     # Features grid section
│   ├── HowItWorks.jsx          # 4-step process section
│   ├── ContactSection.jsx      # Lead capture form
│   └── HushhVaniFooter.jsx     # Footer
├── migrations/
│   └── 001_create_vani_tables.sql  # Supabase schema
└── __tests__/
    ├── constants.test.js       # Design token & data tests
    ├── components.test.jsx     # Component render tests
    └── supabase.test.js        # Supabase helper tests
```

## Independence

This module is **fully self-contained** — zero dependencies on other hushh.ai modules:

- Own layout (`layout.jsx`)
- Own Supabase client (`lib/supabase.js`)
- Own design tokens (`lib/constants.js`)
- Own components (all under `components/`)
- Own database tables (all prefixed `vani_*`)

We keep it in the hushh.ai repo so other developers can easily work on it.

## Design System

Generated via **UI UX Pro Max**:

| Token          | Value                |
| -------------- | -------------------- |
| Style          | Flat Design          |
| Font           | Plus Jakarta Sans    |
| Primary        | `#7C3AED` (purple)   |
| Accent         | `#F59E0B` (saffron)  |
| CTA            | `#06B6D4` (cyan)     |
| Background     | `#FAFAFA`            |
| Text Primary   | `#1A1A2E`            |
| Text Secondary | `#4A4A68`            |

## Database Tables

All tables use the `vani_` prefix and live in the same Supabase instance:

- `vani_campaigns` — Marketing campaigns
- `vani_translations` — AI-generated translations
- `vani_analytics` — Event tracking
- `vani_influencers` — Influencer directory
- `vani_leads` — Contact form submissions

Run `migrations/001_create_vani_tables.sql` against your Supabase instance to set up the schema.

## Environment Variables

Uses the following env vars (already in `.env`):

```
NEXT_PUBLIC_SUPABASE_AUTH_URL=https://ibsisfnjxeowvdtvgzff.supabase.co
NEXT_PUBLIC_SUPABASE_AUTH_ANON_KEY=<anon-key>
```

## Development

```bash
# From the repo root
npm run dev

# Visit
open http://localhost:3000/hushh-vani
```

## Testing

```bash
# Run hushh-vani tests only
npx jest --testPathPattern="hushh-vani" --verbose

# Run all tests
npm test
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **Font:** Plus Jakarta Sans (Google Fonts via next/font)
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **Testing:** Jest + React Testing Library

## Contributing

1. Create a feature branch from `main`
2. Make changes only within `src/app/hushh-vani/`
3. Run tests: `npx jest --testPathPattern="hushh-vani"`
4. Open a PR against `main`
