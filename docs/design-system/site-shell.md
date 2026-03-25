# Site Shell Design System

## Canonical shell
The home page visual system is the source of truth for the entire site shell.

Shared shell primitives:
- funding ribbon
- fixed header
- page spacer below the fixed chrome
- shared footer
- common safe-area and bottom-reserve behavior
- reusable page-frame tokens for shared spacing, surfaces, and typography rhythm

## Layout contract
- `SiteChromeShell` is the canonical shell implementation used by both the app-router and page-router surfaces.
- `GlobalSiteChrome` is the app-router adapter around that shared shell.
- `ContentWrapper` is a page frame, not a second header offset system.
- Pages should not render their own header/footer variants unless they are audited no-chrome exceptions.
- Footer spacing owns the safe-area reservation for the floating bottom bar.
- Legacy `pages/` routes still inherit the shared shell through the common client layout so the homepage shell remains the visual source of truth across the site.

## Route behavior
- Standard routes render exactly one:
  - `data-site-header`
  - `data-site-footer`
  - `data-site-shell-spacer`
- Hidden-chrome routes remain opt-out only when the shell blocks the primary route purpose.

## Visual rules
- Preserve page copy and imagery.
- Standardize shell styling through shared wrappers, not route-local tweaks.
- Use the same logo treatment, neutral surface palette, serif/sans contrast, and spacing rhythm established by the home page.
- Keep home-only section rules scoped to the home page so they do not leak into other route families.

## Current note
- The floating bottom bar is intentionally hidden right now. Footer spacing still owns the bottom safe-area behavior.

## Verification
- `npm run audit:shell`
- `npm run build`
- `npm run verify:oauth-branding`
- `npm run audit:docs`
