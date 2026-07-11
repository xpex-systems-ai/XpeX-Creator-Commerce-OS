# XpeX Phase 16 — Vercel Deploy Preview Guide

## Objetivo

Publicar o frontend do XpeX Creator Commerce OS em **Deploy Preview na Vercel** para validação visual. Após a Fase 16, `/xpex-commerce` abre sem login por padrão como superfície standalone/manual-first, mantendo o modo demo via `localStorage` e o backend opt-in desligado.

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
7. Criar Deploy Preview a partir do PR da Fase 16.
8. Abrir `/xpex-commerce` e validar a navegação sem login.
9. Confirmar que `/analytics`, `/settings` e `/launches` continuam exigindo autenticação.

## Variáveis permitidas apenas como placeholders

Use somente placeholders e valores não sensíveis no guia/PR. O primeiro preview deve manter backend desativado:

```bash
XPEX_COMMERCE_REQUIRE_AUTH=false
NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false
NEXT_PUBLIC_BACKEND_URL=<optional-preview-backend-placeholder>
FRONTEND_URL=<vercel-preview-url-placeholder>
```

Não configurar tokens reais de Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, anúncios pagos ou qualquer secret de produção no preview inicial.


## Standalone open surface

Após a Fase 16, `/xpex-commerce` e subrotas abrem sem login por padrão. A operação não depende mais de `XPEX_COMMERCE_PUBLIC_PREVIEW_ENABLED=true`; essa variável permanece apenas como compatibilidade legada/diagnóstico.

Para fechar novamente o corredor XpeX e enviá-lo ao fluxo protegido do Postiz, configure opcionalmente:

```bash
XPEX_COMMERCE_REQUIRE_AUTH=true
NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false
```

O bypass continua restrito a `/xpex-commerce` e subrotas. Ele não ativa backend real, não expõe `/api`, não adiciona secrets e não liga Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, anúncios pagos ou redirect público real. Mantenha `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false` no primeiro preview.

Smoke tests abertos esperados:

- `/xpex-commerce`
- `/xpex-commerce/preview-status`
- `/xpex-commerce/deploy-readiness`
- `/xpex-commerce/links`
- `/xpex-commerce/utm-builder`
- `/xpex-commerce/attribution`
- `/xpex-commerce/link-performance`

Smoke tests protegidos esperados:

- `/auth/login` deve abrir como login.
- `/analytics` deve exigir auth.
- `/settings` deve exigir auth.
- `/launches` deve exigir auth.
- `/api` não foi exposta pela Fase 16.

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
- `/xpex-commerce/preview-status`
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

## Se ainda cair no login

Quando `/xpex-commerce` redirecionar para `/auth/login` após a Fase 16, trate primeiro como sinal de que `XPEX_COMMERCE_REQUIRE_AUTH=true` pode estar ativo no ambiente daquele deployment. Use este checklist antes de alterar código de autenticação:

1. Confirme que a URL aberta pertence ao projeto Vercel correto do repositório `xpex-systems-ai/XpeX-Creator-Commerce-OS`.
2. Confirme que `XPEX_COMMERCE_REQUIRE_AUTH` não está configurada como `true` no ambiente correto: **Preview** para Deploy Preview ou **Production** para deploy promovido.
3. Faça um novo redeploy depois de criar ou alterar a env. Criar a variável após o deploy não altera automaticamente o runtime de um deployment já gerado.
4. Abra a URL direta `/xpex-commerce` no deployment com status **success**.
5. Limpe cache, use aba anônima ou teste uma URL recém-gerada para evitar sessão/cache antigo.
6. Valide no DevTools/Network se os headers seguros aparecem: `x-xpex-standalone-surface: open` e `x-xpex-auth-boundary: postiz-private-routes-preserved`.
7. Se houver múltiplos projetos Vercel apontando para o mesmo repo, repita a conferência de env no projeto que realmente serve o domínio aberto.

Esses headers são diagnósticos booleanos e não carregam valores reais de env, tokens, secrets, cookies ou dados de usuário.
