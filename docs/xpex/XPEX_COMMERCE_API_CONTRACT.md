# XpeX Commerce API contract

Phase 06 implements the first authenticated, organization-scoped backend endpoints for manual XpeX Commerce persistence. The API still avoids Mercado Livre, Dub, n8n, OpenAI, paid ads, OAuth/provider changes, redirects, and provider secrets.


## Phase 07 frontend connection state

The frontend now has an opt-in backend mode guarded by `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`. Without that public flag, `/xpex-commerce` stays in localStorage demo mode. When the flag is enabled, the frontend uses relative authenticated requests through the public proxy path `/api/xpex-commerce` for the routes in this contract and falls back to localStorage on network/API errors. No browser token storage, Mercado Livre API, Dub, n8n, OpenAI, WhatsApp automation, paid ads automation, OAuth change, or Postiz social publishing change is introduced by this connection layer.

## Common rules

- `organizationId` is never accepted from payloads; it is derived from authenticated request context.
- Payload keys matching token, secret, API key, password, or credential patterns are rejected.
- External URLs are parsed and must use `http` or `https`; `javascript:`, `data:`, and unsafe protocols are blocked.
- Scores are integers from `0` to `10`.
- Record status enum: `DRAFT`, `ACTIVE`, `PAUSED`, `ARCHIVED`.
- Lead status enum: `NEW`, `QUALIFIED`, `CONTACTED`, `CONVERTED`, `ARCHIVED`.
- Physical delete is not implemented; archive through status instead.

## Products — implemented

- `GET /xpex-commerce/products`
- `POST /xpex-commerce/products`
- `GET /xpex-commerce/products/:id`
- `PATCH /xpex-commerce/products/:id/status`

Create payload:

```json
{
  "title": "Produto demo",
  "sourceUrl": "https://example.test/produto-demo",
  "imageUrl": "https://example.test/produto-demo.png",
  "currency": "BRL",
  "score": 8,
  "notes": "Notas sem segredo"
}
```

## Campaigns — implemented

- `GET /xpex-commerce/campaigns`
- `POST /xpex-commerce/campaigns`
- `GET /xpex-commerce/campaigns/:id`
- `PATCH /xpex-commerce/campaigns/:id/status`

Create payload:

```json
{
  "name": "Campanha demo",
  "productId": "product_id_optional",
  "creatorId": "creator_id_optional",
  "slogan": "Slogan demo",
  "cta": "Comenta DEMO",
  "channels": "[\"Instagram\",\"TikTok\"]",
  "score": 7
}
```

Referenced product and creator IDs must belong to the current organization.

## Creators — implemented

- `GET /xpex-commerce/creators`
- `POST /xpex-commerce/creators`
- `GET /xpex-commerce/creators/:id`
- `PATCH /xpex-commerce/creators/:id/status`

Create payload:

```json
{
  "displayName": "Creator demo",
  "handle": "@creator",
  "channels": "[\"Instagram\"]",
  "audienceNotes": "Resumo do público",
  "styleGuide": "Diretrizes manuais",
  "score": 8
}
```

## Leads — implemented

- `GET /xpex-commerce/leads`
- `POST /xpex-commerce/leads`
- `GET /xpex-commerce/leads/:id`
- `PATCH /xpex-commerce/leads/:id/status`

Create payload:

```json
{
  "campaignId": "campaign_id_optional",
  "creatorId": "creator_id_optional",
  "productId": "product_id_optional",
  "source": "manual",
  "externalProfileUrl": "https://example.test/profile",
  "name": "Lead demo",
  "contact": "Contato minimizado",
  "notes": "Observação mínima",
  "score": 6
}
```

## Link plans — implemented

- `GET /xpex-commerce/link-plans`
- `POST /xpex-commerce/link-plans`
- `GET /xpex-commerce/link-plans/:id`
- `PATCH /xpex-commerce/link-plans/:id/status`

Create payload:

```json
{
  "campaignId": "campaign_id_optional",
  "productId": "product_id_optional",
  "creatorId": "creator_id_optional",
  "plannedSlug": "demo-instagram",
  "destinationUrl": "https://example.test/demo",
  "source": "manual",
  "notes": "Plano sem redirect real"
}
```

`plannedSlug` is unique per organization. The endpoint stores a plan only; it does not create redirects or integrate with Dub.

## Creative briefs — implemented

- `GET /xpex-commerce/creative-briefs`
- `POST /xpex-commerce/creative-briefs`
- `GET /xpex-commerce/creative-briefs/:id`
- `PATCH /xpex-commerce/creative-briefs/:id/status`

Create payload:

```json
{
  "campaignId": "campaign_id_optional",
  "type": "brief",
  "title": "Brief demo",
  "body": "Roteiro manual seguro",
  "prompt": "Prompt armazenado manualmente; nenhuma IA é chamada"
}
```

## Performance reports — planned

Prisma persistence model exists in Phase 06, but API endpoints remain planned until reporting workflow, metric validation, and import provenance rules are finalized.

## Compliance checks — planned

Prisma persistence model exists in Phase 06, but API endpoints remain planned until the review workflow and approval semantics are finalized.

## Phase 08 diagnostics and homologation

Phase 08 adds a safe authenticated diagnostics route for backend homologation before external integrations.

- Nest controller route: `GET /xpex-commerce/diagnostics`
- Browser/proxy route consumed by the frontend: `GET /api/xpex-commerce/diagnostics`

Response contains only safe technical readiness fields:

```json
{
  "moduleEnabled": true,
  "organizationScoped": true,
  "prismaAvailable": true,
  "timestamp": "2026-07-10T00:00:00.000Z",
  "supportedResources": ["products", "campaigns", "creators", "leads", "link-plans", "creative-briefs"]
}
```

The Nest route is mounted inside the existing authenticated XpeX Commerce controller and derives organization scope from the request context. It must not return user records, lead payloads, provider tokens, private URLs, infrastructure details, secrets, or API keys. The frontend calls it only through the relative `/api/xpex-commerce/diagnostics` proxy path when `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`; failures keep the localStorage fallback active.
