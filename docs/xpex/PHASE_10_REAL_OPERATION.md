# Phase 10 — Real Internal Operation

## Objetivo

Validar a primeira operação real controlada do XpeX Creator Commerce OS com um produto piloto, uma campanha piloto e um criador piloto. A fase continua segura: sem APIs externas, sem publicação automática, sem anúncios pagos e sem automação de WhatsApp.

## Estado herdado da Phase 09

A inspeção confirmou que o app já possui:

- `/xpex-commerce`: dashboard com localStorage preservado, backend opt-in, diagnóstico, fallback e módulos de produtos, campanhas, criadores, leads, links e criativos.
- `/xpex-commerce/import`: workflow de importação localStorage → backend com dry-run, autenticação existente, escopo de organização e sem apagar dados locais.
- `/xpex-commerce/crud-tests`: testes controlados para create/list/update status com dados seguros.
- `backend-client.ts`: cliente relativo e autenticado para diagnóstico, importação e CRUD XpeX.
- `import-planner.ts`: planejamento de importação com contagens, avisos e bloqueios.
- `use-xpex-commerce-store.ts` e `local-store.ts`: camada localStorage com fallback para backend opt-in.
- `components/index.tsx`: shell visual, SafetyNotice, OperationModeBadge e cards reutilizáveis.

A operação atual suporta produtos, campanhas, criadores, leads, links e criativos como entidades de trabalho manual/controlado.

## Operação piloto

- Criador: Anderso, criador jovem/trap/influência local.
- Produto: projetor portátil / entretenimento em casa, referenciado manualmente a partir de pesquisa humana no Mercado Livre, sem API.
- Campanha: **Seu quarto vira palco**.
- Status operacional: `PILOT_REAL_REVIEW`.

## Fluxo validado

`produto manual → campanha → criador → criativos → link manual → lead → métrica`

Cada etapa é revisada por humano antes de qualquer publicação ou compartilhamento externo.

## Rotas criadas

- `/xpex-commerce/operation`: visão de operação real controlada.
- `/xpex-commerce/creators/anderso`: perfil comercial do criador piloto.
- `/xpex-commerce/campaigns/seu-quarto-vira-palco`: brief detalhado da campanha piloto.

## Limites de segurança

- Sem Mercado Livre API.
- Sem Dub ou encurtamento automático.
- Sem n8n.
- Sem OpenAI ou qualquer API de IA.
- Sem automação de WhatsApp.
- Sem publicação automática em redes sociais.
- Sem anúncios pagos.
- Sem segredos, tokens, credenciais ou dados pessoais sensíveis.
- Sem comandos destrutivos de banco.

## Próxima Phase 11

Criar camada de métricas e rastreamento manual avançado: registro de cliques manuais, origem/canal, leads por CTA, status de resposta e painel de performance inicial para decidir se a integração externa deve ser habilitada em fases futuras.
