import { DeployCommandBox, DeployGuardrailList, SectionHeader, XpeXPageShell, XpeXStandaloneNotice } from '../components';

const validationSteps = [
  'Abrir a URL direta /xpex-commerce no deployment com status success; ela deve abrir sem login por padrão.',
  'Validar /xpex-commerce/preview-status e /xpex-commerce/deploy-readiness sem cair em /auth/login.',
  'Validar no DevTools/Network os headers x-xpex-standalone-surface: open e x-xpex-auth-boundary: postiz-private-routes-preserved.',
  'Confirmar que /analytics, /settings e /launches continuam exigindo autenticação Postiz.',
  'Manter NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false no primeiro preview publicável.',
];

export default function XpeXPreviewStatusPage() {
  return <XpeXPageShell eyebrow="Phase 16 · Standalone Open Operations" title="Standalone Surface Status" description="Checklist seguro para confirmar que /xpex-commerce abre por padrão no runtime da Vercel sem ler secrets, chamar backend ou expor process.env no client.">
    <XpeXStandaloneNotice />

    <section className="rounded-[2rem] border border-[#F5B301]/25 bg-[#F5B301]/10 p-7">
      <SectionHeader eyebrow="Diagnóstico runtime" title="Como validar a superfície standalone na Vercel" description="Esta página é estática e serve como referência operacional. O sinal runtime vem dos headers adicionados pelo proxy somente em /xpex-commerce e subrotas." />
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {validationSteps.map((step) => <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold leading-6 text-white/75">✓ {step}</div>)}
      </div>
    </section>

    <section className="grid gap-4 lg:grid-cols-2">
      <DeployCommandBox title="Headers esperados por padrão" commands={["x-xpex-standalone-surface: open", "x-xpex-auth-boundary: postiz-private-routes-preserved", "Nenhum valor real de env, token, secret ou cookie é exibido"]} />
      <DeployCommandBox title="Se cair em /auth/login" commands={["Verificar se XPEX_COMMERCE_REQUIRE_AUTH=true foi configurada", "Confirmar Preview vs Production conforme a URL aberta", "Redeploy obrigatório após alterar env", "Testar em aba anônima para evitar cache/sessão antiga"]} />
    </section>

    <section className="rounded-[2rem] border border-[#22C55E]/25 bg-[#22C55E]/10 p-7">
      <SectionHeader eyebrow="Safety" title="Limites preservados" description="O diagnóstico não ativa backend, não chama API externa, não cria cookies, não rastreia usuários e não altera autenticação global do Postiz." />
      <div className="mt-6"><DeployGuardrailList items={["Somente /xpex-commerce e subrotas", "APIs seguem protegidas", "Rotas privadas seguem protegidas", "Sem secrets no client", "Sem backend obrigatório", "Backend opt-in false no preview inicial"]} /></div>
    </section>
  </XpeXPageShell>;
}
