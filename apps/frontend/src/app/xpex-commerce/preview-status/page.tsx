import { DeployCommandBox, DeployGuardrailList, SectionHeader, XpeXPageShell, XpeXPublicPreviewNotice } from '../components';

const validationSteps = [
  'Confirmar que o projeto Vercel correto recebeu XPEX_COMMERCE_PUBLIC_PREVIEW_ENABLED=true no ambiente do deploy testado.',
  'Fazer redeploy depois de criar ou alterar a variável de ambiente; deploys antigos não herdam env criada depois.',
  'Abrir a URL direta /xpex-commerce no deployment com status success.',
  'Validar no DevTools/Network os headers x-xpex-preview-route: true e x-xpex-preview-gate: enabled.',
  'Manter NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED=false no primeiro preview publicável.',
];

export default function XpeXPreviewStatusPage() {
  return <XpeXPageShell eyebrow="Phase 15 · Runtime Preview Diagnostics" title="Public Preview Status" description="Checklist seguro para confirmar se o Public Preview Gate do XpeX Commerce está ativo no runtime da Vercel sem ler secrets, chamar backend ou expor process.env no client.">
    <XpeXPublicPreviewNotice />

    <section className="rounded-[2rem] border border-[#F5B301]/25 bg-[#F5B301]/10 p-7">
      <SectionHeader eyebrow="Diagnóstico runtime" title="Como validar o gate na Vercel" description="Esta página é estática e serve como referência operacional. O sinal runtime vem dos headers adicionados pelo proxy somente quando /xpex-commerce e subrotas estão liberadas pelo gate." />
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {validationSteps.map((step) => <div key={step} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold leading-6 text-white/75">✓ {step}</div>)}
      </div>
    </section>

    <section className="grid gap-4 lg:grid-cols-2">
      <DeployCommandBox title="Headers esperados quando habilitado" commands={["x-xpex-preview-route: true", "x-xpex-preview-gate: enabled", "Nenhum valor real de env, token, secret ou cookie é exibido"]} />
      <DeployCommandBox title="Se cair em /auth/login" commands={["Verificar se a env está no projeto Vercel correto", "Confirmar Preview vs Production conforme a URL aberta", "Redeploy obrigatório após alterar env", "Testar em aba anônima para evitar cache/sessão antiga"]} />
    </section>

    <section className="rounded-[2rem] border border-[#22C55E]/25 bg-[#22C55E]/10 p-7">
      <SectionHeader eyebrow="Safety" title="Limites preservados" description="O diagnóstico não ativa backend, não chama API externa, não cria cookies, não rastreia usuários e não altera autenticação global do Postiz." />
      <div className="mt-6"><DeployGuardrailList items={["Somente /xpex-commerce e subrotas", "APIs seguem protegidas", "Rotas privadas seguem protegidas", "Sem secrets no client", "Sem backend obrigatório", "Backend opt-in false no preview inicial"]} /></div>
    </section>
  </XpeXPageShell>;
}
