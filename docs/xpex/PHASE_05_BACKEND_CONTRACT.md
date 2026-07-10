# Phase 05 — Backend contract and real persistence preparation

## Scope

Phase 05 prepares XpeX Creator Commerce OS to move from the current local MVP to real backend persistence through contracts and security planning only. It does not apply Prisma migrations, does not register live API endpoints, and does not add Mercado Livre, Dub, n8n, OpenAI, WhatsApp, paid ads, or other external integrations.

## Current backend architecture findings

- The backend is a NestJS application bootstrapped from `apps/backend/src/main.ts` and assembled through `apps/backend/src/app.module.ts`.
- The authenticated API surface is centralized in `apps/backend/src/api/api.module.ts`. Controllers listed in `authenticatedController` receive `AuthMiddleware` through `consumer.apply(AuthMiddleware).forRoutes(...authenticatedController)`.
- Route classes live under `apps/backend/src/api/routes` and commonly use Nest decorators such as `@Controller`, `@Get`, `@Post`, `@Put`, `@Delete`, `@Body`, `@Param`, and `@Query`.
- Organization scoping is commonly pulled from request context with `@GetOrgFromRequest() org: Organization` and then passed into services/repositories as `org.id`.
- User/audit context is commonly pulled with `@GetUserFromRequest() user: User` when user attribution is required.
- Permission checks exist through `PoliciesGuard`, `PermissionsService`, and `CheckPolicies`, but XpeX Commerce should not reuse or change any auth/permission behavior until endpoint design is reviewed.
- Prisma access is isolated in `libraries/nestjs-libraries/src/database/prisma`, with service/repository pairs and `PrismaRepository<T>` wrapping `PrismaService`.
- The real Prisma schema lives at `libraries/nestjs-libraries/src/database/prisma/schema.prisma`. Phase 05 intentionally leaves it untouched and documents a draft schema separately.
- Existing social publishing, OAuth providers, integrations, short links, and Postiz attribution remain out of scope for this phase.

## Target architecture

```text
Frontend XpeX local MVP
  -> future auth-protected XpeX Commerce API
  -> future Prisma repositories/services
  -> future Postgres persistence
  -> future reviewed integrations only:
     Mercado Livre, Dub/link provider, n8n, OpenAI/AI providers
```

The current frontend remains localStorage-first for demo and manual operation. Future backend work should introduce read/write endpoints behind existing authentication and organization isolation before the frontend switches its source of truth.

## Phase 05 guardrails

- No migration is generated or applied.
- No active XpeX Commerce controller is registered in `ApiModule`.
- No Prisma model is added to the real schema.
- No secrets, API keys, provider tokens, or live credentials are introduced.
- No calls are made to external APIs.
- Auth, OAuth providers, social publishing, payments, and existing Postiz workflows remain unchanged.

## Key risks before real persistence

1. **Multi-tenant isolation** — every query must include `organizationId`; missing filters could expose another organization's commerce data.
2. **Permissions** — commerce actions need explicit create/read/update/delete capabilities and a reviewed mapping to existing Postiz permissions.
3. **Input validation** — product URLs, slugs, lead notes, captions, and campaign names must be validated and length-limited before persistence.
4. **Secrets handling** — future Mercado Livre, Dub, n8n, and AI tokens must stay server-side and encrypted/isolated; none should reach the frontend.
5. **Sensitive lead data** — leads should store only necessary sales-intent data and avoid unnecessary personal, financial, or health information.
6. **LocalStorage/database duplication** — migration must prevent duplicate products, campaigns, leads, and links when local demo data is imported.
7. **Auditability** — backend records need `createdByUserId`, `updatedByUserId`, timestamps, and safe logs.

## Recommendation

Proceed with contracts first: API contract, schema draft, security plan, and local-to-backend migration plan. A later human-reviewed phase should add DTOs, service/repository modules, permission policies, tests, and finally Prisma migrations after the data model is accepted.
