# XpeX Phase 15 — Runtime Preview Diagnostics

## Objetivo

A Fase 15 adiciona diagnóstico runtime seguro para o Public Preview Gate do XpeX Creator Commerce OS na Vercel. O objetivo é diferenciar falha de configuração/deployment de falha de código quando `/xpex-commerce` ainda redireciona para `/auth/login`.

## Hipóteses de falha

- `XPEX_COMMERCE_PUBLIC_PREVIEW_ENABLED` não foi configurada no projeto Vercel correto.
- A variável foi criada depois do deploy e o deployment não foi reexecutado.
- A URL aberta pertence a outro projeto/deployment antigo apontando para o mesmo repositório.
- A variável foi configurada em Production, mas a URL testada é Preview, ou o inverso.
- O proxy precisa sinalizar de forma verificável que a rota passou pelo bypass seguro.

## Diagnóstico por headers seguros

Quando uma requisição sem autenticação para `/xpex-commerce` ou subrota encontra o gate habilitado, o proxy retorna a resposta normal com headers booleanos:

```txt
x-xpex-preview-route: true
x-xpex-preview-gate: enabled
```

Esses headers não incluem valores reais de env, secrets, tokens, cookies, URLs internas ou dados de usuário. Eles servem apenas para validar, pelo DevTools/Network, que o runtime do deployment leu o gate como habilitado.

## Rota `/xpex-commerce/preview-status`

A nova rota estática `/xpex-commerce/preview-status` documenta o checklist operacional para validar o preview na Vercel:

- env configurada no projeto e ambiente corretos;
- redeploy feito depois de alterar env;
- URL direta `/xpex-commerce` aberta no deployment com status success;
- headers seguros validados no DevTools;
- backend opt-in mantido como `false` no primeiro preview público.

A página não lê `process.env` no client, não chama backend, não chama APIs externas e não depende de dados sensíveis.

## Limites de segurança

- Não remove autenticação global do Postiz.
- Não torna `/auth`, `/api`, `/analytics`, `/settings`, `/launches`, `/integrations`, `/provider`, `/modal` ou rotas administrativas públicas.
- Não expõe secrets ou valores reais de variáveis de ambiente.
- Não adiciona cookies, fingerprinting, pixel, tracking silencioso ou redirect público real.
- Não ativa Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, anúncios pagos ou automações externas.
- Não altera schema de banco.

## Próxima fase

Depois que `/xpex-commerce` abrir publicamente no preview com os headers seguros, a próxima fase recomendada é **Preview Polish** ou **Railway Backend Runtime Activation** em modo controlado, mantendo backend opt-in e revisão manual.
