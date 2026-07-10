# Phase 01 Foundation Audit — XpeX Creator Commerce OS

## Executive summary

This fork is still fundamentally the Postiz open source application. Phase 01 intentionally treats XpeX Creator Commerce OS as a layered evolution on top of that foundation, not as a rewrite. The safe path is to preserve the upstream scheduler, authentication, OAuth providers, AGPL-3.0 license posture, and Postiz attribution while documenting the commerce direction and preparing a controlled implementation backlog.

## Current architecture snapshot

- Monorepo managed with `pnpm`, organized around `apps/*` and `libraries/*`.
- Main build targets are frontend, backend, and orchestrator.
- Frontend is a Next.js app.
- Backend is a NestJS app.
- Data layer uses Prisma with PostgreSQL.
- Runtime services include Redis and Temporal for queues/workflows.
- The existing schema already includes strong primitives for XpeX: `Organization`, `User`, `Integration`, `Post`, `Media`, tags, webhooks, orders, and Mastra-related tables.
- Existing dependencies already include useful building blocks for AI, agents, tracking, payments, and analytics: OpenAI/AI SDK, LangChain/LangGraph, Mastra, Dub, PostHog-related capabilities, Stripe, Redis, and Temporal.

## Risks found

### Node runtime mismatch

The root `package.json` declared `engines.node` as `>=22.12.0 <23.0.0`, while Volta pinned Node `20.17.0`. That creates a high-friction developer setup because Volta would select a Node version that does not satisfy the package engine range. Phase 01 resolves this by aligning Volta to Node `22.20.0`, keeping the engine floor intact and avoiding a downgrade.

### Heavy dependency and build surface

The application combines Next.js, NestJS, Prisma, Redis, Temporal, Mastra, AI SDKs, social provider integrations, media processing, and payment/tracking dependencies. This is powerful, but it means installs and builds can be slow and sensitive to native packages or service availability.

### Required local services

A full application run requires PostgreSQL, Redis, and Temporal-compatible orchestration. Developers should not assume that a frontend-only deployment is enough for the full XpeX product.

### OAuth/auth risk

The safest foundation strategy is to avoid modifying authentication, account linking, or social OAuth providers in Phase 01. Those paths are critical to the upstream Postiz value proposition and are easy to break with premature rebranding or commerce changes.

### Secret management risk

The `.env.example` advertises future integration surfaces such as OpenAI, Dub, Stripe, Redis, and database configuration. No real keys should be committed. The repository already ignores `.env` and `.secrets/`; Phase 01 also adds `node-compile-cache/` to prevent local runtime cache noise from entering Git.

## Opportunities

- **Postiz calendar as the social execution layer:** scheduled posts, media, integrations, and social account management can become the publishing layer for creator commerce.
- **Dub for short links:** future tracked links can connect posts, creators, products, campaigns, clicks, leads, and revenue attribution.
- **Mastra, LangChain, and OpenAI for agents:** the existing dependency set can support product radar, copywriting, video direction, compliance, and growth agents.
- **PostHog/analytics path:** analytics can later unify product experiments, campaign metrics, and funnel behavior.
- **Stripe for future monetization:** billing and payments can remain a later phase after the commerce workflow is validated.
- **Existing Prisma entities:** organizations, users, integrations, posts, media, and orders can anchor future commerce models without immediately changing the schema.

## Gitignore/security check

Checked `.gitignore` for common generated and sensitive paths. It already ignores `.env`, `.secrets/`, `node_modules`, `dist`, `.next`, Nx caches, coverage, editor files, and generated GTM output. Phase 01 adds `node-compile-cache/` because it appeared as an untracked local cache directory and should not be committed.

## Recommendation

Phase 01 should remain documentation, safe rebrand positioning, and conceptual scaffold only. Do not change auth, OAuth providers, social posting flows, database migrations, Mercado Livre API integration, paid ads automation, or production secrets in this phase. The next safe step is Phase 02: add isolated XpeX UI surfaces and manual data workflows behind the existing app shell, with human approval before migrations or live integrations.
