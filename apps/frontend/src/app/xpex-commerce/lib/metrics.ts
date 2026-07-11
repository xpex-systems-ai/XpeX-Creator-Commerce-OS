import type { XpeXCommerceChannel, XpeXCommerceCreativeBrief, XpeXCommerceLead, XpeXManualMetric, XpeXManualSale } from './types';

export type CampaignMetric = XpeXManualMetric;
export type LeadMetric = XpeXCommerceLead;
export type ManualSaleMetric = XpeXManualSale;

export type ChannelMetric = {
  channel: XpeXCommerceChannel;
  views: number;
  clicks: number;
  leads: number;
  messages: number;
  sales: number;
  ctr: number;
  leadRate: number;
  conversionRate: number;
  estimatedCommission: number;
};

export type CreativeMetric = {
  creative: string;
  channel: XpeXCommerceChannel;
  views: number;
  clicks: number;
  leads: number;
  messages: number;
  sales: number;
  score: number;
};

export type PerformanceSnapshot = {
  campaign: string;
  generatedAt: string;
  totals: { views: number; clicks: number; leads: number; messages: number; sales: number; estimatedCommission: number };
  rates: { ctr: number; leadRate: number; conversionRate: number };
  channels: ChannelMetric[];
  creatives: CreativeMetric[];
  bestChannel?: ChannelMetric;
  bestCreative?: CreativeMetric;
  recommendations: string[];
};

const safePercent = (numerator: number, denominator: number) => denominator > 0 ? Number(((numerator / denominator) * 100).toFixed(2)) : 0;
export const calculateCtr = (clicks: number, views: number) => safePercent(clicks, views);
export const calculateLeadRate = (leads: number, clicks: number) => safePercent(leads, clicks);
export const calculateConversionRate = (sales: number, leads: number) => safePercent(sales, leads);
export const calculateEstimatedCommission = (grossAmount: number, commissionRate: number) => Number((grossAmount * (commissionRate / 100)).toFixed(2));

const channels: XpeXCommerceChannel[] = ['Instagram', 'TikTok', 'YouTube Shorts', 'WhatsApp Status'];

export function rankCreatives(metrics: CampaignMetric[], briefs: XpeXCommerceCreativeBrief[] = []): CreativeMetric[] {
  const grouped = new Map<string, CreativeMetric>();
  for (const metric of metrics) {
    const key = `${metric.creative || 'Criativo manual'}:${metric.channel}`;
    const current = grouped.get(key) || { creative: metric.creative || 'Criativo manual', channel: metric.channel, views: 0, clicks: 0, leads: 0, messages: 0, sales: 0, score: 0 };
    current.views += metric.views; current.clicks += metric.estimatedClicks; current.leads += metric.leads; current.messages += metric.messages; current.sales += metric.manualSales;
    grouped.set(key, current);
  }
  for (const brief of briefs) {
    const key = `${brief.hook}:Manual`;
    if (!grouped.has(key)) grouped.set(key, { creative: brief.hook, channel: 'Manual', views: 0, clicks: 0, leads: 0, messages: 0, sales: 0, score: 0 });
  }
  return [...grouped.values()].map((item) => ({ ...item, score: Number((item.sales * 40 + item.leads * 8 + item.messages * 4 + calculateCtr(item.clicks, item.views)).toFixed(2)) })).sort((a, b) => b.score - a.score);
}

export function buildPerformanceSnapshot(input: { campaign: string; metrics: CampaignMetric[]; leads?: LeadMetric[]; sales?: ManualSaleMetric[]; creativeBriefs?: XpeXCommerceCreativeBrief[] }): PerformanceSnapshot {
  const related = input.metrics.filter((metric) => metric.campaign === input.campaign);
  const sales = (input.sales || []).filter((sale) => sale.campaign === input.campaign);
  const totals = related.reduce((acc, metric) => ({ views: acc.views + metric.views, clicks: acc.clicks + metric.estimatedClicks, leads: acc.leads + metric.leads, messages: acc.messages + metric.messages, sales: acc.sales + metric.manualSales, estimatedCommission: acc.estimatedCommission }), { views: 0, clicks: 0, leads: 0, messages: 0, sales: 0, estimatedCommission: 0 });
  totals.estimatedCommission = Number(sales.reduce((sum, sale) => sum + sale.estimatedCommission, 0).toFixed(2));
  const channelMetrics = channels.map((channel) => {
    const entries = related.filter((metric) => metric.channel === channel);
    const channelSales = sales.filter((sale) => sale.channel === channel);
    const views = entries.reduce((sum, metric) => sum + metric.views, 0);
    const clicks = entries.reduce((sum, metric) => sum + metric.estimatedClicks, 0);
    const leads = entries.reduce((sum, metric) => sum + metric.leads, 0);
    const messages = entries.reduce((sum, metric) => sum + metric.messages, 0);
    const salesCount = entries.reduce((sum, metric) => sum + metric.manualSales, 0);
    return { channel, views, clicks, leads, messages, sales: salesCount, ctr: calculateCtr(clicks, views), leadRate: calculateLeadRate(leads, clicks), conversionRate: calculateConversionRate(salesCount, leads), estimatedCommission: Number(channelSales.reduce((sum, sale) => sum + sale.estimatedCommission, 0).toFixed(2)) };
  });
  const creatives = rankCreatives(related, input.creativeBriefs || []);
  const bestChannel = [...channelMetrics].sort((a, b) => (b.sales * 100 + b.leads * 10 + b.clicks) - (a.sales * 100 + a.leads * 10 + a.clicks))[0];
  const bestCreative = creatives[0];
  const recommendations = [bestCreative?.score ? `Aumentar variações do criativo vencedor: ${bestCreative.creative}.` : 'Publicar manualmente os primeiros criativos aprovados para gerar dados.', bestChannel?.views ? `Repetir o melhor canal medido: ${bestChannel.channel}.` : 'Registrar visualizações e cliques estimados por canal após cada publicação manual.', totals.leads && !totals.sales ? 'Revisar CTA e resposta humana para converter intenções em vendas manuais.' : 'Manter revisão humana antes de escalar qualquer canal.'];
  return { campaign: input.campaign, generatedAt: new Date().toISOString(), totals, rates: { ctr: calculateCtr(totals.clicks, totals.views), leadRate: calculateLeadRate(totals.leads, totals.clicks), conversionRate: calculateConversionRate(totals.sales, totals.leads) }, channels: channelMetrics, creatives, bestChannel, bestCreative, recommendations };
}


export const calculateLinkCtr = (clicks: number, views: number) => safePercent(clicks, views);
export const calculateLinkLeadRate = (leads: number, clicks: number) => safePercent(leads, clicks);
export const calculateLinkSalesRate = (sales: number, leads: number) => safePercent(sales, leads);
export const calculateRevenueByLink = (items: { reportedValue?: number; manualRevenue?: number }[]) => Number(items.reduce((sum, item) => sum + (item.reportedValue || item.manualRevenue || 0), 0).toFixed(2));
export const calculateCommissionByLink = (items: { estimatedCommission?: number }[]) => Number(items.reduce((sum, item) => sum + (item.estimatedCommission || 0), 0).toFixed(2));
