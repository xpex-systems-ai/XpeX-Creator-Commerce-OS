'use client';

import { DeployCommandBox, DeployEnvironmentMatrix, DeployGuardrailList, DeployReadinessGroupPanel, MetricCard, OperationModeBadge, SafetyNotice, SectionHeader, XpeXPublicPreviewNotice, XpeXPageShell } from '../components';
import { buildDeployReadinessChecklist, getDeployReadinessSummary, getXpeXDeployEnvironmentMatrix } from '../lib/deploy-readiness';
import { useXpeXCommerceStore } from '../lib/use-xpex-commerce-store';

export default function XpeXDeployReadinessPage() {
  const { mode, backendAvailability, operationNotice } = useXpeXCommerceStore();
  const groups = buildDeployReadinessChecklist();
  const summary = getDeployReadinessSummary(groups);
  const environments = getXpeXDeployEnvironmentMatrix();

  return <XpeXPageShell eyebrow="Phase 13 · Deploy Preview e Railway Readiness" title="Deploy Readiness" description="Checklist visual para preparar Vercel Preview do frontend e Railway backend/banco em modo seguro, sem secrets, sem APIs externas e sem automações perigosas.">
    <XpeXPublicPreviewNotice context="deploy-readiness" />
    <SafetyNotice mode={mode} availability={backendAvailability} notice={operationNotice} />
    <OperationModeBadge mode={mode} availability={backendAvailability} notice={operationNotice} />

    <section className="grid gap-4 md:grid-cols-4">
      <MetricCard label="Total" value={summary.total} detail="Itens de readiness revisáveis em PR." />
      <MetricCard label="Ready" value={summary.ready} detail="Seguro para Vercel Preview localStorage-first." />
      <MetricCard label="Warning" value={summary.warning} detail="Exige validação operacional antes do opt-in." />
      <MetricCard label="Blocked" value={summary.blocked} detail="Não há bloqueios ativos nesta camada estática." />
    </section>

    <section className="rounded-[2rem] border border-[#F5B301]/25 bg-[#F5B301]/10 p-7"><SectionHeader eyebrow="Primeiro deploy recomendado" title="Vercel frontend com localStorage demo" description="Publicar apenas a interface em Preview, com backend opt-in desligado por padrão. A rota /xpex-commerce/deploy-readiness deve renderizar sem backend ativo." /><div className="mt-6 grid gap-4 lg:grid-cols-3"><DeployCommandBox title="Vercel recomendada · root apps/frontend" commands={["Root directory: apps/frontend", "Install command: pnpm install", "Build command: pnpm run build", "Output directory: .next (Next.js default)", "Backend opt-in: NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false"]} /><DeployCommandBox title="Alternativa · root do monorepo" commands={["Root directory: ./", "Install command: pnpm install", "Build command: pnpm --filter ./apps/frontend run build", "Use apenas quando a Vercel estiver no root do monorepo", "Não usar comando filtrado com root apps/frontend"]} /><DeployCommandBox title="Rotas de smoke test" commands={["/xpex-commerce", "/xpex-commerce/operation", "/xpex-commerce/metrics", "/xpex-commerce/tracking", "/xpex-commerce/calendar", "/xpex-commerce/links", "/xpex-commerce/utm-builder", "/xpex-commerce/attribution", "/xpex-commerce/link-performance", "/xpex-commerce/deploy-readiness"]} /></div><p className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50"><strong>Aviso anti-regressão:</strong> comando filtrado no root errado pode retornar sucesso sem gerar um build Next real. O preview só é válido se a Vercel gerar .next e abrir /xpex-commerce/deploy-readiness.</p></section>



    <section className="rounded-[2rem] border border-[#F5B301]/25 bg-[#F5B301]/10 p-7"><SectionHeader eyebrow="Phase 15" title="Runtime Preview Debug" description="Se /xpex-commerce cair no login, o proxy está preservando a segurança porque o gate não foi visto como habilitado no runtime desse deployment." /><div className="mt-6 grid gap-4 lg:grid-cols-3"><DeployCommandBox title="Env e redeploy" commands={["Confirmar XPEX_COMMERCE_PUBLIC_PREVIEW_ENABLED=true", "Selecionar Preview ou Production conforme a URL", "Fazer redeploy após alterar env", "Manter NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false"]} /><DeployCommandBox title="Deployment correto" commands={["Abrir a URL do deployment com status success", "Evitar URLs antigas ou de outro projeto", "Validar /xpex-commerce/preview-status", "Checar headers no DevTools/Network"]} /><DeployCommandBox title="Projetos duplicados" commands={["Múltiplos projetos Vercel podem apontar para o mesmo repo", "A env precisa estar no projeto realmente aberto", "Domínios customizados podem apontar para deployment antigo", "Revalidar após promover ou redeployar"]} /></div></section>

    <section className="rounded-[2rem] border border-[#8DB4FF]/25 bg-[#8DB4FF]/10 p-7"><SectionHeader eyebrow="Segundo deploy recomendado" title="Railway backend/banco em ambiente controlado" description="Preparar Railway apenas depois que o preview Vercel estiver validado. Ativar backend opt-in somente após health/diagnostics e revisão manual." /><div className="mt-6"><DeployGuardrailList items={["Sem Mercado Livre API", "Sem Dub", "Sem n8n", "Sem OpenAI", "Sem WhatsApp", "Sem anúncios pagos", "Sem redirect público real", "Sem cookies novos", "Sem fingerprinting", "Sem comandos destrutivos de banco"]} /></div></section>

    {groups.map((group) => <DeployReadinessGroupPanel key={group.id} group={group} />)}

    <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Matriz de ambientes" title="Onde cada parte deve rodar" description="Dados estáticos e placeholders seguros para orientar Vercel, Railway e operação local." /><div className="mt-6"><DeployEnvironmentMatrix environments={environments} /></div></section>

    <section className="rounded-[2rem] border border-amber-300/30 bg-amber-300/10 p-7 text-sm leading-7 text-amber-50"><strong>Escopo seguro da Fase 13:</strong> esta página prepara deploy e readiness operacional; ela não conecta Mercado Livre API, Dub, n8n, OpenAI, WhatsApp, anúncios pagos ou redirect público. Também não coleta secrets, não rastreia usuários silenciosamente, não adiciona cookies e não altera schema de banco.</section>
  </XpeXPageShell>;
}
