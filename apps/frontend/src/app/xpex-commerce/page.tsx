'use client';

import { ExportJsonPanel } from './components/local-forms';
import { SafetyNotice, OperationModeBadge, CampaignCard, MetricCard, ModuleCard, ProductCard, SectionHeader, StatusBadge, XpeXPageShell } from './components';
import { xpexCreatorCommerceMock } from './mock-data';
import { useXpeXCommerceStore } from './lib/use-xpex-commerce-store';

export default function XpeXCommercePage() {
  const data = xpexCreatorCommerceMock;
  const { state, mode, backendAvailability, backendCheckedAt, fallbackReason, operationNotice } = useXpeXCommerceStore();
  const metrics = [
    { title: 'Produtos', value: state.products.length, detail: mode === 'backend' ? 'Backend controlado com fallback local' : 'Produtos salvos no navegador' },
    { title: 'Campanhas', value: state.campaigns.length, detail: mode === 'backend' ? 'API autenticada ou fallback local' : 'Briefings manuais controlados' },
    { title: 'Links planejados', value: state.linkPlans.length, detail: 'Slugs sem redirect real' },
    { title: 'Leads locais', value: state.leads.length, detail: 'CRM manual sem WhatsApp/API' },
    { title: 'Métricas manuais', value: state.manualMetrics?.length || 0, detail: 'Tracking manual Fase 11' },
    { title: 'Criativos locais', value: state.creativeBriefs.length, detail: 'Hooks e roteiros sem IA real' },
    { title: 'Criadores', value: state.creators.length, detail: 'Anderso como creator piloto' },
  ];
  return <XpeXPageShell eyebrow="Phase 11 · Métricas e Performance" title="XpeX Creator Commerce OS" description="Máquina de vendas com produto piloto, criador Anderso, campanha Seu quarto vira palco, métricas manuais, tracking, leads, performance e calendário — preservando localStorage, backend opt-in, importação, CRUD controlado, fallback seguro e sem integrações externas.">
    <SafetyNotice mode={mode} availability={backendAvailability} notice={operationNotice} />
    <OperationModeBadge mode={mode} availability={backendAvailability} notice={operationNotice} />
    <section className="rounded-[2rem] border border-[#F5B301]/25 bg-[#F5B301]/10 p-6">
      <SectionHeader eyebrow="Phase 09 · Importação e CRUD controlado" title="Diagnóstico operacional seguro" description="Painel de prontidão para validar o backend real antes de qualquer integração externa." />
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Modo atual" value={mode === 'backend' ? 'Backend' : 'Local'} detail={mode === 'backend' ? 'Opt-in por NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=true' : 'Demo localStorage preservado'} />
        <MetricCard label="Backend" value={backendAvailability} detail={backendAvailability === 'available' ? 'Diagnóstico autenticado disponível' : backendAvailability === 'fallback' ? 'Fallback localStorage ativo' : backendAvailability === 'disabled' ? 'Backend não habilitado' : 'Aguardando verificação'} />
        <MetricCard label="Última checagem" value={backendCheckedAt ? new Date(backendCheckedAt).toLocaleTimeString('pt-BR') : '—'} detail={backendCheckedAt || 'Sem chamada ao backend nesta sessão'} />
        <MetricCard label="Integrações externas" value="Off" detail="Mercado Livre, Dub, n8n, OpenAI, WhatsApp e ads não conectados" />
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {['Frontend isolado', 'Backend client relativo', 'Auth existente', 'Organization scope', 'Fallback localStorage', 'APIs externas desligadas'].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white/75">✓ {item}</div>)}
      </div>
      {fallbackReason ? <p className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">Motivo do fallback: {fallbackReason}</p> : null}
    </section>
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">{metrics.map((module) => <MetricCard key={module.title} label={module.title} value={module.value} detail={module.detail} />)}</section>
    <section className="rounded-[2rem] border border-[#8DB4FF]/25 bg-[#8DB4FF]/10 p-7"><SectionHeader eyebrow="Controle de Performance" title="Fase 11 ativa" description="Métricas manuais, rastreamento, leads, performance e calendário operacional sem integrações externas." /><div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4"><ModuleCard href="/xpex-commerce/metrics" title="Painel de Métricas" detail="Visualizações, cliques, leads, mensagens, vendas manuais, comissão e criativos vencedores." cta="Abrir métricas" /><ModuleCard href="/xpex-commerce/tracking" title="Rastreamento Manual" detail="Registrar por canal, criativo e data sem scraping ou rastreamento automático." cta="Registrar tracking" /><ModuleCard href="/xpex-commerce/performance" title="Performance do Piloto" detail="Funil e recomendações por regras locais, sem IA externa." cta="Ver performance" /><ModuleCard href="/xpex-commerce/calendar" title="Calendário" detail="Plano de 7 dias para Anderso com publicação manual." cta="Abrir calendário" /></div></section>
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <ModuleCard href="/xpex-commerce/operation" title="Fase 10: Operação Real Controlada" detail="Produto piloto, Criador piloto, Campanha piloto, Link manual, Criativos e Aprovação humana." cta="Abrir operação" />
      <ModuleCard href="/xpex-commerce/products" title="Produtos ML" detail="Cadastro manual local, score e status por produto para Anderso." cta="Abrir produtos" />
      <ModuleCard href="/xpex-commerce/campaigns" title="Campanhas" detail="Campanha Seu quarto vira palco central e funil de operação local." cta="Abrir campanhas" />
      <ModuleCard href="/xpex-commerce/creators/anderso" title="Criador Anderso" detail="Perfil, manual de gravação, calendário e regras de posicionamento." cta="Ver Anderso" />
      <ModuleCard href="/xpex-commerce/links" title="Links Planejados" detail="Slugs por canal salvos localmente sem redirecionar." cta="Ver links" />
      <ModuleCard href="/xpex-commerce/creatives" title="Criativos" detail="Hooks, roteiros, legendas e checklist sem chamar provedor de IA ou APIs." cta="Ver criativos" />
      <ModuleCard href="/xpex-commerce/leads" title="Leads/CRM" detail="Cadastro manual de intenção, status e observações sem WhatsApp/API." cta="Abrir leads" />
    </section>
    <section className="rounded-[2rem] border border-[#22C55E]/25 bg-[#22C55E]/10 p-7"><SectionHeader eyebrow="Próximo passo operacional" title="Importação localStorage → backend e CRUD controlado" description="Use primeiro o dry-run local, depois habilite backend opt-in e execute validações não destrutivas." /><div className="mt-6 grid gap-4 md:grid-cols-5"><ModuleCard href="/xpex-commerce/import" title="Importação" detail="Plano seguro, warnings, bloqueios e importação manual sem apagar localStorage." cta="Abrir importação" /><ModuleCard href="/xpex-commerce/crud-tests" title="CRUD" detail="Checklist para create, list e update status com dados TEST_DEMO_XPEX." cta="Abrir testes" />{["Local pronto", "Backend opt-in", "Diagnóstico"].map((item) => <div key={item} className="rounded-[2rem] border border-white/10 bg-black/20 p-6 text-sm font-black text-white/75">✓ {item}<p className="mt-2 text-xs font-normal text-white/55">Status: {item === "Backend opt-in" ? mode : item === "Diagnóstico" ? backendAvailability : "localStorage preservado"}</p></div>)}</div></section>
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"><CampaignCard campaign={state.campaigns[0]} />{state.products[0] ? <ProductCard product={state.products[0]} /> : null}</section>
    <ExportJsonPanel />
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Funil local" title="Produto → Campanha → Criativo → Link planejado → Lead → Métrica" description="Todas as etapas são demonstrativas, salvas no navegador e operadas manualmente nesta fase." /><div className="mt-6 grid gap-3 md:grid-cols-4">{data.funnel.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-4"><span className="text-xs font-black text-[#F5B301]">0{index + 1}</span><p className="mt-2 font-bold">{step}</p></div>)}</div></section>
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Agentes mockados" title="Orquestração visual sem APIs reais" description="Sem Mercado Livre, provedor de links, orquestração externa, banco, Prisma ou geração IA real nesta fase." /><div className="mt-6 grid gap-4 md:grid-cols-2">{data.agents.map((agent) => <article key={agent.name} className="rounded-2xl border border-white/10 bg-[#081322]/80 p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-white">{agent.name}</h3><StatusBadge>{agent.status}</StatusBadge></div><p className="mt-3 text-sm leading-6 text-white/58">{agent.role}</p></article>)}</div></article><aside className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Próximos passos" title="Fase 11 ativa" /><ul className="mt-5 space-y-3 text-white/70"><li>✓ Produto piloto projetor portátil</li><li>✓ Campanha Seu quarto vira palco</li><li>✓ Criador Anderso com revisão manual</li><li>✓ Métricas, tracking, leads e performance manuais</li></ul></aside></section>
  </XpeXPageShell>;
}
