# XpeX Phase 13 — Railway Backend Readiness Guide

## Objetivo

Preparar Railway para backend, banco e operação real controlada do XpeX Creator Commerce OS **sem ativar integrações externas**.

## Escopo seguro

Railway deve ser usado para:

- Serviço backend autenticado.
- Postgres gerenciado.
- Redis/serviços internos quando necessário.
- Health checks, diagnostics e CRUD controlado em ambiente autenticado.

Railway não deve ligar Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, anúncios pagos, redirect público real ou automações de publicação.

## Estrutura verificada

- Backend em `apps/backend`.
- Script real de build backend: `pnpm --filter ./apps/backend run build`.
- Script real de start backend: `pnpm --filter ./apps/backend run start`.
- Prisma generate real no monorepo: `pnpm run prisma-generate`.

## Etapas recomendadas

1. Criar projeto Railway para homologação XpeX.
2. Conectar o repositório GitHub.
3. Criar serviço backend apontando para `apps/backend` ou para o monorepo com comando filtrado.
4. Criar Postgres gerenciado no Railway.
5. Configurar variáveis somente com placeholders durante documentação/revisão.
6. Rodar build e start controlados.
7. Validar health/diagnostics do backend.
8. Só depois habilitar frontend com `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true` em ambiente separado de teste.

## Placeholders de ambiente

```bash
DATABASE_URL=<railway-postgres-url>
REDIS_URL=<railway-redis-url>
JWT_SECRET=<generated-long-random-secret>
FRONTEND_URL=<vercel-preview-url>
NEXT_PUBLIC_BACKEND_URL=<railway-backend-url>
BACKEND_INTERNAL_URL=<railway-backend-internal-url>
NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false
```

Não registrar secrets reais em documentação, commits, issues ou PRs.

## Comandos seguros

```bash
pnpm install
pnpm run prisma-generate
pnpm --filter ./apps/backend run build
pnpm --filter ./apps/backend run start
```

Não rodar comandos destrutivos de banco como reset, drop, truncate ou push com perda de dados em ambientes compartilhados.

## Smoke test operacional

1. Validar backend health/diagnostics autenticado.
2. Abrir o frontend em `/xpex-commerce/diagnostics` se disponível no ambiente ou usar o painel de diagnóstico existente do dashboard.
3. Rodar CRUD controlado pela rota `/xpex-commerce/crud-tests` somente em ambiente autenticado e com dados `TEST_DEMO_XPEX`.
4. Confirmar fallback localStorage caso o backend fique indisponível.
5. Manter opt-in desligado em produção até aprovação manual.

## Guardrails

- Sem Mercado Livre API.
- Sem Dub.
- Sem n8n.
- Sem OpenAI.
- Sem WhatsApp.
- Sem anúncios pagos.
- Sem redirect público real.
- Sem coleta silenciosa de usuários.
- Sem comandos destrutivos de banco.
