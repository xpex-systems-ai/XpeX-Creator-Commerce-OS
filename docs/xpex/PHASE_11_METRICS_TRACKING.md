# XpeX Creator Commerce OS — Phase 11: Manual Metrics, Tracking and Performance

## Objetivo

A Fase 11 mede a operação piloto real controlada com dados manuais antes de conectar automações externas. O piloto continua centrado no criador Anderso, na campanha **Seu quarto vira palco** e no produto **Projetor portátil / entretenimento em casa**.

## Achados da inspeção da Fase 10

- `/xpex-commerce/operation` já descrevia a operação real controlada e reforçava revisão humana antes da publicação.
- `/xpex-commerce/creators/anderso` já concentrava perfil, canais e prontidão do criador piloto.
- `/xpex-commerce/campaigns/seu-quarto-vira-palco` já apresentava brief, CTA e checklist da campanha.
- `/xpex-commerce/creatives` já armazenava hooks, legendas, roteiros e textos sem geração por IA externa.
- `/xpex-commerce/links` já mantinha slugs planejados/manual links sem redirecionamento real.
- `pilot-operation.ts` já trazia canais do piloto: Instagram Reels, TikTok, YouTube Shorts e WhatsApp Status.
- `use-xpex-commerce-store.ts` e `local-store.ts` já preservavam localStorage demo, backend opt-in, fallback e importação controlada.

## Rotas criadas/atualizadas

- `/xpex-commerce/metrics`: painel de métricas manuais com cards, tabela por canal e ranking de criativos.
- `/xpex-commerce/tracking`: formulário para registrar canal, criativo, data, visualizações, cliques estimados, leads, mensagens, vendas informadas e observações.
- `/xpex-commerce/leads`: CRM manual com nome/apelido opcional, canal, interesse, status, observação e data operacional.
- `/xpex-commerce/performance`: funil do piloto e recomendações por regras simples locais.
- `/xpex-commerce/calendar`: calendário operacional de 7 dias para Anderso divulgar o projetor.

## Fluxo de métricas

1. Visualização manual informada pelo operador.
2. Clique estimado registrado manualmente.
3. Lead/intenção de compra registrado sem dado sensível.
4. Mensagem recebida contabilizada manualmente.
5. Venda informada manualmente.
6. Comissão estimada calculada localmente.
7. Criativo vencedor ranqueado por regra local simples.

## Limitações e segurança

- Sem Mercado Livre API.
- Sem Dub ou encurtador integrado.
- Sem n8n.
- Sem OpenAI ou qualquer IA externa.
- Sem WhatsApp API.
- Sem anúncios pagos automatizados.
- Sem autopublicação em redes sociais.
- Sem scraping/crawler de redes sociais.
- Sem coleta de CPF, documento, endereço completo, senha, token ou dados sensíveis.

## Próxima fase

A Fase 12 deve preparar, com opt-in e revisão humana, links rastreáveis e encurtamento controlado sem ativar automações irreversíveis.
