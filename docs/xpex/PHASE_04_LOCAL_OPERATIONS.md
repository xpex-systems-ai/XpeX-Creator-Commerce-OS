# Phase 04 — Local controlled operations

A Fase 04 transforma o MVP visual do XpeX Creator Commerce OS em uma operação local controlada. Produtos, campanhas, criativos, links planejados e leads podem ser cadastrados manualmente e persistidos apenas no navegador com `localStorage`, usando fallback em memória quando `window` não existe.

## Decisões de implementação

- A implementação ficou isolada em `apps/frontend/src/app/xpex-commerce` para preservar auth, OAuth, publicação social Postiz, backend, Prisma e providers existentes.
- A camada `lib/local-store.ts` centraliza seed, leitura, gravação, reset e exportação JSON do estado local.
- O hook `lib/use-xpex-commerce-store.ts` expõe operações tipadas para as telas client-side.
- Os componentes visuais existentes foram preservados: `XpeXPageShell`, `SafetyNotice`, `ProductCard`, `CampaignCard`, `LinkPlanCard`, `MetricCard`, `SectionHeader` e `StatusBadge`.
- O seed inicial mantém Anderso, o produto **Projetor portátil** e a campanha **Seu quarto vira palco**.

## Rotas alteradas

- `/xpex-commerce`: dashboard com totais locais, acesso a Leads/CRM e painel de exportação JSON.
- `/xpex-commerce/products`: cadastro e status local de produtos.
- `/xpex-commerce/campaigns`: cadastro e status local de campanhas.
- `/xpex-commerce/links`: cadastro de slugs planejados sem redirect real.
- `/xpex-commerce/creatives`: registro manual de hook, slogan, legenda, roteiro curto e texto de WhatsApp.

## Nova rota

- `/xpex-commerce/leads`: CRM local para leads manuais com status Novo, Link enviado, Interessado, Comprou, Follow-up, Não respondeu e Descartado.

## Limites seguros

- Sem banco real.
- Sem Prisma migration.
- Sem Mercado Livre API.
- Sem Dub.
- Sem n8n.
- Sem OpenAI ou qualquer geração IA real.
- Sem envio WhatsApp ou mensagens automáticas.
- Sem anúncios pagos.
- Sem segredos, tokens ou chaves reais.
- Sem alteração de auth, OAuth providers ou lógica de publicação social Postiz.

## Checklist de validação

- Produtos podem ser cadastrados localmente.
- Campanhas podem ser cadastradas localmente.
- Links planejados podem ser cadastrados localmente.
- Criativos podem ser registrados manualmente.
- Leads podem ser cadastrados localmente.
- O dashboard reflete contagens do localStorage.
- O SafetyNotice fica visível nas telas operacionais.
- A exportação JSON mostra o estado local atual.
- Code search confirma ausência de chamadas externas ou segredos em `xpex-commerce`.

## Próximos passos — Phase 05

A Fase 05 deve revisar o modelo real de dados e desenhar uma API backend segura antes de qualquer integração externa. Somente depois dessa revisão devem ser avaliadas integrações com Mercado Livre, Dub, n8n, OpenAI/IA real, CRM ou métricas persistidas no servidor.
