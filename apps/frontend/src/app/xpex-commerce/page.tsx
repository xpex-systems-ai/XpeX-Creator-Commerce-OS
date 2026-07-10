import { xpexBrandTokens } from '@gitroom/frontend/app/xpex-brand-tokens';
import { xpexCreatorCommerceMock } from './mock-data';

const tokens = xpexBrandTokens.colors;

function StatusBadge({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
      {children}
    </span>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur">
      <p className="text-sm text-white/55">{label}</p>
      <strong className="mt-3 block text-3xl font-black text-white">{value}</strong>
      <p className="mt-2 text-sm leading-6 text-white/60">{detail}</p>
    </article>
  );
}

function AgentCard({ agent }: { agent: (typeof xpexCreatorCommerceMock.agents)[number] }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#081322]/80 p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-white">{agent.name}</h3>
        <span className="rounded-full bg-[#2563EB]/15 px-2.5 py-1 text-[11px] font-bold text-[#8DB4FF]">{agent.status}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/58">{agent.role}</p>
    </article>
  );
}

export const metadata = {
  title: 'XpeX Creator Commerce OS | Dashboard MVP',
  description: 'MVP visual interno com dados mockados para validação do XpeX Creator Commerce OS.',
};

export default function XpeXCommercePage() {
  const data = xpexCreatorCommerceMock;

  return (
    <main
      className="min-h-screen overflow-hidden px-6 py-8 text-white md:px-10 lg:px-14"
      style={{
        background: `radial-gradient(circle at top left, ${tokens.electricBlue}55, transparent 34rem), radial-gradient(circle at 78% 10%, ${tokens.gold}33, transparent 28rem), linear-gradient(135deg, ${tokens.darkBackground}, ${tokens.navy} 52%, #02040A)`,
        fontFamily: xpexBrandTokens.fontFamily,
      }}
    >
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-8 shadow-2xl shadow-black/30 backdrop-blur md:p-10">
          <div className="flex flex-wrap gap-3">
            <StatusBadge>MVP interno</StatusBadge>
            <StatusBadge>Integração ML futura</StatusBadge>
            <StatusBadge>Dados mockados</StatusBadge>
            <StatusBadge>Sem automação paga</StatusBadge>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#F5B301]">Phase 02 · Internal commerce dashboard</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
                XpeX Creator Commerce OS
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
                Máquina de vendas com Mercado Livre, criadores, IA, links rastreáveis, redes sociais e automação — apresentada em modo visual seguro para validação interna.
              </p>
            </div>
            <div className="rounded-3xl border border-[#F5B301]/25 bg-[#F5B301]/10 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-[#F5B301]">Campanha piloto</p>
              <h2 className="mt-3 text-2xl font-black">{data.campaign.name}</h2>
              <p className="mt-3 text-white/70">{data.creator.name} · {data.product.name}</p>
              <p className="mt-4 rounded-2xl bg-black/25 p-4 text-xl font-extrabold">CTA: {data.campaign.cta}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {data.modules.map((module) => (
            <MetricCard key={module.title} label={module.title} value={module.value} detail={module.detail} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#22C55E]">Campanha inicial</p>
            <h2 className="mt-4 text-3xl font-black">{data.creator.name} + {data.product.name}</h2>
            <p className="mt-4 text-white/68">{data.creator.profile}. Produto {data.product.category.toLowerCase()} com score {data.product.score}/10 e status {data.product.status.toLowerCase()}.</p>
            <p className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5 text-white/75">“{data.campaign.promise}”</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {data.campaign.channels.map((channel) => <StatusBadge key={channel}>{channel}</StatusBadge>)}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#8DB4FF]">Funil visual</p>
            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {data.funnel.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <span className="text-xs font-black text-[#F5B301]">0{index + 1}</span>
                  <p className="mt-2 font-bold">{step}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7">
            <h2 className="text-3xl font-black">Agentes IA mockados</h2>
            <p className="mt-3 text-white/62">Orquestração visual para demonstrar a máquina sem chamar APIs reais, banco, Mercado Livre, Dub ou n8n.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {data.agents.map((agent) => <AgentCard key={agent.name} agent={agent} />)}
            </div>
          </article>

          <aside className="space-y-6">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7">
              <h2 className="text-3xl font-black">Métricas mockadas</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <MetricCard label="Cliques" value={data.metrics.clicks.toLocaleString('pt-BR')} detail="Volume simulado por links planejados" />
                <MetricCard label="Leads" value={data.metrics.leads} detail="Intenção estimada via CTA" />
                <MetricCard label="Posts" value={data.metrics.plannedPosts} detail="Calendário inicial planejado" />
                <MetricCard label="Criativos" value={data.metrics.generatedCreatives} detail="Variações geradas no mock" />
              </div>
              <p className="mt-5 rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/10 p-4 text-sm text-[#B8FFD0]">Compliance: {data.metrics.complianceStatus}</p>
            </article>
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7">
              <h2 className="text-2xl font-black">Próximos passos</h2>
              <ul className="mt-5 space-y-3 text-white/70">
                {data.nextSteps.map((step) => <li key={step}>→ {step}</li>)}
              </ul>
            </article>
          </aside>
        </section>
      </section>
    </main>
  );
}
