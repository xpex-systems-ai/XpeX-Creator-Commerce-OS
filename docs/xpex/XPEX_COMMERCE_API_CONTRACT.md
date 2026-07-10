# XpeX Commerce API contract draft

Phase 05 contract only. These endpoints are planned and not implemented in this phase. All future routes must be authenticated, organization-scoped, validated, audited, and free of provider secrets in request/response payloads.

## Common response envelope

```json
{
  "data": {},
  "meta": {
    "organizationId": "org_example",
    "requestId": "req_example"
  }
}
```

## Common status codes

- `200 OK` for successful reads/updates.
- `201 Created` for successful creates.
- `400 Bad Request` for validation errors.
- `401 Unauthorized` when the request is not authenticated.
- `403 Forbidden` when the user lacks organization permission.
- `404 Not Found` when a record does not exist in the organization scope.
- `409 Conflict` for duplicate slugs/import conflicts.
- `422 Unprocessable Entity` for semantically invalid campaign/link relationships.

## Products

- `GET /xpex-commerce/products` — list products for the current organization.
- `POST /xpex-commerce/products` — create a product.
- `GET /xpex-commerce/products/:id` — read one product.
- `PATCH /xpex-commerce/products/:id` — update editable fields/status.

Payload example:

```json
{
  "name": "Produto demo",
  "category": "Tecnologia",
  "mercadoLivreUrl": "https://example.test/produto-demo",
  "audienceFit": "Resumo do público",
  "creatorFit": "Resumo do fit com creator",
  "campaignAngle": "Ângulo de campanha",
  "ctaKeyword": "DEMO",
  "score": 8,
  "status": "Em análise",
  "notes": "Notas sem segredo"
}
```

Validations: name required, score 0-10, URLs sanitized, status enum. Permissions: `xpexCommerce.read/create/update`.

## Campaigns

- `GET /xpex-commerce/campaigns`
- `POST /xpex-commerce/campaigns`
- `GET /xpex-commerce/campaigns/:id`
- `PATCH /xpex-commerce/campaigns/:id`

Payload example:

```json
{
  "name": "Campanha demo",
  "productId": "product_demo",
  "creatorId": "creator_demo",
  "slogan": "Slogan demo",
  "cta": "Comenta DEMO",
  "channels": ["Instagram", "TikTok"],
  "status": "Planejado",
  "expectedMetric": "Leads manuais",
  "score": 7,
  "briefing": "Briefing seguro"
}
```

Validations: referenced product/creator must belong to organization, channel enum, score range. Permissions: `xpexCommerce.read/create/update`.

## Creators

- `GET /xpex-commerce/creators`
- `POST /xpex-commerce/creators`
- `GET /xpex-commerce/creators/:id`
- `PATCH /xpex-commerce/creators/:id`

Payload example:

```json
{
  "name": "Creator demo",
  "niche": "Música",
  "audience": "Público jovem",
  "channels": ["Instagram"],
  "status": "Aprovado",
  "notes": "Sem dados sensíveis"
}
```

Validations: no secrets in notes, channel/status enums, length limits. Permissions: `xpexCommerce.read/create/update`.

## Leads

- `GET /xpex-commerce/leads`
- `POST /xpex-commerce/leads`
- `GET /xpex-commerce/leads/:id`
- `PATCH /xpex-commerce/leads/:id`

Payload example:

```json
{
  "name": "Lead demo",
  "channel": "Instagram",
  "interestedProductId": "product_demo",
  "campaignId": "campaign_demo",
  "creatorId": "creator_demo",
  "status": "Novo",
  "observation": "Observação mínima para follow-up"
}
```

Validations: minimize PII, reject secrets/tokens, require organization-owned relationships. Permissions: `xpexCommerce.read/create/update`.

## Link plans

- `GET /xpex-commerce/link-plans`
- `POST /xpex-commerce/link-plans`
- `GET /xpex-commerce/link-plans/:id`
- `PATCH /xpex-commerce/link-plans/:id`

Payload example:

```json
{
  "campaignId": "campaign_demo",
  "productId": "product_demo",
  "creatorId": "creator_demo",
  "channel": "Instagram",
  "slug": "demo-instagram",
  "destinationUrl": "https://example.test/demo",
  "status": "Planejado",
  "notes": "Plano sem redirect real"
}
```

Validations: slug normalized/unique per organization, destination URL sanitized, no redirect execution until reviewed. Permissions: `xpexCommerce.read/create/update`.

## Creative briefs

- `GET /xpex-commerce/creative-briefs`
- `POST /xpex-commerce/creative-briefs`
- `GET /xpex-commerce/creative-briefs/:id`
- `PATCH /xpex-commerce/creative-briefs/:id`

Payload example:

```json
{
  "campaignId": "campaign_demo",
  "productId": "product_demo",
  "creatorId": "creator_demo",
  "hook": "Hook demo",
  "slogan": "Slogan demo",
  "caption": "Legenda demo",
  "shortScript": "Roteiro curto",
  "whatsappText": "Texto manual",
  "status": "Planejado"
}
```

Validations: length limits, no automatic AI generation, no provider token fields. Permissions: `xpexCommerce.read/create/update`.

## Performance reports

- `GET /xpex-commerce/performance-reports`
- `POST /xpex-commerce/performance-reports`
- `GET /xpex-commerce/performance-reports/:id`

Payload example:

```json
{
  "campaignId": "campaign_demo",
  "periodStart": "2026-07-01T00:00:00.000Z",
  "periodEnd": "2026-07-07T23:59:59.000Z",
  "metrics": {
    "views": 1000,
    "clicks": 80,
    "leads": 12,
    "sales": 2
  },
  "notes": "Métricas manuais"
}
```

Validations: dates ordered, numeric metrics non-negative, manual source identified until integrations exist. Permissions: `xpexCommerce.read/create`.
