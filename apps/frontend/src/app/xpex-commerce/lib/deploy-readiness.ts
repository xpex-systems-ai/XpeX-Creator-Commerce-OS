export type DeployTarget = 'vercel-frontend' | 'railway-backend' | 'railway-database' | 'github-flow' | 'local-safety';
export type DeployRiskLevel = 'ready' | 'warning' | 'blocked';

export type DeployReadinessItem = {
  id: string;
  label: string;
  detail: string;
  target: DeployTarget;
  status: DeployRiskLevel;
  owner: string;
};

export type DeployReadinessGroup = {
  id: string;
  title: string;
  description: string;
  items: DeployReadinessItem[];
};

export type XpeXDeployEnvironment = {
  id: 'local' | 'vercel-preview' | 'vercel-production' | 'railway-backend' | 'railway-database';
  label: string;
  purpose: string;
  recommendedState: string;
  allowedEnv: string[];
  blockedActions: string[];
};

export function buildDeployReadinessChecklist(): DeployReadinessGroup[] {
  return [
    {
      id: 'vercel-preview',
      title: 'Vercel Frontend Preview',
      description: 'Primeiro deploy recomendado: interface Next.js do app frontend com localStorage demo e backend opt-in desligado.',
      items: [
        { id: 'frontend-root', label: 'Root do projeto validado', detail: 'Configurar Vercel apontando para apps/frontend dentro do monorepo.', target: 'vercel-frontend', status: 'ready', owner: 'Frontend' },
        { id: 'frontend-build', label: 'Build command validado por root', detail: 'Recomendado na Vercel: Root directory apps/frontend com pnpm run build. Alternativa filtrada somente quando o root for o monorepo.', target: 'vercel-frontend', status: 'ready', owner: 'Frontend' },
        { id: 'frontend-local-storage', label: 'localStorage demo preservado', detail: 'Sem backend obrigatório; dados demonstrativos continuam salvos no navegador.', target: 'local-safety', status: 'ready', owner: 'Operação' },
        { id: 'frontend-backend-opt-in', label: 'Backend opt-in desligado por padrão', detail: 'NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED deve permanecer diferente de true no primeiro preview.', target: 'vercel-frontend', status: 'ready', owner: 'Operação' },
      ],
    },
    {
      id: 'railway-readiness',
      title: 'Railway Backend e Banco',
      description: 'Preparação controlada para backend, Postgres e diagnósticos depois que o preview visual estiver aprovado.',
      items: [
        { id: 'railway-service', label: 'Serviço backend separado', detail: 'Railway deve apontar para apps/backend e usar scripts reais do pacote backend.', target: 'railway-backend', status: 'warning', owner: 'Backend' },
        { id: 'railway-db', label: 'Postgres controlado', detail: 'Banco preparado com placeholders e sem comandos destrutivos de reset/drop/truncate.', target: 'railway-database', status: 'warning', owner: 'Infra' },
        { id: 'railway-diagnostics', label: 'Health e diagnostics antes do opt-in', detail: 'Validar diagnóstico autenticado antes de habilitar qualquer frontend contra backend real.', target: 'railway-backend', status: 'warning', owner: 'QA' },
      ],
    },
    {
      id: 'env-vars',
      title: 'Environment Variables',
      description: 'Somente placeholders seguros, nenhum segredo real e nenhum token de integrações externas.',
      items: [
        { id: 'env-placeholders', label: 'Placeholders somente', detail: 'Guias usam valores como <railway-postgres-url> e <generated-jwt-secret>, nunca valores reais.', target: 'github-flow', status: 'ready', owner: 'Infra' },
        { id: 'env-no-external-tokens', label: 'Tokens externos bloqueados', detail: 'Mercado Livre API, Dub, n8n, OpenAI, WhatsApp e ads seguem sem configuração ativa.', target: 'local-safety', status: 'ready', owner: 'Segurança' },
      ],
    },
    {
      id: 'smoke-tests',
      title: 'Smoke Tests e Guardrails',
      description: 'Validação visual e operacional sem coleta silenciosa, cookies novos, fingerprinting ou redirect público real.',
      items: [
        { id: 'routes-smoke', label: 'Rotas XpeX preservadas', detail: 'Abrir dashboard, operation, metrics, tracking, calendar, links, UTM, attribution, link-performance e deploy-readiness.', target: 'vercel-frontend', status: 'ready', owner: 'QA' },
        { id: 'github-pr-flow', label: 'GitHub PR flow', detail: 'Deploy preview deve ser revisado por PR antes de qualquer produção.', target: 'github-flow', status: 'ready', owner: 'Produto' },
        { id: 'no-public-redirect', label: 'Sem redirect público real', detail: 'Links permanecem rastreáveis manualmente, sem endpoint público de redirecionamento.', target: 'local-safety', status: 'ready', owner: 'Segurança' },
      ],
    },
  ];
}

export function getDeployReadinessSummary(groups = buildDeployReadinessChecklist()) {
  const items = groups.flatMap((group) => group.items);
  return {
    total: items.length,
    ready: items.filter((item) => item.status === 'ready').length,
    warning: items.filter((item) => item.status === 'warning').length,
    blocked: items.filter((item) => item.status === 'blocked').length,
  };
}

export function getXpeXDeployEnvironmentMatrix(): XpeXDeployEnvironment[] {
  return [
    { id: 'local', label: 'Local', purpose: 'Desenvolvimento e revisão segura.', recommendedState: 'localStorage demo ativo; backend opcional por opt-in.', allowedEnv: ['NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false'], blockedActions: ['Secrets reais', 'APIs externas', 'comandos destrutivos de banco'] },
    { id: 'vercel-preview', label: 'Vercel Preview', purpose: 'Tela viva para validação visual do frontend.', recommendedState: 'Primeiro deploy com backend opt-in desligado.', allowedEnv: ['NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false', 'NEXT_PUBLIC_BACKEND_URL=<preview-placeholder-if-needed>'], blockedActions: ['Tokens externos', 'tracking silencioso', 'redirect público real'] },
    { id: 'vercel-production', label: 'Vercel Production', purpose: 'Somente após preview e smoke tests aprovados.', recommendedState: 'Aguardar aprovação operacional.', allowedEnv: ['NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false'], blockedActions: ['Promover sem PR', 'ativar backend sem readiness'] },
    { id: 'railway-backend', label: 'Railway Backend', purpose: 'Runtime backend autenticado e diagnóstico controlado.', recommendedState: 'Preparar depois do Vercel Preview aprovado.', allowedEnv: ['DATABASE_URL=<railway-postgres-url>', 'REDIS_URL=<railway-redis-url>', 'JWT_SECRET=<generated-secret>'], blockedActions: ['Mercado Livre API', 'Dub', 'n8n', 'OpenAI', 'WhatsApp', 'paid ads'] },
    { id: 'railway-database', label: 'Railway Database', purpose: 'Postgres gerenciado para backend controlado.', recommendedState: 'Sem reset/drop/truncate; validar migração separadamente.', allowedEnv: ['DATABASE_URL=<railway-postgres-url>'], blockedActions: ['drop', 'truncate', 'migrate reset', 'db push --accept-data-loss'] },
  ];
}
