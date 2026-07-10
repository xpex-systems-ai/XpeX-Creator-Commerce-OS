'use client';

import { ExportJsonPanel } from './components/local-forms';
import { SafetyNotice, CampaignCard, MetricCard, ModuleCard, ProductCard, SectionHeader, StatusBadge, XpeXPageShell } from './components';
import { xpexCreatorCommerceMock } from './mock-data';
import { useXpeXCommerceStore } from './lib/use-xpex-commerce-store';

export default function XpeXCommercePage() {
  const data = xpexCreatorCommerceMock;
  const { state } = useXpeXCommerceStore();
  const metrics = [
    { title: 'Produtos locais', value: state.products.length, detail: 'Produtos salvos no navegador' },
    { title: 'Campanhas locais', value: state.campaigns.length, detail: 'Briefings manuais controlados' },
    { title: 'Links planejados', value: state.linkPlans.length, detail: 'Slugs sem redirect real' },
    { title: 'Leads locais', value: state.leads.length, detail: 'CRM manual sem WhatsApp/API' },
    { title: 'Criativos locais', value: state.creativeBriefs.length, detail: 'Hooks e roteiros sem IA real' },
    { title: 'Criadores', value: state.creators.length, detail: 'Anderso como creator piloto' },
  ];
  return <XpeXPageShell eyebrow="Phase 04 · Local controlled operations" title="XpeX Creator Commerce OS" description="Máquina de vendas com Mercado Livre, criadores, IA, links rastreáveis, redes sociais e automação — agora com operação local controlada via localStorage, sem APIs reais e sem banco.">
    <SafetyNotice />
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">{metrics.map((module) => <MetricCard key={module.title} label={module.title} value={module.value} detail={module.detail} />)}</section>
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
      <ModuleCard href="/xpex-commerce/products" title="Produtos ML" detail="Cadastro manual local, score e status por produto para Anderso." cta="Abrir produtos" />
      <ModuleCard href="/xpex-commerce/campaigns" title="Campanhas" detail="Campanha Seu quarto vira palco central e funil de operação local." cta="Abrir campanhas" />
      <ModuleCard href="/xpex-commerce/creators/anderso" title="Criador Anderso" detail="Perfil, manual de gravação, calendário e regras de posicionamento." cta="Ver Anderso" />
      <ModuleCard href="/xpex-commerce/links" title="Links Planejados" detail="Slugs por canal salvos localmente sem redirecionar." cta="Ver links" />
      <ModuleCard href="/xpex-commerce/creatives" title="Criativos" detail="Hooks, roteiros, legendas e checklist sem chamar provedor de IA ou APIs." cta="Ver criativos" />
      <ModuleCard href="/xpex-commerce/leads" title="Leads/CRM" detail="Cadastro manual de intenção, status e observações sem WhatsApp/API." cta="Abrir leads" />
    </section>
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"><CampaignCard campaign={state.campaigns[0]} />{state.products[0] ? <ProductCard product={state.products[0]} /> : null}</section>
    <ExportJsonPanel />
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Funil local" title="Produto → Campanha → Criativo → Link planejado → Lead → Métrica" description="Todas as etapas são demonstrativas, salvas no navegador e operadas manualmente nesta fase." /><div className="mt-6 grid gap-3 md:grid-cols-4">{data.funnel.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-4"><span className="text-xs font-black text-[#F5B301]">0{index + 1}</span><p className="mt-2 font-bold">{step}</p></div>)}</div></section>
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Agentes mockados" title="Orquestração visual sem APIs reais" description="Sem Mercado Livre, provedor de links, orquestração externa, banco, Prisma ou geração IA real nesta fase." /><div className="mt-6 grid gap-4 md:grid-cols-2">{data.agents.map((agent) => <article key={agent.name} className="rounded-2xl border border-white/10 bg-[#081322]/80 p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-white">{agent.name}</h3><StatusBadge>{agent.status}</StatusBadge></div><p className="mt-3 text-sm leading-6 text-white/58">{agent.role}</p></article>)}</div></article><aside className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Próximos passos" title="Da operação local ao backend seguro" /><ul className="mt-5 space-y-3 text-white/70"><li>→ Revisar modelo real de dados</li><li>→ Desenhar API backend segura</li><li>→ Planejar integrações Mercado Livre, provedor de links, orquestração externa e IA em fases futuras</li></ul></aside></section>
  </XpeXPageShell>;
}
