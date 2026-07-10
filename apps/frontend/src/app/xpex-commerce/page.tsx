import { CampaignCard, MetricCard, ModuleCard, ProductCard, SectionHeader, StatusBadge, XpeXPageShell } from './components';
import { xpexCampaigns, xpexCreatorCommerceMock, xpexProducts } from './mock-data';

export const metadata = { title: 'XpeX Creator Commerce OS | Dashboard MVP', description: 'MVP visual interno com dados mockados para validação do XpeX Creator Commerce OS.' };

export default function XpeXCommercePage() {
  const data = xpexCreatorCommerceMock;
  return <XpeXPageShell eyebrow="Phase 03 · Manual workflow MVP" title="XpeX Creator Commerce OS" description="Máquina de vendas com Mercado Livre, criadores, IA, links rastreáveis, redes sociais e automação — agora com fluxo operacional manual visual, sem APIs reais e sem persistência.">
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">{data.modules.map((module) => <MetricCard key={module.title} label={module.title} value={module.value} detail={module.detail} />)}</section>
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      <ModuleCard href="/xpex-commerce/products" title="Produtos ML" detail="Cadastro manual visual, lista mockada e score para Anderso." cta="Abrir produtos" />
      <ModuleCard href="/xpex-commerce/campaigns" title="Campanhas" detail="Campanha Seu quarto vira palco central e funil de operação." cta="Abrir campanhas" />
      <ModuleCard href="/xpex-commerce/creators/anderso" title="Criador Anderso" detail="Perfil, manual de gravação, calendário e regras de posicionamento." cta="Ver Anderso" />
      <ModuleCard href="/xpex-commerce/links" title="Links Planejados" detail="Slugs mockados para Instagram, TikTok e WhatsApp sem redirecionar." cta="Ver links" />
      <ModuleCard href="/xpex-commerce/creatives" title="Criativos IA" detail="Hooks, roteiros, legendas e checklist sem chamar OpenAI ou APIs." cta="Ver criativos" />
    </section>
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"><CampaignCard campaign={xpexCampaigns[0]} /><ProductCard product={xpexProducts[0]} /></section>
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Funil visual" title="Produto → Radar IA → Criativo → Link → Postagem → Lead → Métrica → Otimização" description="Todas as etapas são demonstrativas e operadas manualmente nesta fase." /><div className="mt-6 grid gap-3 md:grid-cols-4">{data.funnel.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-4"><span className="text-xs font-black text-[#F5B301]">0{index + 1}</span><p className="mt-2 font-bold">{step}</p></div>)}</div></section>
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Agentes mockados" title="Orquestração visual sem APIs reais" description="Sem Mercado Livre, Dub, n8n, banco, Prisma ou geração IA real nesta fase." /><div className="mt-6 grid gap-4 md:grid-cols-2">{data.agents.map((agent) => <article key={agent.name} className="rounded-2xl border border-white/10 bg-[#081322]/80 p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-bold text-white">{agent.name}</h3><StatusBadge>{agent.status}</StatusBadge></div><p className="mt-3 text-sm leading-6 text-white/58">{agent.role}</p></article>)}</div></article><aside className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="Próximos passos" title="Do visual ao operacional controlado" /><ul className="mt-5 space-y-3 text-white/70">{data.nextSteps.map((step) => <li key={step}>→ {step}</li>)}</ul></aside></section>
  </XpeXPageShell>;
}
