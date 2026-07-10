# Phase 07 — Frontend/backend connection with localStorage fallback

Phase 07 connects the isolated XpeX Creator Commerce OS frontend to the authenticated XpeX Commerce backend in a safe, opt-in, reversible mode. The default remains **localStorage demo mode**.

## Backend route inspection

The backend controller is mounted at `@Controller('/xpex-commerce')` and exposes authenticated organization-scoped routes through `GetOrgFromRequest()`. Campaign and creative creation also read the authenticated user with `GetUserFromRequest()`.

Implemented routes:

- Products: `GET /xpex-commerce/products`, `GET /xpex-commerce/products/:id`, `POST /xpex-commerce/products`, `PATCH /xpex-commerce/products/:id/status`.
- Campaigns: `GET /xpex-commerce/campaigns`, `GET /xpex-commerce/campaigns/:id`, `POST /xpex-commerce/campaigns`, `PATCH /xpex-commerce/campaigns/:id/status`.
- Creators: `GET /xpex-commerce/creators`, `GET /xpex-commerce/creators/:id`, `POST /xpex-commerce/creators`, `PATCH /xpex-commerce/creators/:id/status`.
- Leads: `GET /xpex-commerce/leads`, `GET /xpex-commerce/leads/:id`, `POST /xpex-commerce/leads`, `PATCH /xpex-commerce/leads/:id/status`.
- Link plans: `GET /xpex-commerce/link-plans`, `GET /xpex-commerce/link-plans/:id`, `POST /xpex-commerce/link-plans`, `PATCH /xpex-commerce/link-plans/:id/status`.
- Creative briefs: `GET /xpex-commerce/creative-briefs`, `GET /xpex-commerce/creative-briefs/:id`, `POST /xpex-commerce/creative-briefs`, `PATCH /xpex-commerce/creative-briefs/:id/status`.

DTOs reject unsafe keys matching token/secret/API key/password/credential patterns, validate enum statuses, limit text lengths, and sanitize external URLs to `http`/`https` only.

## Storage modes

- **Modo Demo Local**: default mode. `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED` is unset or different from `true`; all reads/writes use `localStorage`.
- **Modo Backend Controlado**: opt-in mode. It is enabled only with `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`; the frontend uses relative authenticated calls to the existing backend and does not store tokens in browser code.

## Fallback behavior

When backend mode is enabled, the store attempts to load products, campaigns, leads, link plans, and creative briefs from the backend. Any failed API/network response sets backend availability to unavailable, displays a friendly warning, and continues with localStorage state. Create/status operations also attempt backend first and then preserve the local operation so the UI does not break.

## Files changed

- `apps/frontend/src/app/xpex-commerce/lib/backend-client.ts` — isolated backend client and DTO/UI mappers.
- `apps/frontend/src/app/xpex-commerce/lib/storage-mode.ts` — storage mode and availability helpers.
- `apps/frontend/src/app/xpex-commerce/lib/use-xpex-commerce-store.ts` — single store layer for backend/localStorage operation.
- `apps/frontend/src/app/xpex-commerce/components/index.tsx` — SafetyNotice and OperationModeBadge.
- XpeX Commerce pages under `apps/frontend/src/app/xpex-commerce` — mode-aware notices and dashboard status.
- `docs/xpex/XPEX_COMMERCE_API_CONTRACT.md` and `README.md` — Phase 07 state notes.

## Migration safety check

The Prisma schema includes XpeX Commerce models in `libraries/nestjs-libraries/src/database/prisma/schema.prisma`, but no `migrations` directory was found under `libraries/nestjs-libraries/src/database/prisma`. Because this repository does not show an established migration folder/pattern here, Phase 07 does **not** create or run a destructive migration. Real database use may require a safe migration before enabling backend mode against a persistent environment.

## Explicitly out of scope

Mercado Livre API, Dub, n8n, OpenAI/AI provider calls, WhatsApp automation, paid ads automation, OAuth provider changes, auth-flow changes, secrets, and Postiz social publishing changes remain out of scope.

## Validation checklist

- [ ] Default mode renders as localStorage/demo.
- [ ] Backend mode is opt-in through `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`.
- [ ] Backend failures show an availability warning and continue in localStorage.
- [ ] Products, campaigns, leads, links, and creative briefs use the shared store layer.
- [ ] No frontend token or secret storage was added.
- [ ] No Mercado Livre, Dub, n8n, OpenAI, WhatsApp, or paid ads integration was added.

## Phase 08 proposal

Activate the database migration/environment safely, then run authenticated CRUD tests against a real database for products, campaigns, leads, link plans, and creative briefs before any marketplace, link-provider, orchestration, AI, or paid distribution integration.
