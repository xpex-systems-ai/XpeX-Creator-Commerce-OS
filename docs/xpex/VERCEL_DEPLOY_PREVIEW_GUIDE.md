# XpeX Phase 13 — Vercel Deploy Preview Guide

## Objetivo

Publicar o frontend do XpeX Creator Commerce OS em **Deploy Preview na Vercel** para validação visual, mantendo o modo demo via `localStorage` e o backend opt-in desligado.

## Estrutura verificada

- Monorepo pnpm com `pnpm-workspace.yaml` incluindo `apps/*` e `libraries/*`.
- Frontend Next.js em `apps/frontend`.
- Script real do frontend: `pnpm --filter ./apps/frontend run build`.
- Script global real: `pnpm run build` executa frontend, backend e orchestrator em sequência.

## Configuração recomendada na Vercel

1. Conectar a conta GitHub e selecionar `xpex-systems-ai/XpeX-Creator-Commerce-OS`.
2. Criar projeto Vercel para o frontend.
3. Definir **Root Directory** como `apps/frontend`.
4. Definir **Install Command** como:

```bash
pnpm install
```

5. Definir **Build Command** como:

```bash
pnpm --filter ./apps/frontend run build
```

6. Manter output padrão do Next.js.
7. Criar Deploy Preview a partir do PR da Fase 13.
8. Abrir `/xpex-commerce` e validar a navegação.

## Variáveis permitidas apenas como placeholders

Use somente placeholders e valores não sensíveis no guia/PR. O primeiro preview deve manter backend desativado:

```bash
NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false
NEXT_PUBLIC_BACKEND_URL=<optional-preview-backend-placeholder>
FRONTEND_URL=<vercel-preview-url-placeholder>
```

Não configurar tokens reais de Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, anúncios pagos ou qualquer secret de produção no preview inicial.

## Checklist pós-deploy

Abrir manualmente:

- `/xpex-commerce`
- `/xpex-commerce/operation`
- `/xpex-commerce/metrics`
- `/xpex-commerce/tracking`
- `/xpex-commerce/calendar`
- `/xpex-commerce/links`
- `/xpex-commerce/utm-builder`
- `/xpex-commerce/attribution`
- `/xpex-commerce/link-performance`
- `/xpex-commerce/deploy-readiness`

## Critérios de aceite

- Dashboard renderiza sem backend ativo.
- Modo demo localStorage continua funcional.
- Não há coleta de secrets por formulário.
- Não há cookies novos, fingerprinting, redirect público real ou tracking silencioso.
- Backend opt-in permanece desligado até readiness Railway.

## Rollback

Se o preview quebrar:

1. Não promover para produção.
2. Reverter o PR ou criar novo commit de correção.
3. Desativar/ignorar o preview quebrado na Vercel.
4. Repetir o smoke test após correção.
