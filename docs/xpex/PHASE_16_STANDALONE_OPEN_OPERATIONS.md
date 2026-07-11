# Phase 16 — XpeX Standalone Open Operations

## Root cause

The global Postiz proxy remained the effective auth boundary for every non-public frontend route. When the previous public preview gate was not present in the Vercel runtime, `/xpex-commerce` correctly fell through to the global unauthenticated redirect and landed on `/auth/login`.

## Decision

Phase 16 turns `/xpex-commerce` and all of its subroutes into a standalone, localStorage-first XpeX operations surface that is open by default. This is intentionally scoped to the XpeX corridor only: open the corridor, not the entire house.

## Auth boundary

- `/xpex-commerce` and subroutes can render without a Postiz auth cookie by default.
- `/auth`, `/analytics`, `/settings`, `/launches`, `/integrations`, `/provider`, `/modal` and other Postiz private routes remain in the original protected flow.
- `/api` is not added to the proxy bypass and is not made public by this phase.
- `XPEX_COMMERCE_REQUIRE_AUTH=true` reactivates the normal Postiz auth requirement for `/xpex-commerce` if a deployment needs rollback.

## Safety model

Phase 16 does not activate real commerce integrations or data collection:

- no public API surface is opened;
- no real backend is enabled by default;
- no secrets or production tokens are added;
- no new cookies are created for the standalone XpeX corridor;
- no silent tracking, pixel or fingerprinting is added;
- Mercado Livre API, Dub, n8n, OpenAI, WhatsApp and paid ads remain disconnected.

## Controlled risk

The standalone surface still uses browser `localStorage` for demo/manual operations. Operators should not enter real sensitive customer, creator, tenant, payment, token or credential data until XpeX has its own reviewed auth and tenant boundary.

## Rollback

Set the server-side environment variable below and redeploy:

```bash
XPEX_COMMERCE_REQUIRE_AUTH=true
```

When set exactly to `true` after trim/lowercase normalization, `/xpex-commerce` falls back into the existing Postiz protected flow.

## Next phase

Recommended next phase options:

1. **Preview Polish** — improve copy, screenshots, smoke-test UX and manual operator flows on the open standalone surface.
2. **Railway Backend Runtime Activation** — enable the backend opt-in path in a controlled environment after diagnostics, auth/tenant review and non-destructive validation.
