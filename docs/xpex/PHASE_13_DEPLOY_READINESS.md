# Phase 13 — Deploy Preview and Railway Readiness

## Objetivo

A Fase 13 move o XpeX Creator Commerce OS do ciclo apenas local/PR para uma etapa preparada para tela viva via Vercel Preview e infraestrutura backend/banco controlada via Railway.

## Inspeção do monorepo

- `package.json` usa pnpm `10.6.1`, Node `>=22.12.0 <23.0.0` e script global `pnpm run build` filtrando frontend, backend e orchestrator.
- `pnpm-workspace.yaml` inclui `apps/*` e `libraries/*`.
- Não há `turbo.json` no repositório.
- `apps/frontend/package.json` define `build` como `next build`.
- `apps/backend/package.json` define `build` como `cross-env NODE_ENV=production nest build` e `start` apontando para `dist/apps/backend/src/main.js`.
- `apps/orchestrator/package.json` usa padrão equivalente ao backend.
- Frontend correto para Vercel: `apps/frontend` com comando `pnpm --filter ./apps/frontend run build`.
- Backend correto para Railway readiness: `apps/backend` com `pnpm --filter ./apps/backend run build` e start filtrado.

## O que entra

- Rota `/xpex-commerce/deploy-readiness`.
- Checklist local estático de readiness.
- Matriz de ambientes local, Vercel Preview, Vercel Production, Railway Backend e Railway Database.
- Guia `docs/xpex/VERCEL_DEPLOY_PREVIEW_GUIDE.md`.
- Guia `docs/xpex/RAILWAY_BACKEND_READINESS_GUIDE.md`.
- Card de dashboard para Deploy Readiness.
- Placeholders seguros no `.env.example` quando aplicável.

## O que não entra

- Nenhum deploy automático forçado.
- Nenhum secret real.
- Nenhuma integração Mercado Livre API, Dub, n8n, OpenAI, WhatsApp ou anúncios pagos.
- Nenhum redirect público real.
- Nenhuma coleta silenciosa, cookie novo ou fingerprinting.
- Nenhuma mudança de auth flow, OAuth providers ou schema de banco.
- Nenhum comando destrutivo de banco.

## Sequência operacional recomendada

1. Atualizar/mergear branch com `main` revisado.
2. Criar Vercel Preview do frontend em `apps/frontend`.
3. Validar visualmente dashboard e rotas XpeX.
4. Preparar Railway backend/banco sem ligar integrações externas.
5. Habilitar backend opt-in apenas em ambiente controlado após diagnostics.
6. Rodar smoke tests e registrar achados antes de qualquer produção.

## Próxima Fase 14

A Fase 14 deve ser escolhida conforme o resultado do deploy preview:

- **Safe Link Resolver Preview**, se a prioridade for testar um resolvedor sem redirect público real e sem rastreamento silencioso.
- **Railway Backend Runtime Activation**, se o preview visual estiver aprovado e a prioridade for ativar backend controlado com diagnostics e opt-in.
