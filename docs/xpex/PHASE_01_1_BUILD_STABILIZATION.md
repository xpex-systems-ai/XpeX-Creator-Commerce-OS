# Phase 01.1 Build Stabilization — XpeX Creator Commerce OS

## Problem

The frontend build failed because Next.js/Turbopack attempted to resolve `Plus Jakarta Sans` through `next/font/google`. In restricted build environments, the remote Google Fonts lookup can fail and block the `apps/frontend` production build.

## Cause found

The remote font dependency was found in four frontend files:

- `apps/frontend/src/app/(app)/layout.tsx`
- `apps/frontend/src/app/(extension)/layout.tsx`
- `apps/frontend/src/app/(provider)/layout.tsx`
- `apps/frontend/src/components/new-layout/layout.component.tsx`

Each file imported `Plus_Jakarta_Sans` from `next/font/google`, which made font resolution an external build-time dependency.

## Solution applied

- Removed the `next/font/google` dependency from the affected frontend layouts.
- Replaced it with the local CSS class `font-xpex-system`.
- Added a safe system font stack: `Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.
- Added initial XpeX brand token definitions in `apps/frontend/src/app/xpex-brand-tokens.ts` for future visual work.

This keeps a modern premium sans-serif look while avoiding mandatory external font downloads during build.

## XpeX brand token foundation

The new token file defines conceptual colors for future Phase 02 UI surfaces:

- XpeX navy
- XpeX electric blue
- XpeX gold
- XpeX green
- Dark background
- Card background

These tokens should be used in Phase 02 for isolated XpeX landing/internal dashboard surfaces before any heavier global rebrand is attempted.

## Safety notes

No authentication flow, OAuth provider, database schema, Prisma migration, payment flow, social provider integration, Mercado Livre API integration, or production agent behavior was changed.

The upstream Postiz attribution and AGPL-3.0 license posture remain preserved.

## Next steps

- Keep frontend build validation as a prerequisite for Phase 02 modules.
- Use the XpeX brand tokens in isolated XpeX pages first.
- Add Produtos, Campanhas, Criadores, and dashboard screens only after build stability is confirmed.
