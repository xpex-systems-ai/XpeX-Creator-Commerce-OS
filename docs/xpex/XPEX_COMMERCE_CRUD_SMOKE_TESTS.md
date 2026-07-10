# XpeX Commerce CRUD smoke tests

Manual smoke-test roteiro for the real XpeX Commerce backend in controlled homologation.

## Preconditions

- Authenticated Postiz user in the target environment.
- Active organization selected by the existing auth/session flow.
- Backend running with XpeX Commerce controller registered.
- Database migrated for the XpeX Commerce Prisma models.
- Frontend backend mode enabled only when intended: `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`.
- No real provider tokens, cookies, secrets, marketplace credentials, or paid-media credentials are pasted into requests or docs.

## Safe test data policy

Use internal dummy records only. Do not use real customer PII. Use obvious placeholders such as `Smoke Produto Interno`, `Lead Teste Interno`, and `https://example.com/xpex-smoke`.

## Diagnostics

1. Open `/xpex-commerce` while authenticated.
2. Confirm the Phase 08 diagnostics panel shows the current mode.
3. If backend mode is enabled, confirm backend status becomes available or fallback without exposing sensitive data.

Success: the panel reports mode, backend state, local fallback, organization scope, and external integrations off.
Blocker: unauthenticated diagnostics, secrets, raw user data, private URLs, or infrastructure details appear.

## Products

1. Create one product with dummy name, safe HTTPS URL, score, and notes.
2. Refresh the page.
3. Confirm the product remains visible in backend mode or local fallback mode.
4. Change status to a non-destructive status such as paused/draft when available.

Success: create, list, read-through-refresh, and status update work within the active organization.
Blocker: record appears in another organization, unsafe URL is accepted, or token-like payload is accepted.

## Campaigns

1. Create a campaign using the dummy product when IDs are available.
2. Use manual slogan, CTA, score, and channels.
3. Refresh and confirm persistence.
4. Update status only through the controlled status endpoint/UI.

Success: campaign is scoped to the current organization and does not call external providers.
Blocker: campaign creation bypasses organization ownership checks.

## Creators

1. Create or validate a creator record with a dummy creator profile.
2. Confirm list/read behavior in the active organization.
3. Update status if exposed by the controlled UI/API.

Success: creator data remains organization-scoped and contains no provider credentials.
Blocker: creator data leaks cross-organization.

## Leads

1. Create one dummy lead with non-real contact text.
2. Set status to new/contacted/qualified/converted only for test purposes.
3. Confirm no WhatsApp, email, SMS, or automation is triggered.

Success: lead CRUD is manual and scoped.
Blocker: any external notification, WhatsApp send, paid ad event, or unmasked sensitive data flow occurs.

## Link plans

1. Create a planned slug using a dummy destination such as `https://example.com/xpex-smoke`.
2. Confirm it is stored as a plan only.
3. Confirm no redirect, Dub link creation, or tracking provider call occurs.

Success: planned link is persisted without creating a real external short link.
Blocker: real redirect/link provider integration is triggered.

## Creative briefs

1. Create a manual creative brief with hook, slogan, caption, short script, and WhatsApp copy as text only.
2. Confirm no AI provider is called.
3. Refresh and confirm persistence or fallback behavior.

Success: brief is stored as manual content only.
Blocker: OpenAI or any AI/media provider call occurs.

## Exit criteria

- All six resources can be listed and manually created with safe dummy data.
- Status updates work where exposed.
- Fallback localStorage remains operational when backend calls fail.
- No destructive database command is required.
- No external integration is triggered.
