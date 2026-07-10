# Phase 08 — Backend homologation and CRUD readiness

Phase 08 validates the real XpeX Commerce backend before any external integration is connected. The goal is operational confidence: authenticated diagnostics, controlled CRUD smoke tests, migration readiness, and a dashboard readiness panel while preserving localStorage demo mode and fallback behavior.

## Inspection findings

- The frontend backend client lives in `apps/frontend/src/app/xpex-commerce/lib/backend-client.ts` and uses relative authenticated requests through `/api/xpex-commerce` with `credentials: 'include'`, so browser calls reach the Nest backend through the existing `/api/` proxy instead of the public Next route segment.
- `storage-mode.ts` activates backend mode only when `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`; otherwise the route remains in localStorage demo mode.
- `use-xpex-commerce-store.ts` loads local state first, then attempts backend reads in backend mode and falls back to localStorage on failure.
- The backend controller is mounted at `/xpex-commerce` and already exposes organization-scoped routes for products, campaigns, creators, leads, link plans, and creative briefs.

## Files changed

- `apps/backend/src/api/routes/xpex-commerce/xpex-commerce.controller.ts`
- `apps/backend/src/api/routes/xpex-commerce/xpex-commerce.service.ts`
- `apps/frontend/src/app/xpex-commerce/lib/backend-client.ts`
- `apps/frontend/src/app/xpex-commerce/lib/storage-mode.ts`
- `apps/frontend/src/app/xpex-commerce/lib/use-xpex-commerce-store.ts`
- `apps/frontend/src/app/xpex-commerce/components/index.tsx`
- `apps/frontend/src/app/xpex-commerce/page.tsx`
- `docs/xpex/XPEX_COMMERCE_CRUD_SMOKE_TESTS.md`
- `docs/xpex/XPEX_COMMERCE_MIGRATION_READINESS.md`
- `docs/xpex/XPEX_COMMERCE_API_CONTRACT.md`
- `docs/xpex/XPEX_COMMERCE_SECURITY_PLAN.md`
- `README.md`

## Diagnostics

Phase 08 adds `GET /xpex-commerce/diagnostics` inside the existing authenticated Nest controller. It derives the organization from `GetOrgFromRequest()` and returns only safe technical status: `moduleEnabled`, `organizationScoped`, `prismaAvailable`, `timestamp`, and `supportedResources`.

The endpoint does not return users, leads, tokens, secrets, private URLs, credentials, or infrastructure details. The frontend consumes it as `/api/xpex-commerce/diagnostics`; the `/api/` prefix is the browser-facing proxy path and the localStorage fallback remains active if that proxied request fails.

## Operation modes

### localStorage demo

Default mode. If `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED` is not exactly `true`, the frontend keeps all XpeX Commerce operations in browser localStorage.

### Controlled backend

Opt-in mode. When `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`, the frontend calls the relative authenticated backend routes via `/api/xpex-commerce`. Diagnostics are checked along with the existing resource reads.

### Safe fallback

If diagnostics or CRUD reads fail, the dashboard marks fallback active, records a friendly reason, and continues using localStorage so the operator can keep testing safely.

## Safe CRUD validation

Use `docs/xpex/XPEX_COMMERCE_CRUD_SMOKE_TESTS.md` to validate products, campaigns, creators, leads, link plans, and creative briefs with dummy internal data only. Do not use real provider credentials, real customer PII, or production marketplace tokens.

## Migration readiness

Use `docs/xpex/XPEX_COMMERCE_MIGRATION_READINESS.md` before real migrations. Production migration requires human approval, backup validation, environment confirmation, Prisma schema review, rollback planning, and non-production smoke-test success.

## Out of scope

Phase 08 does not add Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, paid ads, payment, OAuth, or social publishing changes.

## Pending for Phase 09

Phase 09 is defined as: localStorage → backend import and first real tests with controlled internal data. It should add a reviewed import path, deduplication strategy, audit notes, and explicit validation before any external integrations are considered.
