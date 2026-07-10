# XpeX Creator Commerce OS Blueprint

## Product vision

XpeX Creator Commerce OS is a commerce operating system for creators that layers product discovery, campaign planning, AI-assisted creative production, trackable links, social publishing, lead capture, and performance optimization on top of the Postiz scheduling foundation.

The product should evolve in safe layers: first manual workflows and mocks, then validated internal data models, and only later production API integrations.

## Core modules

1. **Dashboard** — executive view of campaigns, products, creators, links, leads, and performance.
2. **Produtos Mercado Livre** — manual product registry first; API integration only after workflow validation.
3. **Campanhas** — campaign briefs, slogans, CTAs, channels, schedule, assets, and status.
4. **Criativos IA** — copy, video scripts, visual prompts, thumbnails, and creative variants.
5. **Calendário** — reuse Postiz scheduling as the publishing calendar.
6. **Links Rastreáveis** — short links, source tags, creator attribution, click events, and conversion handoff.
7. **Criadores** — creator profiles, audience notes, offer fit, content style, and approval responsibilities.
8. **Leads/CRM** — comments, opt-ins, captured leads, follow-up status, and opportunity notes.
9. **Métricas** — clicks, leads, posts, engagement, conversion estimates, and campaign reports.
10. **Agentes IA** — radar, copywriter, video director, visual creative, publisher assistant, tracking, CRM, metrics, compliance, and growth agents.
11. **Compliance** — human approval gates, policy checks, brand safety, false discount prevention, and anti-spam rules.

## Reference flow

`Produto ML -> Radar IA -> Campanha -> Criativo -> Link -> Postagem -> Clique/Lead -> Métrica -> Otimização`

1. A Mercado Livre product is entered manually with title, URL, price snapshot, category, and notes.
2. AI radar evaluates audience fit and angles without inventing claims.
3. A campaign brief is created with target creator, slogan, CTA, channels, and schedule.
4. Creative agents draft copy, visual prompts, and video direction.
5. Compliance reviews risky claims and requires human approval.
6. A trackable short link is generated or reserved.
7. The content is scheduled through the Postiz calendar.
8. Clicks and leads are captured.
9. Metrics are summarized and used to optimize the next creative cycle.

## First campaign seed

- Creator: Anderso
- Product: Projetor portátil
- Campaign: Seu quarto vira palco
- Slogan: "Seu quarto vira palco"
- CTA: "Comenta TELÃO"
- Initial channel strategy: short-form organic social content, comment-triggered lead capture, and one tracked product link.
- Safety note: price, availability, shipping, discount, and warranty statements must be manually verified before publication.

## Mercado Livre integration strategy

Start with a manual Mercado Livre product workflow. Operators should paste product URLs and validated product facts into XpeX. The API integration should only be added after the manual product/campaign/link workflow proves useful and after a dedicated security review for tokens, rate limits, compliance, and data retention.
