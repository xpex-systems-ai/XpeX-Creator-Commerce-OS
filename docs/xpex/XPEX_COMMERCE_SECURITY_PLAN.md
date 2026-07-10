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
