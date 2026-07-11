<p align="center">
  <a href="https://postiz.com/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/765e9d72-3ee7-4a56-9d59-a2c9befe2311">
    <img alt="Postiz Logo" src="https://github.com/user-attachments/assets/f0d30d70-dddb-4142-8876-e9aa6ed1cb99" width="280"/>
  </picture>
  </a>
</p>

<p align="center">
<a href="https://opensource.org/license/agpl-v3">
  <img src="https://img.shields.io/badge/License-AGPL%203.0-blue.svg" alt="License">
</a>
</p>

<h3 align="center"><strong><a href="https://github.com/gitroomhq/postiz-agent">NEW: check out Postiz agent CLI! perfect for OpenClaw and other agents</a></strong></h3>
<div align="center">
  <strong>
  <h2>Your ultimate AI social media scheduling tool</h2><br />
  <a href="https://postiz.com">Postiz</a>: An alternative to: Buffer.com, Hypefury, Twitter Hunter, etc...<br /><br />
  </strong>
  Postiz offers everything you need to manage your social media posts,<br />build an audience, capture leads, and grow your business.
</div>

<div class="flex" align="center">
  <br />
  <img alt="Instagram" src="https://postiz.com/svgs/socials/Instagram.svg" width="32">
  <img alt="Youtube" src="https://postiz.com/svgs/socials/Youtube.svg" width="32">
  <img alt="Dribbble" src="https://postiz.com/svgs/socials/Dribbble.svg" width="32">
  <img alt="Linkedin" src="https://postiz.com/svgs/socials/Linkedin.svg" width="32">
  <img alt="Reddit" src="https://postiz.com/svgs/socials/Reddit.svg" width="32">
  <img alt="TikTok" src="https://postiz.com/svgs/socials/TikTok.svg" width="32">
  <img alt="Facebook" src="https://postiz.com/svgs/socials/Facebook.svg" width="32">
  <img alt="Pinterest" src="https://postiz.com/svgs/socials/Pinterest.svg" width="32">
  <img alt="Threads" src="https://postiz.com/svgs/socials/Threads.svg" width="32">
  <img alt="X" src="https://postiz.com/svgs/socials/X.svg" width="32">
  <img alt="Slack" src="https://postiz.com/svgs/socials/Slack.svg" width="32">
  <img alt="Discord" src="https://postiz.com/svgs/socials/Discord.svg" width="32">
  <img alt="Mastodon" src="https://postiz.com/svgs/socials/Mastodon.svg" width="32">
  <img alt="Bluesky" src="https://postiz.com/svgs/socials/Bluesky.svg" width="32">
</div>

<p align="center">
  <br />
  <a href="https://docs.postiz.com" rel="dofollow"><strong>Explore the docs »</strong></a>
  <br />

  <br />
  <a href="https://youtube.com/@postizofficial" rel="dofollow"><strong>Watch the YouTube Tutorials»</strong></a>
  <br />
</p>

<p align="center">
  <a href="https://platform.postiz.com">Register</a>
  ·
  <a href="https://discord.postiz.com">Join Our Discord (devs only)</a>
  ·
  <a href="https://docs.postiz.com/public-api">Public API</a><br />
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@postiz/node">NodeJS SDK</a>
  ·
  <a href="https://www.npmjs.com/package/n8n-nodes-postiz">N8N custom node</a>
  ·
  <a href="https://apps.make.com/postiz">Make.com integration</a>
</p>

<br /><br />

## XpeX Creator Commerce OS

### Phase 10 — Real Internal Operation

A Phase 10 adiciona a primeira operação real controlada do XpeX Creator Commerce OS: produto piloto de projetor portátil, criador piloto Anderso e campanha piloto “Seu quarto vira palco”. O fluxo permanece manual e revisado por humano, sem Mercado Livre API, Dub, n8n, OpenAI, WhatsApp automatizado, anúncios pagos ou publicação automática.

This repository is a fork that will evolve, in safe layers, into **XpeX Creator Commerce OS**: a creator-commerce operating system for Mercado Livre products, AI-assisted campaign planning, trackable links, creators, social publishing, CRM, metrics, and optimization. The current foundation remains the upstream Postiz open source application, and this fork preserves the original Postiz attribution and AGPL-3.0 license posture.

Planned XpeX modules include:

- Dashboard for products, campaigns, creators, links, leads, and performance.
- Manual Mercado Livre product workflows before any live API integration.
- Campaign planning for creator briefs, slogans, CTAs, and content status.
- AI creative support for copy, video direction, visual prompts, and compliance review.
- Reuse of the Postiz calendar as the social publishing layer.
- Phase 06 adds a controlled real backend persistence foundation for XpeX Commerce records while preserving the localStorage demo mode and avoiding Mercado Livre, Dub, n8n, OpenAI, paid ads, or secrets.
- Trackable links, lead capture, CRM follow-up, and metrics reporting.

