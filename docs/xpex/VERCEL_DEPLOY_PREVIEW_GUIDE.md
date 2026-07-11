# XpeX Phase 13 — Vercel Deploy Preview Guide

## Objetivo

Publicar o frontend do XpeX Creator Commerce OS em **Deploy Preview na Vercel** para validação visual, mantendo o modo demo via `localStorage` e o backend opt-in desligado.

## Estrutura verificada

- Monorepo pnpm com `pnpm-workspace.yaml` incluindo `apps/*` e `libraries/*`.
- Frontend Next.js em `apps/frontend`.
- Script real dentro de `apps/frontend/package.json`: `pnpm run build`, que executa `next build` quando o diretório atual já é `apps/frontend`.
- Script filtrado válido a partir do root do monorepo: `pnpm --filter ./apps/frontend run build`.
- Script global real: `pnpm run build` executa frontend, backend e orchestrator em sequência a partir do root do monorepo.

## Configuração recomendada na Vercel

Use esta configuração para o primeiro Deploy Preview:

| Campo Vercel | Valor recomendado |
| --- | --- |
| Root Directory | `apps/frontend` |
| Install Command | `pnpm install` |
| Build Command | `pnpm run build` |
| Output Directory | `.next` / padrão Next.js da Vercel |

Com **Root Directory = `apps/frontend`**, a Vercel executa comandos a partir de `apps/frontend`. Portanto, **não use** `pnpm --filter ./apps/frontend run build` nessa configuração; esse comando filtrado pode apontar para um caminho incorreto relativo ao root já alterado.

## Alternativa: root do monorepo

Se o projeto Vercel for configurado com **Root Directory = `./`** no root do monorepo, aí o comando filtrado é válido:

```bash
pnpm --filter ./apps/frontend run build
```

Use apenas uma das duas opções:

1. **Recomendado:** root `apps/frontend` + `pnpm run build`.
2. **Alternativo:** root `./` + `pnpm --filter ./apps/frontend run build`.

Não misture root `apps/frontend` com comando filtrado do monorepo.

## Passos de preview

1. Conectar a conta GitHub e selecionar `xpex-systems-ai/XpeX-Creator-Commerce-OS`.
2. Criar projeto Vercel para o frontend.
3. Definir **Root Directory** como `apps/frontend`.
4. Definir **Install Command** como `pnpm install`.
5. Definir **Build Command** como `pnpm run build`.
6. Manter output padrão do Next.js (`.next`, quando a Vercel solicitar output manual).
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


## Public Preview Gate

Para visualizar o XpeX Creator Commerce OS sem login no Deploy Preview, configure explicitamente na Vercel:

```bash
XPEX_COMMERCE_PUBLIC_PREVIEW_ENABLED=true
NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false
```

O gate público é restrito a `/xpex-commerce` e subrotas. Ele existe apenas para o preview demo/local-first, não ativa backend real, não adiciona secrets e não liga Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, anúncios pagos ou redirect público real. Mantenha `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false` no primeiro preview.

Rotas de teste do preview público:

- `/xpex-commerce`
- `/xpex-commerce/deploy-readiness`
- `/xpex-commerce/links`
- `/xpex-commerce/utm-builder`
- `/xpex-commerce/attribution`
- `/xpex-commerce/link-performance`

As rotas `/auth`, `/settings`, `/analytics`, APIs e demais rotas privadas do Postiz continuam protegidas pelo proxy global. Não configure tokens reais ou secrets de produção no ambiente de preview inicial.

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

## Validação anti-regressão

O preview só é considerado válido se:

- A Vercel executar um build Next.js real.
- O diretório `.next` for gerado no contexto do app frontend.
- A rota `/xpex-commerce/deploy-readiness` abrir no Deploy Preview.
- O dashboard `/xpex-commerce` renderizar em modo localStorage demo com backend opt-in desligado.

Um comando que retorna sucesso mas não gera `.next` no app frontend **não deve ser aceito** como deploy válido.

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
