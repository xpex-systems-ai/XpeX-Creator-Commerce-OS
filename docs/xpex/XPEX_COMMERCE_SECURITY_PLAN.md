# XpeX Commerce security and permissions plan

## Non-negotiable rules

- Every future XpeX Commerce record must be scoped by `organizationId`.
- Mutations must record `createdByUserId` and `updatedByUserId` where applicable.
- Lead records must contain only the minimum sales-intent fields needed for follow-up.
- Mercado Livre, Dub, n8n, OpenAI, and other provider tokens must never be sent to the frontend.
- External links are untrusted input and must be sanitized, normalized, and validated server-side.
- Logs must not include secrets, raw provider tokens, unnecessary PII, or full lead notes.

## Permissions model draft

Future endpoints should be auth-protected and organization-scoped. Suggested capabilities:

- `xpexCommerce.read`
- `xpexCommerce.create`
- `xpexCommerce.update`
- `xpexCommerce.delete`
- `xpexCommerce.export`
- `xpexCommerce.import`
- `xpexCommerce.integrations.manage` for later provider setup only

## Payload validation

- Reject unknown enum values for status, channel, report range, and compliance result.
- Enforce max lengths for names, slugs, captions, observations, and notes.
- Validate URLs with an allowlist-ready parser; reject `javascript:`, data URLs, local network URLs, and malformed schemes.
- Normalize slugs to predictable lowercase path segments before storage.
- Require explicit product/campaign/creator relationship identifiers when backend persistence is active.

## Isolation and audit

- Never trust `organizationId` from the request body; derive it from authenticated context.
- Never trust `userId` from the request body; derive it from authenticated context.
- Use repository methods that accept `organizationId` as a required argument.
- Include soft-delete fields only after retention requirements are reviewed.
- Add audit trail for imports, exports, status changes, and integration-triggered actions.

## Future rate limiting

- Rate-limit import/export, lead creation, link generation, and AI/automation-triggering endpoints.
- Add stricter limits for public/webhook style endpoints if introduced later.
- Monitor repeated validation failures without logging sensitive payloads.

## Checklist before any real migration

- [ ] API contract reviewed and accepted.
- [ ] Prisma draft reviewed against existing `Organization` and `User` models.
- [ ] Permission capabilities mapped to existing auth/permission architecture.
- [ ] DTO validation implemented and tested.
- [ ] Repository queries enforce `organizationId`.
- [ ] Secret-handling design approved.
- [ ] Import deduplication strategy tested.
- [ ] Logs reviewed for PII and token safety.
- [ ] Human approval granted for Prisma migration generation/application.

## Post-Phase 06 checklist

- [x] XpeX Commerce Prisma models added with `organizationId`, timestamps, and tenant-first indexes.
- [x] Implemented XpeX controller registered in the authenticated controller list so existing `AuthMiddleware` applies.
- [x] Implemented list/get/create/status-update operations derive organization scope from `@GetOrgFromRequest()`.
- [x] Implemented payload validation DTOs for strings, statuses, and score range `0..10`.
- [x] Implemented URL sanitization that rejects `javascript:`, `data:`, and non-HTTP(S) protocols.
- [x] Implemented payload key rejection for token/secret/API-key/password/credential fields.
- [x] Kept Mercado Livre API, Dub, n8n, OpenAI, paid ads, provider tokens, and secrets out of Phase 06.
- [x] Preserved frontend localStorage/demo mode; no frontend API switch was added.
- [ ] Add production Prisma migration after the deployment migration convention is confirmed; no migrations directory exists in the inspected Prisma tree.
- [ ] Add explicit permission policies such as `xpexCommerce.read/create/update` if the product decides to gate these routes beyond the existing authenticated organization context.
- [ ] Add audit logging and rate limits before exposing imports, exports, redirects, external integrations, or automated generation.

## Post-Phase 08 homologation checklist

- [x] Added authenticated diagnostics for safe backend readiness checks.
- [x] Diagnostics returns only module status, organization-scope confirmation, Prisma availability, timestamp, and supported resource names.
- [x] Frontend backend mode remains opt-in through `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`.
- [x] localStorage demo mode and fallback behavior remain available.
- [x] CRUD smoke-test roteiro documented for products, campaigns, creators, leads, link plans, and creative briefs.
- [x] Migration readiness checklist documented with backup, rollback, schema review, and human approval gates.
- [x] Mercado Livre, Dub, n8n, OpenAI, WhatsApp, paid ads, provider tokens, and secrets remain out of scope.
- [ ] Validate Phase 08 smoke tests with internal dummy data in a migrated non-production environment.
- [ ] Add explicit permission capabilities before exposing imports, exports, redirects, external integrations, or automation triggers.
