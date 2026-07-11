import type { LinkAttribution, LinkPerformanceSnapshot, LinkRiskStatus, LinkStatus, TrackedLink, UtmParams } from './types';

const BLOCKED_PROTOCOLS = ['javascript:', 'data:', 'file:', 'vbscript:'];
const clean = (value = '') => value.normalize('NFKD').replace(/[<>"'`{}|\\^\[\]]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase().slice(0, 80);
const pct = (n: number, d: number) => d > 0 ? Number(((n / d) * 100).toFixed(2)) : 0;

export function sanitizeDestinationUrl(raw: string): { ok: boolean; value: string; risk: LinkRiskStatus; reason: string } {
  const value = raw.trim();
  if (!value) return { ok: false, value: '', risk: 'blocked', reason: 'URL vazia.' };
  const lower = value.toLowerCase();
  if (BLOCKED_PROTOCOLS.some((protocol) => lower.startsWith(protocol))) return { ok: false, value, risk: 'blocked', reason: 'Protocolo inseguro bloqueado.' };
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return { ok: false, value, risk: 'blocked', reason: 'Somente http/https são permitidos.' };
    return { ok: true, value: url.toString(), risk: 'safe', reason: 'Destino válido para uso manual.' };
  } catch {
    return { ok: false, value, risk: 'blocked', reason: 'URL inválida ou sem http/https.' };
  }
}

export function buildUtmUrl(destinationUrl: string, utm: UtmParams): string {
  const sanitized = sanitizeDestinationUrl(destinationUrl);
  if (!sanitized.ok) return '';
  const url = new URL(sanitized.value);
  Object.entries({ utm_source: utm.source, utm_medium: utm.medium, utm_campaign: utm.campaign, utm_content: utm.content, utm_term: utm.term }).forEach(([key, value]) => {
    const normalized = clean(value || '');
    if (normalized) url.searchParams.set(key, normalized);
  });
  return url.toString();
}

export function generateSafeSlug(input: { campaign: string; creator: string; channel: string; creative?: string }) {
  return `/${[input.campaign, input.creator, input.channel, input.creative].map((item) => clean(item || '')).filter(Boolean).join('-') || 'link-manual'}`.slice(0, 96);
}

export function validateTrackedLink(link: Pick<TrackedLink, 'destinationUrl' | 'utmUrl' | 'slug'>): string[] {
  const errors: string[] = [];
  const destination = sanitizeDestinationUrl(link.destinationUrl);
  if (!destination.ok) errors.push(destination.reason);
  if (link.utmUrl && !sanitizeDestinationUrl(link.utmUrl).ok) errors.push('URL com UTM inválida.');
  if (!link.slug.startsWith('/')) errors.push('Slug planejado deve começar com /.');
  return errors;
}

export function buildTrackedLinkDisplayMetrics(link: TrackedLink, attributions: LinkAttribution[] = []) {
  const related = attributions.filter((item) => item.linkId === link.id);
  const attributedLeads = related.filter((item) => item.kind === 'lead').length;
  const attributedSales = related.filter((item) => item.kind === 'sale').length;
  const attributedRevenue = related.reduce((sum, item) => sum + (item.reportedValue || 0), 0);
  const attributedCommission = related.reduce((sum, item) => sum + (item.estimatedCommission || 0), 0);
  return {
    manualClicks: link.manualClicks,
    manualLeads: link.manualLeads + attributedLeads,
    manualSales: link.manualSales + attributedSales,
    manualRevenue: Number((link.manualRevenue + attributedRevenue).toFixed(2)),
    estimatedCommission: Number((link.estimatedCommission + attributedCommission).toFixed(2)),
    attributedLeads,
    attributedSales,
  };
}

export function buildLinkAttributionSnapshot(link: TrackedLink, attributions: LinkAttribution[] = []): LinkPerformanceSnapshot {
  const totals = buildTrackedLinkDisplayMetrics(link, attributions);
  return { linkId: link.id, slug: link.slug, campaign: link.campaign, creator: link.creator, channel: link.channel, creative: link.creative, clicks: totals.manualClicks, leads: totals.manualLeads, sales: totals.manualSales, revenue: totals.manualRevenue, estimatedCommission: totals.estimatedCommission, leadRate: pct(totals.manualLeads, totals.manualClicks), salesRate: pct(totals.manualSales, totals.manualLeads), score: Number((totals.manualSales * 100 + totals.manualLeads * 12 + totals.manualClicks + totals.estimatedCommission).toFixed(2)) };
}

export function rankTrackedLinks(links: TrackedLink[], attributions: LinkAttribution[] = []) {
  return links.map((link) => buildLinkAttributionSnapshot(link, attributions)).sort((a, b) => b.score - a.score);
}

export type { LinkAttribution, LinkPerformanceSnapshot, LinkRiskStatus, LinkStatus, TrackedLink, UtmParams };
