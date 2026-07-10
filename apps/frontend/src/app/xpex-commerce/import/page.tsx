'use client';

import { CrudReadinessBadge, ImportPlanCard, ImportStatusBadge, OperationModeBadge, SafetyNotice, SectionHeader, XpeXPageShell } from '../components';
import { useXpeXCommerceStore } from '../lib/use-xpex-commerce-store';

export default function XpeXImportPage() {
  const store = useXpeXCommerceStore();
  const plan = store.importPlan;
  const diagnosticsReady = store.mode === 'backend' && store.backendAvailability === 'available';
  const canImport = diagnosticsReady && plan?.status === 'ready';
  const blockedReason = store.mode !== 'backend' ? 'Backend opt-in não habilitado.' : store.backendAvailability !== 'available' ? 'Diagnostics indisponível, em fallback ou ainda checando.' : plan?.status !== 'ready' ? 'Execute o dry-run e resolva warnings/bloqueios antes da importação real.' : '';
  const summary = plan?.summary || { products: store.state.products.length, campaigns: store.state.campaigns.length, creators: store.state.creators.length, leads: store.state.leads.length, linkPlans: store.state.linkPlans.length, creativeBriefs: store.state.creativeBriefs.length, total: 0 };
  return <XpeXPageShell eyebrow="Phase 09 · Importação local" title="Importação Local para Backend" description="Analise dados do localStorage, gere um plano seguro e só então importe manualmente para o backend real autenticado.">
    <SafetyNotice mode={store.mode} availability={store.backendAvailability} notice={store.operationNotice} />
    <OperationModeBadge mode={store.mode} availability={store.backendAvailability} notice={store.operationNotice} />
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7">
      <SectionHeader eyebrow="Dry-run obrigatório" title="Plano de importação" description="A análise não chama APIs externas, não apaga localStorage e bloqueia tokens, URLs inseguras e dados críticos incompletos." />
      <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <ImportPlanCard title="Produtos" value={summary.products} detail="create individual controlado" />
        <ImportPlanCard title="Campanhas" value={summary.campaigns} detail="create individual controlado" />
        <ImportPlanCard title="Criadores" value={summary.creators} detail="create individual controlado" />
        <ImportPlanCard title="Leads" value={summary.leads} detail="dados demo/controlados" />
        <ImportPlanCard title="Links" value={summary.linkPlans} detail="sem Dub/redirect real" />
        <ImportPlanCard title="Criativos" value={summary.creativeBriefs} detail="sem IA externa" />
      </div>
      <div className="mt-6 flex flex-wrap gap-3"><button onClick={() => store.previewBackendImport()} className="rounded-full bg-[#8DB4FF] px-5 py-3 font-black text-[#071B33]">Analisar / dry-run</button><button disabled={!canImport || store.importStatus === 'importing'} onClick={() => store.runBackendImport()} className="rounded-full bg-[#F5B301] px-5 py-3 font-black text-[#071B33] disabled:cursor-not-allowed disabled:opacity-40">Importar para backend real</button><button onClick={() => store.clearImportResult()} className="rounded-full border border-white/15 px-5 py-3 font-bold text-white/80">Limpar resultado</button></div>
      <div className="mt-6 grid gap-3 md:grid-cols-3"><CrudReadinessBadge ready={store.mode === 'backend'} label="Backend opt-in habilitado" /><CrudReadinessBadge ready={store.backendAvailability === 'available'} label={`Diagnostics: ${store.backendAvailability}`} /><CrudReadinessBadge ready={plan?.status === 'ready'} label={`Plano: ${plan?.status || 'não analisado'}`} /></div>
      {plan ? <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5"><div className="flex items-center justify-between gap-3"><strong>Resultado do plano</strong><ImportStatusBadge status={plan.status} /></div><p className="mt-3 text-sm text-white/65">Gerado em {new Date(plan.generatedAt).toLocaleString('pt-BR')}. Duplicidades potenciais: {plan.duplicates.length}. Issues: {plan.issues.length}.</p></div> : null}
      {!canImport ? <p className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm text-amber-100">Importação real desabilitada: {blockedReason}</p> : null}
      {[...store.importErrors, ...store.importWarnings].length ? <ul className="mt-4 space-y-2 text-sm text-white/70">{[...store.importErrors, ...store.importWarnings].map((item, index) => <li key={`${item}-${index}`}>• {item}</li>)}</ul> : null}
      <p className="mt-5 text-sm font-bold text-[#B8FFD0]">Mesmo após importação concluída, o localStorage permanece intacto e deve ser removido apenas por ação manual consciente.</p>
    </section>
  </XpeXPageShell>;
}
