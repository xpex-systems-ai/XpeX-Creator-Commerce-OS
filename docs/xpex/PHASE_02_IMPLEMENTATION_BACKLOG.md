# Phase 02 Implementation Backlog

Phase 02 should add isolated XpeX surfaces without changing authentication, OAuth providers, or existing social publishing behavior.

## 0. Build prerequisite
- Prerequisite: the `apps/frontend` production build must pass before implementing Produtos, Campanhas, Criadores, dashboard, or other XpeX modules.
- Risk: adding feature surfaces on top of an unstable build can hide infrastructure failures and slow safe reviews.
- Acceptance: Phase 02 work starts only after frontend build validation is documented.

## 0.1 Internal XpeX landing and commercial dashboard foundation
- Status: first Phase 02 deliverable implemented as `/xpex-commerce`.
- Probable files: isolated frontend routes/components under `apps/frontend`.
- Risk: heavy rebrand work could unintentionally affect existing Postiz flows.
- Dependencies: Phase 01.1 build stabilization and approved XpeX brand tokens.
- Acceptance: a clearly scoped XpeX internal landing/dashboard surface exists after stabilization without replacing core Postiz navigation or behavior.
- Acceptance criteria for the first dashboard MVP: route accessible, build passing, typed mock data only, no Prisma migration, no real API integration, and no secrets.
- Next item: Phase 03 Produto Manual + Campanha Manual.

## 1. XpeX menu in frontend
- Probable files: `apps/frontend` navigation/layout components.
- Risk: confusing existing Postiz navigation or permissions.
- Dependencies: final route naming and feature flag decision.
- Acceptance: authenticated users see an XpeX section that links to placeholder pages without breaking existing menu items.

## 2. Manual Produtos ML screen
- Probable files: `apps/frontend` routes/components, later `apps/backend` API and Prisma models.
- Risk: users may assume live Mercado Livre sync exists.
- Dependencies: approved manual data fields and no API secrets.
- Acceptance: UI clearly marks products as manually entered and stores only validated fields after migration approval.

## 3. Campaigns screen
- Probable files: `apps/frontend` campaign pages, `apps/backend` campaign module later.
- Risk: premature schema design can lock the product into the wrong workflow.
- Dependencies: campaign status model and creator/product references.
- Acceptance: users can draft campaign briefs with slogan, CTA, creator, product, and status in a safe mock/manual state.

## 4. Creator profile for Anderso
- Probable files: `apps/frontend` creator page, seed/mock fixture, later backend model.
- Risk: hardcoding demo data into production workflows.
- Dependencies: creator model and tenant scoping.
- Acceptance: Anderso appears as an example creator profile with clear demo labeling.

## 5. Mocked AI creative generator
- Probable files: `apps/frontend` creative UI, optional backend mock endpoint.
- Risk: accidental live OpenAI usage or unreviewed claims.
- Dependencies: compliance checklist and prompt templates.
- Acceptance: generator returns mock copy/scripts and displays human approval requirement.

## 6. Simple trackable links
- Probable files: `apps/frontend` links page, `apps/backend` links module, future Dub integration.
- Risk: unsafe redirects or misleading destinations.
- Dependencies: destination validation and attribution fields.
- Acceptance: users can define a destination and source plan; live shortening can remain disabled until approved.

## 7. Basic CRM
- Probable files: `apps/frontend` CRM page, future backend lead module.
- Risk: spammy automation or weak consent records.
- Dependencies: lead statuses and consent snapshot policy.
- Acceptance: leads can be manually listed and categorized without automated messaging.

## 8. Metrics dashboard
- Probable files: `apps/frontend` dashboard widgets, future backend report endpoints.
- Risk: presenting estimates as real measured metrics.
- Dependencies: event model and analytics source decision.
- Acceptance: dashboard separates mock/demo, estimated, and measured values.
