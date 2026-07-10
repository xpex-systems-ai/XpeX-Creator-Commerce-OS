# Phase 03 — Manual Workflow MVP

Phase 03 evolves the isolated `/xpex-commerce` visual dashboard into a manual operational MVP for **XpeX Creator Commerce OS**. The goal is to validate the workflow for products, campaigns, creator Anderso, planned links, and AI creative briefs before adding persistence, marketplace integrations, automations, or production tracking.

## Scope

- Manual visual product registration for Mercado Livre-style products.
- Campaign planning centered on **Seu quarto vira palco** for **Projetor portátil**.
- Creator profile for **Anderso**, a trap singer with a young audience.
- Planned link slugs for Instagram, TikTok, and WhatsApp.
- Mocked AI creative briefs: hooks, slogans, captions, Reels/TikTok scripts, WhatsApp copy, image prompt, and recording checklist.

## Routes created or expanded

- `/xpex-commerce` — dashboard with Phase 03 navigation and module summary.
- `/xpex-commerce/products` — Produtos ML visual list and mocked manual product form.
- `/xpex-commerce/campaigns` — campaign planning, funnel, and mocked campaign briefing form.
- `/xpex-commerce/creators/anderso` — Anderso profile, recording manual, recommended products, content calendar, and positioning rules.
- `/xpex-commerce/links` — planned slugs by channel without redirection.
- `/xpex-commerce/creatives` — mocked AI creative briefing for the projector campaign.

## Implementation decisions

- Reused the isolated `apps/frontend/src/app/xpex-commerce` route segment from Phase 02.
- Reused `xpexBrandTokens` for the dark premium visual style and avoided remote font dependencies.
- Added route-local components under `apps/frontend/src/app/xpex-commerce/components` to keep this MVP isolated from existing Postiz surfaces.
- Expanded `mock-data.ts` as the single static source for products, campaigns, creator data, planned links, and creative copy.

## Safety boundaries

Everything in Phase 03 is mocked or static. This phase does **not** add:

- Mercado Livre API integration.
- Dub integration or real redirects.
- n8n automation.
- OpenAI or any AI API call.
- Database persistence.
- Prisma migrations.
- Auth, OAuth, payment, provider, or social publishing changes.
- Production secrets, access tokens, API keys, or paid ads automation.

## Validation checklist

- [ ] `/xpex-commerce` renders and links to all Phase 03 modules.
- [ ] `/xpex-commerce/products` lists six mocked products and shows the manual product form.
- [ ] `/xpex-commerce/campaigns` keeps **Seu quarto vira palco** central and lists additional planned campaigns.
- [ ] `/xpex-commerce/creators/anderso` shows profile, recording manual, recommended products, calendar, and positioning rules.
- [ ] `/xpex-commerce/links` shows planned slugs only and no real redirects.
- [ ] `/xpex-commerce/creatives` shows mocked creative assets and states that real AI generation comes later.
- [ ] Searches confirm no real marketplace token, API key, database call, fetch, axios, Prisma usage, Dub integration, or n8n integration was added inside the route.
- [ ] Frontend, backend, orchestrator, and full build checks are run and documented.

## Next phase

Phase 04 should introduce controlled persistence or a reviewed backend model for products and campaigns. Before implementation, the team should review data ownership, validation rules, auth boundaries, auditability, and whether persistence should begin locally, in a safe backend API, or in Prisma models behind approved migrations.
