import type { XpeXCommerceCampaign, XpeXCommerceCreativeBrief, XpeXCommerceCreator, XpeXCommerceLead, XpeXCommerceLinkPlan, XpeXCommerceProduct, XpeXCommerceStatus } from './types';

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; status?: number };
type BackendRecord = Record<string, any>;
export type XpeXBackendDiagnostics = { moduleEnabled: boolean; organizationScoped: boolean; prismaAvailable: boolean; timestamp: string; supportedResources: string[] };
export function getXpeXCommerceApiBase() {
  return '/api/xpex-commerce';
}

const base = getXpeXCommerceApiBase();

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${base}${path}`, { credentials: 'include', headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) }, ...init });
    if (!response.ok) return { ok: false, status: response.status, error: `XpeX backend returned ${response.status}` };
    return { ok: true, data: await response.json() as T };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network error while calling XpeX backend' };
  }
}

const recordStatusToLocal = (status?: string): XpeXCommerceStatus => status === 'ACTIVE' ? 'Em campanha' : status === 'PAUSED' ? 'Pausado' : status === 'ARCHIVED' ? 'Descartado' : 'Planejado';
const leadStatusToLocal = (status?: string): XpeXCommerceStatus => status === 'CONTACTED' ? 'Link enviado' : status === 'QUALIFIED' ? 'Interessado' : status === 'CONVERTED' ? 'Comprou' : status === 'ARCHIVED' ? 'Descartado' : 'Novo';
const localToRecordStatus = (status?: XpeXCommerceStatus) => status === 'Em campanha' || status === 'Vencedor' || status === 'Aprovado' ? 'ACTIVE' : status === 'Pausado' ? 'PAUSED' : status === 'Descartado' ? 'ARCHIVED' : 'DRAFT';
const localToLeadStatus = (status?: XpeXCommerceStatus) => status === 'Link enviado' ? 'CONTACTED' : status === 'Interessado' || status === 'Follow-up' ? 'QUALIFIED' : status === 'Comprou' ? 'CONVERTED' : status === 'Descartado' || status === 'Não respondeu' ? 'ARCHIVED' : 'NEW';
const channels = (value?: string) => (value || 'Manual').split(',').map((item) => item.trim()).filter(Boolean) as any;

export const mapBackendProduct = (item: BackendRecord): XpeXCommerceProduct => ({ id: item.id, name: item.title || 'Produto sem nome', category: item.currency || 'BRL', mercadoLivreUrl: item.sourceUrl || '', audienceFit: item.notes || '', creator: 'Backend', creatorFit: 'Registro persistido no backend XpeX Commerce.', campaignAngle: item.notes || 'Backend controlado', ctaKeyword: 'MANUAL', score: Number(item.score || 0), status: recordStatusToLocal(item.status), notes: item.notes || '', createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || item.createdAt || new Date().toISOString() });
export const mapBackendCampaign = (item: BackendRecord): XpeXCommerceCampaign => ({ id: item.id, name: item.name || 'Campanha sem nome', productId: item.productId || undefined, product: item.productId || 'Produto backend', creator: item.creatorId || 'Criador backend', slogan: item.slogan || '', cta: item.cta || '', channels: channels(item.channels), status: recordStatusToLocal(item.status), expectedMetric: 'Métrica manual controlada', score: Number(item.score || 0), briefing: item.slogan || item.cta || 'Campanha persistida no backend XpeX Commerce.', createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || item.createdAt || new Date().toISOString() });
export const mapBackendCreator = (item: BackendRecord): XpeXCommerceCreator => ({ id: item.id, name: item.displayName || item.handle || 'Criador sem nome', niche: item.handle || 'Nicho backend', audience: item.audienceNotes || '', channels: channels(item.channels), status: recordStatusToLocal(item.status), notes: item.styleGuide || item.audienceNotes || '', createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || item.createdAt || new Date().toISOString() });
export const mapBackendLead = (item: BackendRecord): XpeXCommerceLead => ({ id: item.id, name: item.name || 'Lead sem nome', channel: (item.source || 'Manual') as any, interestedProduct: item.productId || 'Produto backend', campaign: item.campaignId || 'Campanha backend', creator: item.creatorId || 'Criador backend', status: leadStatusToLocal(item.status), observation: item.notes || item.contact || '', createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || item.createdAt || new Date().toISOString() });
export const mapBackendLinkPlan = (item: BackendRecord): XpeXCommerceLinkPlan => ({ id: item.id, campaign: item.campaignId || 'Campanha backend', product: item.productId || 'Produto backend', creator: item.creatorId || 'Criador backend', channel: (item.source || 'Manual') as any, slug: item.plannedSlug || '', destinationUrl: item.destinationUrl || '', status: recordStatusToLocal(item.status), notes: item.notes || '', createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || item.createdAt || new Date().toISOString() });
export const mapBackendCreativeBrief = (item: BackendRecord): XpeXCommerceCreativeBrief => ({ id: item.id, campaign: item.campaignId || 'Campanha backend', product: 'Produto backend', creator: 'Criador backend', hook: item.title || 'Criativo backend', slogan: item.type || 'Manual', caption: item.body || '', shortScript: item.body || '', whatsappText: 'Texto manual não enviado automaticamente.', status: recordStatusToLocal(item.status), createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || item.createdAt || new Date().toISOString() });

export const xpexCommerceBackendClient = {
  checkDiagnostics() { return request<XpeXBackendDiagnostics>('/diagnostics'); },
  async listProducts() { const result = await request<BackendRecord[]>('/products'); return result.ok ? { ok: true as const, data: result.data.map(mapBackendProduct) } : result; },
  createProduct(input: Omit<XpeXCommerceProduct, 'id' | 'createdAt' | 'updatedAt'>) { return request<BackendRecord>('/products', { method: 'POST', body: JSON.stringify({ title: input.name, sourceUrl: input.mercadoLivreUrl || undefined, currency: 'BRL', score: Math.round(input.score), notes: input.notes || input.audienceFit }) }); },
  updateProductStatus(id: string, status: XpeXCommerceStatus) { return request<BackendRecord>(`/products/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: localToRecordStatus(status) }) }); },
  async listCampaigns() { const result = await request<BackendRecord[]>('/campaigns'); return result.ok ? { ok: true as const, data: result.data.map(mapBackendCampaign) } : result; },
  createCampaign(input: Omit<XpeXCommerceCampaign, 'id' | 'createdAt' | 'updatedAt'>) { return request<BackendRecord>('/campaigns', { method: 'POST', body: JSON.stringify({ name: input.name, productId: input.productId, slogan: input.slogan, cta: input.cta, channels: input.channels.join(','), score: Math.round(input.score) }) }); },
  async listCreators() { const result = await request<BackendRecord[]>('/creators'); return result.ok ? { ok: true as const, data: result.data.map(mapBackendCreator) } : result; },
  createCreator(input: Omit<XpeXCommerceCreator, 'id' | 'createdAt' | 'updatedAt'>) { return request<BackendRecord>('/creators', { method: 'POST', body: JSON.stringify({ displayName: input.name, channels: input.channels.join(','), audienceNotes: input.audience, styleGuide: input.notes, score: 7 }) }); },
  importProduct(input: XpeXCommerceProduct) { return this.createProduct(input); },
  importCampaign(input: XpeXCommerceCampaign) { return this.createCampaign(input); },
  importCreator(input: XpeXCommerceCreator) { return this.createCreator(input); },
  importLead(input: XpeXCommerceLead) { return this.createLead(input); },
  importLinkPlan(input: XpeXCommerceLinkPlan) { return this.createLinkPlan(input); },
  importCreativeBrief(input: XpeXCommerceCreativeBrief) { return this.createCreativeBrief(input); },
  async listLeads() { const result = await request<BackendRecord[]>('/leads'); return result.ok ? { ok: true as const, data: result.data.map(mapBackendLead) } : result; },
  createLead(input: Omit<XpeXCommerceLead, 'id' | 'createdAt' | 'updatedAt'>) { return request<BackendRecord>('/leads', { method: 'POST', body: JSON.stringify({ source: input.channel, name: input.name, notes: input.observation, status: localToLeadStatus(input.status) }) }); },
  async listLinkPlans() { const result = await request<BackendRecord[]>('/link-plans'); return result.ok ? { ok: true as const, data: result.data.map(mapBackendLinkPlan) } : result; },
  createLinkPlan(input: Omit<XpeXCommerceLinkPlan, 'id' | 'createdAt' | 'updatedAt'>) { return request<BackendRecord>('/link-plans', { method: 'POST', body: JSON.stringify({ plannedSlug: input.slug, destinationUrl: input.destinationUrl || 'https://example.local/xpex-demo', source: input.channel, notes: input.notes }) }); },
  async listCreativeBriefs() { const result = await request<BackendRecord[]>('/creative-briefs'); return result.ok ? { ok: true as const, data: result.data.map(mapBackendCreativeBrief) } : result; },
  createCreativeBrief(input: Omit<XpeXCommerceCreativeBrief, 'id' | 'createdAt' | 'updatedAt'>) { return request<BackendRecord>('/creative-briefs', { method: 'POST', body: JSON.stringify({ type: 'manual', title: input.hook, body: [input.slogan, input.caption, input.shortScript, input.whatsappText].filter(Boolean).join('\n\n') }) }); },
};

export async function checkXpeXBackendDiagnostics() {
  return xpexCommerceBackendClient.checkDiagnostics();
}

export type XpeXBackendResult<T> = ApiResult<T>;
