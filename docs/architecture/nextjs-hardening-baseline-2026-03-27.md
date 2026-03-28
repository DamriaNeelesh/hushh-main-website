# Next.js Hardening Baseline

Date: 2026-03-27

## Stack

- Next.js `16.2.1`
- React `19.2.4`
- Node `22.x`
- App Router with Chakra UI, Framer Motion, Three.js, and mixed client/server rendering

## Current Inventory

- `60` page routes
- `13` route handlers
- `13` layouts
- `22` page routes marked as Client Components
- `99` client files inside `src/app`
- `238` total files inside `src/app`
- `77` total routes observed in `next experimental-analyze --output`
- Analyzer output written to `.next/diagnostics/analyze`

## Observed Risks Before This Pass

- Global `revalidate = 3600` was applied at the root layout and several static-content pages, pushing the app toward a broad ISR-style cache instead of explicit server-first boundaries.
- SEO infrastructure still depended on `next-sitemap`, `public/sitemap-0.xml`, and a custom `/server-sitemap.xml` route.
- Public metadata depended on third-party LinkedIn-hosted brand assets instead of first-party files.
- CI cached npm dependencies, but not `.next/cache`, leaving Next build performance on the table.
- UAT and production deploy workflows duplicated the same Cloud Build / Cloud Run / smoke-test logic.
- Several legacy alias routes remained part of the route tree, increasing crawl and maintenance noise.

## Phase 1 Goals

- Move sitemap, robots, and web manifest generation into native App Router metadata files.
- Replace fragile remote metadata assets with first-party assets in `public/`.
- Add web vitals attribution and reporting so performance work is measurable.
- Remove the broad public `revalidate = 3600` defaults from pages that are already file-backed/static.
- Deduplicate deploy logic while keeping CI and deploy responsibilities separate.
- Introduce a clear baseline document so follow-up work on Cache Components, server-first route groups, and client-island reduction can be measured.

## Follow-Up Work

- Run `next experimental-analyze --output` and capture the top client-heavy public routes in a tracked benchmark note.
- Split marketing/docs shell from authenticated application shell with route groups so public routes do not pay for auth providers by default.
- Evaluate `cacheComponents` after public routes are moved to explicit server-first boundaries.
- Normalize remaining manual metadata to `buildPageMetadata()` plus first-party OG assets.
- Continue collapsing legacy aliases into canonical redirects where safe.
