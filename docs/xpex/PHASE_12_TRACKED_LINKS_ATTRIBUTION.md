# Fase 12 — Links rastreáveis, UTMs e atribuição manual

## Achados da Fase 11

A inspeção confirmou que `/xpex-commerce/metrics`, `/tracking`, `/performance`, `/calendar`, `/leads`, `/links` e `/operation` já mantêm a operação piloto controlada com dados manuais. Os arquivos `metrics.ts`, `pilot-operation.ts`, `local-store.ts`, `types.ts`, `use-xpex-commerce-store.ts`, `backend-client.ts` e `components/index.tsx` já forneciam campanha, criador, canal, criativo, leads, vendas manuais, métricas manuais, fallback localStorage e backend opt-in.

## Objetivo

Organizar links rastreáveis, UTMs e atribuição manual antes de qualquer integração externa. O fluxo operacional passa a ser: produto -> campanha -> criador -> criativo -> link UTM -> lead -> venda manual -> comissão estimada.

## Rotas criadas

- `/xpex-commerce/utm-builder`: construtor local de URLs UTM.
- `/xpex-commerce/link-performance`: ranking e funil por link com dados manuais.
- `/xpex-commerce/attribution`: associação manual de lead/venda a link interno.

## Links rastreáveis

A Fase 12 adiciona `TrackedLink`, `UtmParams`, `LinkAttribution`, `LinkPerformanceSnapshot`, `LinkStatus` e `LinkRiskStatus`. Os helpers geram slug interno planejado, URL UTM local, validação de destino e ranking por cliques, leads, vendas e comissão informados manualmente.

## Limites de segurança

Não há Dub, redirect público real, Mercado Livre API, rastreamento automático, pixel, scraping, captura silenciosa de usuário, WhatsApp API, OpenAI, n8n, anúncios pagos ou publicação automática. URLs sem `http/https` e protocolos inseguros são bloqueados na camada local.

## Próxima Fase 13

Preparar redirect interno seguro ou integração de encurtador aprovada, ainda em ambiente controlado, com revisão humana, logs claros, escopo por organização e sem captura silenciosa.


## Nota de consistência do PR #14

`/xpex-commerce/links`, `/xpex-commerce/attribution` e `/xpex-commerce/link-performance` devem usar a mesma lógica local de totais atribuídos. Leads, vendas e comissão continuam sendo métricas manuais, derivadas de `linkAttributions` e dos valores base do link, sem tracking automático, sem redirect público real e sem chamada a provedor externo.
