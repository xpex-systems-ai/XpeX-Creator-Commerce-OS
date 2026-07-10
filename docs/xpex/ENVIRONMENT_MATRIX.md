# XpeX Environment Matrix

No real secret, token, password, or private API key should be committed to Git. Use local `.env` files, deployment secret managers, or platform-managed environment variables.

## Required for the full app

| Variable | Purpose | Notes |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection used by Prisma and backend services. | Required for backend and migrations/generate workflows that inspect the schema. |
| `REDIS_URL` | Redis connection for queues, caching, and runtime coordination. | Required for complete backend/orchestrator behavior. |
| `JWT_SECRET` | Token signing secret. | Must be unique per environment and never committed. |
| `FRONTEND_URL` | Public frontend URL. | Used for redirects and links. |
| `NEXT_PUBLIC_BACKEND_URL` | Browser-visible backend URL. | Public value, but should still be environment-specific. |
| `BACKEND_INTERNAL_URL` | Internal backend URL used by services. | Keep aligned with deployment networking. |

## Optional / already relevant

| Variable family | Purpose | Notes |
| --- | --- | --- |
| Email/SMTP values | Account, notification, and transactional mail flows. | Keep provider credentials secret. |
| Storage/S3 values | Media and asset storage. | Use least-privilege credentials. |
| Social OAuth values | Existing Postiz provider integrations. | Do not alter in Phase 01. |
| Temporal values | Workflow orchestration. | Required where Temporal is not using defaults. |

## Future XpeX variables

| Variable family | Purpose | Phase guidance |
| --- | --- | --- |
| `OPENAI_API_KEY` | AI creative and agent workflows. | Future only; use mocks until safety and cost controls exist. |
| `DUB_TOKEN`, `DUB_API_ENDPOINT`, `DUB_SHORT_LINK_DOMAIN` | Short links and attribution. | Future only; start with tracking design before live API calls. |
| PostHog variables | Product analytics and funnel analysis. | Future analytics layer. |
| Stripe variables | Subscription or monetization. | Future billing layer after product workflow validation. |
| Mercado Livre manual/API values | Product catalog and offer validation. | Start manual. API keys/tokens only after security review. |

## Deployment recommendation

Use Railway, Render, a VPS, or another full-stack host for the complete app because XpeX needs backend workers, PostgreSQL, Redis, and Temporal-oriented processes. Vercel can be useful for a public landing page or marketing frontend, but it should not be treated as the only deployment target for the complete commerce operating system.