See the detailed architecture in [`docs/xpex/CREATOR_COMMERCE_OS_BLUEPRINT.md`](docs/xpex/CREATOR_COMMERCE_OS_BLUEPRINT.md). Phase 01 is only foundation and audit work; real commercial integrations, Mercado Livre API sync, paid ads automation, and production agents are reserved for later reviewed phases.

Phase 02 adds the first internal visual surface for **XpeX Creator Commerce OS** at `/xpex-commerce`. It is a premium dashboard MVP with typed mock data for Anderso, the portable projector campaign, AI agents, funnel, links, leads, and metrics; real integrations remain reserved for future reviewed phases.

Phase 03 expands that isolated surface into a manual operational MVP with static/mock routes for `/xpex-commerce`, `/xpex-commerce/products`, `/xpex-commerce/campaigns`, `/xpex-commerce/creators/anderso`, `/xpex-commerce/links`, and `/xpex-commerce/creatives`. These screens plan products, campaigns, creator Anderso, links, and creative briefs without adding real Mercado Livre, Dub, n8n, database, or AI API integrations.


Phase 07 connects the XpeX Commerce frontend to the real authenticated backend in an opt-in controlled mode via `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`, while preserving localStorage/demo mode as the default fallback. Backend errors keep the UI operational locally, and Mercado Livre, Dub, n8n, OpenAI, WhatsApp, paid ads, OAuth providers, auth flow, and Postiz social publishing remain untouched.

Phase 04 adds controlled local operations to `/xpex-commerce` using browser `localStorage` only. Products, campaigns, planned links, creative briefs, and the new `/xpex-commerce/leads` CRM route can be managed locally without adding a database, Prisma migration, Mercado Livre API, Dub, n8n, OpenAI, WhatsApp automation, paid ads, or secrets.

Phase 09 adds a safe localStorage-to-backend import workflow and controlled CRUD validation for **XpeX Creator Commerce OS**. New routes `/xpex-commerce/import` and `/xpex-commerce/crud-tests` analyze local demo data, require backend opt-in plus healthy diagnostics before real import, preserve localStorage, and keep Mercado Livre, Dub, n8n, OpenAI, WhatsApp, and paid ads disconnected.


Phase 14 adds a safe public preview gate for `/xpex-commerce` and subroutes, controlled by `XPEX_COMMERCE_PUBLIC_PREVIEW_ENABLED=true`, so Vercel previews can show the demo/local-first XpeX surface without removing or weakening Postiz authentication. Postiz private routes, APIs, settings, analytics, OAuth/auth behavior, AGPL posture, backend opt-in, localStorage demo mode, and the no-external-integrations guardrails remain preserved.

Phase 16 makes **XpeX Creator Commerce OS** open by default as a standalone/manual-first surface at `/xpex-commerce`, without removing or weakening the original Postiz authentication boundary. Postiz private routes, APIs, analytics, settings, launches, OAuth/auth behavior, AGPL posture, backend opt-in, localStorage demo mode, and no-external-integrations guardrails remain preserved.

Phase 15 hardens the public preview gate with runtime diagnostics for Vercel: `/xpex-commerce` and subroutes can emit safe boolean headers plus a `/xpex-commerce/preview-status` checklist when the gate is enabled, without removing Postiz authentication, exposing APIs or secrets, changing backend opt-in behavior, or weakening the AGPL/Postiz attribution posture.

Phase 13 prepares **XpeX Creator Commerce OS** for Vercel Deploy Preview and Railway backend/database readiness without activating external integrations. The new `/xpex-commerce/deploy-readiness` route, Vercel guide, Railway guide, and environment checklist keep localStorage demo mode as the first deploy path, preserve backend opt-in, and avoid secrets, Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, paid ads, public redirects, cookies, fingerprinting, or silent tracking.

Phase 08 adds safe backend homologation for XpeX Commerce: an authenticated diagnostics route, a dashboard readiness panel, CRUD smoke-test documentation, and migration readiness checklist. Backend use remains opt-in with `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true`; localStorage demo and fallback behavior remain preserved, and Mercado Livre, Dub, n8n, OpenAI, WhatsApp, and paid ads integrations remain disconnected.

Phase 05 adds a safe backend contract package for XpeX Commerce: API contract, Prisma schema draft, security plan, and localStorage-to-backend migration plan. It does not apply migrations, register live commerce endpoints, or add external integrations; the local MVP remains browser-only until a later reviewed persistence phase.

Build/deploy note: this fork avoids mandatory external build-time dependencies where possible, including remote font resolution, so XpeX can be deployed more reliably in restricted environments while preserving the Postiz foundation.

## 🔌 See the leading Postiz features

