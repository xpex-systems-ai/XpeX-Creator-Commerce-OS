# Phase 09 — Local to Backend Import and Controlled CRUD

Phase 09 adds a safe bridge from the browser `localStorage` demo state to the real authenticated XpeX Commerce backend. The objective is manual review first: local data is analyzed, validated, classified, and only then imported through existing individual backend create endpoints when backend opt-in and diagnostics are healthy.

## Current findings

- Frontend XpeX Commerce remains isolated under `apps/frontend/src/app/xpex-commerce`.
- The backend client uses the relative proxy base `/api/xpex-commerce`.
- Diagnostics are available at frontend `GET /api/xpex-commerce/diagnostics` and backend `GET /xpex-commerce/diagnostics`.
- Existing backend CRUD supports create, list, get by id, and update status for products, campaigns, creators, leads, link plans, and creative briefs.
- Auth and organization scope remain enforced by the existing backend controller decorators.

## New routes

- `/xpex-commerce/import` — localStorage analysis, dry-run plan, readiness checks, and manual import button.
- `/xpex-commerce/crud-tests` — controlled non-destructive CRUD checklist using `TEST_DEMO_XPEX` data.

## Import workflow

1. Browser `localStorage` remains the source of demo state.
2. `buildImportPlan` scans products, campaigns, creators, leads, link plans, and creative briefs.
3. `validateImportPlan` blocks missing critical fields, unsafe URLs, suspicious payloads, token-like fields, and unsupported statuses.
4. `detectPotentialDuplicates` warns before repeated names/slugs are imported.
5. Import is enabled only when `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`, diagnostics are `available`, and the plan status is `ready`.
6. Import uses individual authenticated backend endpoints; no bulk endpoint was added in this phase.
7. `localStorage` is never deleted automatically after import.

## Bulk endpoint decision

`POST /xpex-commerce/import/local-state` was evaluated and intentionally not implemented in Phase 09. Existing endpoints already provide authenticated organization-scoped create operations, while a bulk endpoint would increase duplicate-prevention and partial-failure risk. The safer Phase 09 decision is to use individual create calls after client-side dry-run validation.

## Safety criteria

- No Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, or paid ads integration is added.
- No secrets, manual tokens, API keys, or sensitive headers are introduced.
- No destructive database command or physical delete is part of the workflow.
- Backend failures preserve local fallback and never erase local data.

## Phase 10

Phase 10 should move to real internal operation with the first real product, first controlled campaign, and first creator pilot after backup, environment, migrations, rollback, active organization, and authenticated user checks are complete.
