# Site Search

## Purpose
The shared site header exposes search as a global discovery surface.

## Functional expectations
- keyboard shortcut support (`Cmd+K` / `Ctrl+K`)
- modal-based search interaction
- debounced input
- recent search persistence
- responsive layout

## Core parts
- search trigger in the shared header
- `SearchModal`
- search indexing and query utilities under the search feature implementation

## Design expectations
- Search belongs to the shared shell, not to individual pages.
- Modal, trigger, and keyboard behavior should remain consistent across route families.

## Regression notes
- Search should continue working after shell changes because it is mounted from the shared header path.
