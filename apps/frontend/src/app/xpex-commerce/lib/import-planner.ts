import type { XpeXCommerceLocalState, XpeXCommerceStatus } from './types';

export type ImportPlanStatus = 'ready' | 'warning' | 'blocked';
export type ImportEntityType = 'products' | 'campaigns' | 'creators' | 'leads' | 'linkPlans' | 'creativeBriefs';
export type ImportPlanIssue = { level: ImportPlanStatus; entity: ImportEntityType | 'state'; id?: string; message: string };
export type ImportPlanSummary = Record<ImportEntityType, number> & { total: number };
export type ImportPlan = { status: ImportPlanStatus; summary: ImportPlanSummary; issues: ImportPlanIssue[]; duplicates: ImportPlanIssue[]; generatedAt: string; canImport: boolean };

const acceptedStatuses: XpeXCommerceStatus[] = ['Em análise', 'Aprovado', 'Em campanha', 'Vencedor', 'Pausado', 'Descartado', 'Planejado', 'Em validação', 'Novo', 'Link enviado', 'Interessado', 'Comprou', 'Follow-up', 'Não respondeu'];
const unsafeKey = /token|secret|api[_-]?key|password|credential|authorization/i;
const unsafeText = /(bearer\s+[a-z0-9._-]+|sk-[a-z0-9_-]{10,}|-----BEGIN|javascript:|data:)/i;
const entityKeys: ImportEntityType[] = ['products', 'campaigns', 'creators', 'leads', 'linkPlans', 'creativeBriefs'];

function hasUnsafePayload(value: unknown): boolean {
  if (!value || typeof value !== 'object') return typeof value === 'string' && unsafeText.test(value);
  return Object.entries(value as Record<string, unknown>).some(([key, entry]) => unsafeKey.test(key) || hasUnsafePayload(entry));
}

function safeUrl(value?: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

const issue = (level: ImportPlanStatus, entity: ImportEntityType | 'state', message: string, id?: string): ImportPlanIssue => ({ level, entity, id, message });
const hasText = (value?: string) => Boolean(value && value.trim().length >= 2);
const validStatus = (status: XpeXCommerceStatus) => acceptedStatuses.includes(status);

export function summarizeImportPlan(state: XpeXCommerceLocalState): ImportPlanSummary {
  return { products: state.products.length, campaigns: state.campaigns.length, creators: state.creators.length, leads: state.leads.length, linkPlans: state.linkPlans.length, creativeBriefs: state.creativeBriefs.length, total: entityKeys.reduce((sum, key) => sum + state[key].length, 0) };
}

export function detectPotentialDuplicates(state: XpeXCommerceLocalState): ImportPlanIssue[] {
  const duplicates: ImportPlanIssue[] = [];
  const check = (entity: ImportEntityType, values: string[]) => {
    const seen = new Set<string>();
    values.map((value) => value.trim().toLowerCase()).filter(Boolean).forEach((value) => seen.has(value) ? duplicates.push(issue('warning', entity, `Possível duplicidade detectada: ${value}`)) : seen.add(value));
  };
  check('products', state.products.map((item) => item.name));
  check('campaigns', state.campaigns.map((item) => item.name));
  check('creators', state.creators.map((item) => item.name));
  check('linkPlans', state.linkPlans.map((item) => item.slug));
  check('creativeBriefs', state.creativeBriefs.map((item) => `${item.campaign}:${item.hook}`));
  return duplicates;
}

export function validateImportPlan(state: XpeXCommerceLocalState): ImportPlanIssue[] {
  const issues: ImportPlanIssue[] = [];
  if (state.schemaVersion !== 'xpex-commerce-local-v1') issues.push(issue('blocked', 'state', 'Schema local não reconhecido.'));
  if (hasUnsafePayload(state)) issues.push(issue('blocked', 'state', 'Payload contém campo sensível, token, chave, segredo ou conteúdo suspeito.'));
  state.products.forEach((item) => { if (!hasText(item.name)) issues.push(issue('blocked', 'products', 'Produto sem nome.', item.id)); if (!validStatus(item.status)) issues.push(issue('blocked', 'products', 'Status de produto inválido.', item.id)); if (!safeUrl(item.mercadoLivreUrl)) issues.push(issue('blocked', 'products', 'URL de produto insegura ou inválida.', item.id)); });
  state.creators.forEach((item) => { if (!hasText(item.name)) issues.push(issue('blocked', 'creators', 'Criador sem nome.', item.id)); if (!item.channels.length) issues.push(issue('warning', 'creators', 'Criador sem canal definido.', item.id)); if (!validStatus(item.status)) issues.push(issue('blocked', 'creators', 'Status de criador inválido.', item.id)); });
  state.campaigns.forEach((item) => { if (!hasText(item.name) || !hasText(item.product) || !hasText(item.creator)) issues.push(issue('blocked', 'campaigns', 'Campanha sem nome, produto ou criador.', item.id)); if (item.productId && !state.products.some((product) => product.id === item.productId)) issues.push(issue('warning', 'campaigns', 'Campanha referencia productId local não encontrado.', item.id)); if (!validStatus(item.status)) issues.push(issue('blocked', 'campaigns', 'Status de campanha inválido.', item.id)); });
  state.leads.forEach((item) => { if (!hasText(item.name)) issues.push(issue('warning', 'leads', 'Lead sem nome claro; use apenas dados demo/controlados.', item.id)); if (!validStatus(item.status)) issues.push(issue('blocked', 'leads', 'Status de lead inválido.', item.id)); });
  state.linkPlans.forEach((item) => { if (!hasText(item.slug) || !item.slug.startsWith('/')) issues.push(issue('blocked', 'linkPlans', 'Link planejado precisa de slug local iniciado por /.', item.id)); if (!safeUrl(item.destinationUrl)) issues.push(issue('blocked', 'linkPlans', 'URL de destino insegura ou inválida.', item.id)); if (!validStatus(item.status)) issues.push(issue('blocked', 'linkPlans', 'Status de link inválido.', item.id)); });
  state.creativeBriefs.forEach((item) => { if (!hasText(item.hook) || !hasText(item.shortScript)) issues.push(issue('blocked', 'creativeBriefs', 'Criativo sem hook ou roteiro curto.', item.id)); if (!validStatus(item.status)) issues.push(issue('blocked', 'creativeBriefs', 'Status de criativo inválido.', item.id)); });
  return issues;
}

export function classifyImportRisk(issues: ImportPlanIssue[], duplicates: ImportPlanIssue[]): ImportPlanStatus {
  if (issues.some((entry) => entry.level === 'blocked')) return 'blocked';
  if (issues.some((entry) => entry.level === 'warning') || duplicates.length) return 'warning';
  return 'ready';
}

export function buildImportPlan(state: XpeXCommerceLocalState): ImportPlan {
  const issues = validateImportPlan(state);
  const duplicates = detectPotentialDuplicates(state);
  const summary = summarizeImportPlan(state);
  const status = summary.total === 0 ? 'warning' : classifyImportRisk(issues, duplicates);
  return { status, summary, issues, duplicates, generatedAt: new Date().toISOString(), canImport: status === 'ready' };
}