<p align="center">
  <a href="https://www.youtube.com/watch?v=BdsCVvEYgHU" target="_blank">
    <img alt="Postiz" src="https://github.com/user-attachments/assets/8b9b7939-da1a-4be5-95be-42c6fce772de" />
  </a>
</p>

## ✨ Features

| ![Image 1](https://github.com/user-attachments/assets/a27ee220-beb7-4c7e-8c1b-2c44301f82ef) | ![Image 2](https://github.com/user-attachments/assets/eb5f5f15-ed90-47fc-811c-03ccba6fa8a2) |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Image 3](https://github.com/user-attachments/assets/d51786ee-ddd8-4ef8-8138-5192e9cfe7c3) | ![Image 4](https://github.com/user-attachments/assets/91f83c89-22f6-43d6-b7aa-d2d3378289fb) |

### Our Sponsors

| Sponsor |                                  Logo                                   | Description     |
|---------|:-----------------------------------------------------------------------:|-----------------|
| [Hostinger](https://www.hostinger.com/vps/docker/postiz?ref=postiz) | <img src=".github/sponsors/hostinger.png" alt="Hostinger" width="500"/> | Hostinger is on a mission to make online success possible for anyone – from developers to aspiring bloggers and business owners |
| [Virlo](https://dev.virlo.ai/?ref=postiz) | <img src="https://github.com/user-attachments/assets/25182598-5344-45fc-b9cd-e4cfa16aabfd" alt="Virlo" width="500"/> | Virlo is the #1 social media trend spotting and all-in-one GTM tool for teams leveraging short-form video |
| [ChatbotX](https://chatbotx.io/?ref=postiz) | <img src="https://github.com/user-attachments/assets/0aa6b058-9a64-46d3-bc26-337abc51737d" alt="ChatbotX" width="500"/> | The ManyChat alternative that you can self-host, white-label, and resell to your clients. Bring your own OpenClaw, Hermes, or Claude agents! |

# Intro

- Schedule all your social media posts (many AI features)
- Measure your work with analytics.
- Collaborate with other team members to exchange or buy posts.
- Invite your team members to collaborate, comment, and schedule posts.
- At the moment, there is no difference between the hosted version and the self-hosted version
- Perfect for automation (API) with platforms like N8N, Make.com, Zapier, etc.

## Tech Stack

- Pnpm workspaces (Monorepo)
- NextJS (React)
- NestJS
- Prisma (Default to PostgreSQL)
- Temporal
- Resend (email notifications)

## Quick Start

To have the project up and running, please follow the [Quick Start Guide](https://docs.postiz.com/quickstart)

## Sponsor Postiz

We now give a few options to Sponsor Postiz:
- Just a donation: You like what we are building, and want to buy us some coffee so we can build faster.
- Main repository: Get your logo with a backlink from the main Postiz repository. Postiz has almost 6m downloads and 20k views per month.

Link: https://opencollective.com/postiz

## Postiz Compliance

- Postiz is an open-source, self-hosted social media scheduling tool that supports platforms like X (formerly Twitter), Bluesky, Mastodon, Discord, and others.
- Postiz hosted service uses official, platform-approved OAuth flows.
- Postiz does not automate or scrape content from social media platforms.
- Postiz does not collect, store, or proxy API keys or access tokens from users.
- Postiz never asks users to paste API keys into our hosted product.
- Postiz users always authenticate directly with the social platform (e.g., X, Discord, etc.), ensuring platform compliance and data privacy.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=gitroomhq/postiz-app&type=date&legend=top-left)](https://www.star-history.com/#gitroomhq/postiz-app&type=date&legend=top-left)

## License

This repository's source code is available under the [AGPL-3.0 license](LICENSE).

<br /><br />

<p align="center">
  <img src="https://github.com/snyk-labs/secure-developer-sample-repo/raw/main/badge_full.svg" alt="Secure Developer Badge Full" width="150">
</p>


## XpeX Creator Commerce OS — Phase 11

A Fase 11 adiciona métricas manuais, rastreamento operacional, leads revisados por humano, painel de performance do piloto e calendário de 7 dias para a campanha **Seu quarto vira palco** com Anderso. A camada permanece segura: sem APIs externas, sem Mercado Livre API, sem Dub, sem n8n, sem OpenAI, sem WhatsApp API, sem anúncios pagos automatizados e sem publicação automática, preservando a documentação original do Postiz e a licença AGPL.

### XpeX Phase 12 — Tracked Links, UTMs and Manual Attribution

Phase 12 adds a safe local layer for tracked links, UTM building and manual attribution. Operators can prepare campaign/creator/channel/creative links, validate http/https destinations, assign manual leads and sales, and review link performance before any controlled shortener or redirect integration is approved. Postiz AGPL attribution and the original documentation remain preserved.
