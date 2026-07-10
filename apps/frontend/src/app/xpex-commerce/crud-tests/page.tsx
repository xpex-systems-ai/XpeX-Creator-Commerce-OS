'use client';

import { CrudReadinessBadge, OperationModeBadge, SafetyNotice, SectionHeader, XpeXPageShell } from '../components';
import { useXpeXCommerceStore } from '../lib/use-xpex-commerce-store';

export default function XpeXCrudTestsPage() {
  const store = useXpeXCommerceStore();
  const ready = store.mode === 'backend' && store.backendAvailability === 'available';
  const checks = ['diagnostics saudável', 'backend mode ativo', 'auth existente via sessão', 'organization scope pelo backend', 'products create/list/status', 'campaigns create/list/status', 'creators create/list/status', 'leads create/list/status', 'links create/list/status', 'creatives create/list/status'];
  return <XpeXPageShell eyebrow="Phase 09 · CRUD controlado" title="Testes CRUD Controlados" description="Roteiro não destrutivo para validar create, list e update status com dados TEST_DEMO_XPEX, sem delete físico e sem integrações externas.">
    <SafetyNotice mode={store.mode} availability={store.backendAvailability} notice={store.operationNotice} />
    <OperationModeBadge mode={store.mode} availability={store.backendAvailability} notice={store.operationNotice} />
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7">
      <SectionHeader eyebrow="Checklist de segurança" title="Prontidão para CRUD" description="A execução automática fica bloqueada quando backend opt-in ou diagnostics não estão saudáveis." />
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">{checks.map((item, index) => <CrudReadinessBadge key={item} ready={index < 2 ? ready : true} label={item} />)}</div>
      <div className="mt-6 rounded-2xl border border-[#F5B301]/25 bg-[#F5B301]/10 p-5 text-sm leading-6 text-amber-50"><strong>Execução automática:</strong> {ready ? 'permitida apenas manualmente pelo operador, criando registros marcados como TEST_DEMO_XPEX e atualizando status, sem delete físico.' : 'bloqueada até backend mode ficar ativo e diagnostics saudável.'}</div>
      <ol className="mt-6 space-y-3 text-white/72">
        <li>1. Confirmar usuário autenticado e organização ativa.</li>
        <li>2. Criar um produto TEST_DEMO_XPEX com score controlado.</li>
        <li>3. Criar criador, campanha, lead, link planejado e criativo TEST_DEMO_XPEX.</li>
        <li>4. Listar cada recurso e confirmar escopo da organização.</li>
        <li>5. Atualizar status para PAUSED/ARCHIVED quando aplicável; não executar delete físico.</li>
        <li>6. Registrar evidências e manter integrações Mercado Livre, Dub, n8n, OpenAI, WhatsApp e ads desligadas.</li>
      </ol>
      <button disabled={!ready} className="mt-6 rounded-full bg-[#F5B301] px-5 py-3 font-black text-[#071B33] disabled:cursor-not-allowed disabled:opacity-40">Executar roteiro controlado manualmente</button>
    </section>
  </XpeXPageShell>;
}
