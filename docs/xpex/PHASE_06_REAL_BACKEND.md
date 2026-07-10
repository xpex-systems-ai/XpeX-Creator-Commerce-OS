# Phase 06 — Real backend persistence foundation

Phase 06 moves XpeX Creator Commerce OS from a localStorage-only operating MVP toward controlled backend persistence. The implementation intentionally stays small: Prisma models and authenticated NestJS endpoints for core manual records, with no external integrations and no secrets.

## Backend patterns inspected

- Authenticated API controllers are registered in `authenticatedController` inside `apps/backend/src/api/api.module.ts` and receive `AuthMiddleware` through `consumer.apply(AuthMiddleware).forRoutes(...)`.
- Organization scope is derived from request context through `@GetOrgFromRequest() org: Organization`; user context is available through `@GetUserFromRequest() user: User`.
- Existing routes pass `org.id` into service/repository calls instead of trusting request-body organization IDs.
- Prisma lives in `libraries/nestjs-libraries/src/database/prisma/schema.prisma`; service/repository patterns generally use injected Prisma services and organization-scoped queries.
- There is no checked-in Prisma migrations directory in this repository, so Phase 06 updates the schema and Prisma Client only, without creating or applying a migration.

## Prisma models added

The schema now includes controlled XpeX Commerce models:

- `XpeXCommerceProduct`
- `XpeXCommerceCampaign`
- `XpeXCommerceCreator`
- `XpeXCommerceLead`
- `XpeXCommerceLinkPlan`
- `XpeXCommerceCreativeBrief`
- `XpeXCommercePerformanceReport`
- `XpeXCommerceComplianceCheck`

All models are organization-scoped and include timestamps. Where useful, they relate to `Organization`, `User`, `Post`, and `Media` using existing schema primitives. Tenant-first indexes were added for organization, status, created time, campaign, product, and creator lookup patterns.

## Endpoints implemented

The following endpoints were registered under the authenticated backend controller list:

- `GET /xpex-commerce/products`, `GET /xpex-commerce/products/:id`, `POST /xpex-commerce/products`, `PATCH /xpex-commerce/products/:id/status`
- `GET /xpex-commerce/campaigns`, `GET /xpex-commerce/campaigns/:id`, `POST /xpex-commerce/campaigns`, `PATCH /xpex-commerce/campaigns/:id/status`
- `GET /xpex-commerce/creators`, `GET /xpex-commerce/creators/:id`, `POST /xpex-commerce/creators`, `PATCH /xpex-commerce/creators/:id/status`
- `GET /xpex-commerce/leads`, `GET /xpex-commerce/leads/:id`, `POST /xpex-commerce/leads`, `PATCH /xpex-commerce/leads/:id/status`
- `GET /xpex-commerce/link-plans`, `GET /xpex-commerce/link-plans/:id`, `POST /xpex-commerce/link-plans`, `PATCH /xpex-commerce/link-plans/:id/status`
- `GET /xpex-commerce/creative-briefs`, `GET /xpex-commerce/creative-briefs/:id`, `POST /xpex-commerce/creative-briefs`, `PATCH /xpex-commerce/creative-briefs/:id/status`

Performance report and compliance-check endpoints remain planned. Their models exist for persistence readiness, but write/read APIs are deferred until reporting and compliance workflows are designed.

## Security controls reviewed

- Routes are attached to the existing authenticated controller list and therefore use the current auth middleware.
- All create/list/get/update operations derive `organizationId` from the authenticated request, not from request payloads.
- Cross-record references are checked against the current organization before create operations.
- DTOs validate statuses, string lengths, and numeric scores from 0 to 10.
- URL fields are sanitized through `URL` parsing and only allow `http` and `https`; `javascript:`, `data:`, and other unsafe protocols are rejected.
- Payload keys matching token/secret/API-key/password/credential patterns are rejected.
- Physical deletes were not implemented; status updates support archiving.

## Explicit non-goals confirmed

Phase 06 does **not** add Mercado Livre API, Dub, n8n, OpenAI, paid ads automation, WhatsApp automation, provider tokens, API keys, secrets, OAuth changes, auth-flow changes, social-publishing logic changes, or frontend API calls. The frontend remains localStorage/demo-first.

## Next phase

Phase 07 should connect the frontend to these protected endpoints in a safe opt-in mode while keeping localStorage/demo mode as fallback. It should also add a migration following the project’s preferred production deployment process once that process is confirmed.
