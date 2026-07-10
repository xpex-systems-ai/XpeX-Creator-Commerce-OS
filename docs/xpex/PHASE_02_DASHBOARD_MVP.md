# Phase 02 Dashboard MVP

## Objective

Phase 02 introduces `/xpex-commerce`, the first internal visual surface for **XpeX Creator Commerce OS**. The route demonstrates the commerce machine concept with Mercado Livre products, creators, AI agents, trackable links, social distribution, CRM, metrics, and optimization in a safe MVP presentation mode.

## Routing decision

The dashboard is implemented as an isolated App Router segment at `apps/frontend/src/app/xpex-commerce`. This keeps the MVP outside the existing authenticated Postiz route groups, OAuth providers, social publishing flows, billing, database, and navigation-critical areas.

## Files created or changed

- `apps/frontend/src/app/xpex-commerce/layout.tsx` — isolated layout for the internal MVP route.
- `apps/frontend/src/app/xpex-commerce/page.tsx` — premium dark dashboard UI using XpeX brand tokens.
- `apps/frontend/src/app/xpex-commerce/mock-data.ts` — typed mock data for Anderso, the product, campaign, metrics, funnel, modules, and AI agents.
- `README.md` — short access note for `/xpex-commerce`.
- `docs/xpex/PHASE_02_IMPLEMENTATION_BACKLOG.md` — backlog updated with the first Phase 02 deliverable and next phase item.
- `docs/xpex/PHASE_02_DASHBOARD_MVP.md` — this implementation note.

## Safety scope

This implementation intentionally does **not** use or modify:

- Real APIs or production API credentials.
- Database writes, new Prisma models, or Prisma migrations.
- Mercado Livre API integration.
- Dub integration.
- n8n workflows.
- Paid ads automation.
- Existing authentication, OAuth providers, or social publishing logic.
- Secrets or environment variables.

All creator, product, campaign, agent, funnel, link, lead, compliance, and metric values are static mock data for internal validation.

## Validation checklist

- [ ] `/xpex-commerce` renders the XpeX Creator Commerce OS MVP page.
- [ ] The page uses `xpexBrandTokens` and `xpexFontClassName` from the existing frontend token file.
- [ ] Anderso, Projetor portátil, “Seu quarto vira palco”, and CTA “Comenta TELÃO” are visible.
- [ ] Produtos ML, Campanhas, Criadores, Links, Leads, Métricas, and Agentes IA are visible.
- [ ] No real API keys, secrets, Mercado Livre integration, Prisma migration, Dub integration, n8n workflow, or paid ads automation were added.
- [ ] Frontend, backend, orchestrator, and full builds are executed or any limitation is documented.

## Phase 03 next steps

Phase 03 should add reviewed manual workflows for:

1. Manual product registration.
2. Manual campaign creation.
3. Associating the Anderso creator profile with campaign briefs.
4. Planning trackable links without live shortening.
5. Manual CRM lead review before automation.
