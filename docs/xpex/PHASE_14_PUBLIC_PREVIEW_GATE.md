# XpeX Phase 14 — Public Preview Gate

## Objetivo

A Fase 14 libera um preview público seguro das rotas `/xpex-commerce` na Vercel sem remover, enfraquecer ou substituir a autenticação do Postiz.

## Causa raiz

O proxy global do Postiz em `apps/frontend/src/proxy.ts` protege qualquer rota sem cookie/header de autenticação que não comece com `/auth`. Como `/xpex-commerce` é uma superfície nova dentro do frontend, ela também era redirecionada para `/auth/login` no Deploy Preview.

## Correção aplicada

Foi adicionada uma allowlist mínima e controlada por ambiente apenas para:

- `/xpex-commerce`
- `/xpex-commerce/*`

O bypass só é aplicado quando `XPEX_COMMERCE_PUBLIC_PREVIEW_ENABLED=true`. A variável server-side é a opção preferida; `NEXT_PUBLIC_XPEX_COMMERCE_PUBLIC_PREVIEW_ENABLED=true` é aceito apenas como fallback de preview.

## Segurança e guardrails

Por padrão, o preview público fica desligado. Quando ligado, ele não expõe `/api`, `/auth`, `/analytics`, `/settings`, `/launches`, `/integrations`, `/provider`, `/modal` ou outras rotas privadas do Postiz.

A superfície XpeX continua em modo demo/local-first:

- sem backend real por padrão;
- `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false` no primeiro preview;
- sem Mercado Livre API;
- sem Dub;
- sem n8n;
- sem OpenAI;
- sem WhatsApp;
- sem anúncios pagos;
- sem secrets reais;
- sem cookies novos;
- sem fingerprinting;
- sem tracking silencioso;
- sem alteração de schema de banco.

## Como validar na Vercel

1. Criar Deploy Preview a partir do PR da Fase 14.
2. Configurar `XPEX_COMMERCE_PUBLIC_PREVIEW_ENABLED=true` somente no ambiente de preview controlado.
3. Manter `NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false`.
4. Abrir `/xpex-commerce` sem login.
5. Abrir `/xpex-commerce/deploy-readiness` sem login.
6. Confirmar que `/auth/login` ainda funciona.
7. Confirmar que `/analytics`, `/settings`, `/launches` e rotas privadas do Postiz continuam exigindo autenticação.
8. Confirmar que `/api` não foi exposta pelo matcher/proxy.

## Próxima fase

A próxima fase deve ser escolhida após validação visual do preview:

- **Railway Backend Runtime Activation**, se a interface estiver estável e a equipe quiser validar backend controlado; ou
- **XpeX preview polish**, se a prioridade for melhorar copy, layout, dados demonstrativos e smoke tests visuais antes de ativar runtime backend.
