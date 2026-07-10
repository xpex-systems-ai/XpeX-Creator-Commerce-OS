import type { XpeXCommerceLocalState, XpeXCommerceLocalStateExport } from './types';

const STORAGE_KEY = 'xpex-commerce-local-operations-v1';
const SCHEMA_VERSION = 'xpex-commerce-local-v1' as const;
const EXPORT_SOURCE = 'xpex-commerce-local-mvp' as const;
let memoryState: XpeXCommerceLocalState | null = null;
const now = () => new Date().toISOString();

export function seedXpeXLocalState(): XpeXCommerceLocalState {
  const timestamp = now();
  return {
    version: 1,
    schemaVersion: SCHEMA_VERSION,
    source: EXPORT_SOURCE,
    lastUpdatedAt: timestamp,
    creators: [{ id: 'creator-anderso', name: 'Anderso', niche: 'Cantor de trap com público jovem', audience: 'Jovens conectados a música, lifestyle, quarto gamer e cultura urbana', channels: ['Instagram', 'TikTok', 'YouTube Shorts', 'WhatsApp Status'], status: 'Aprovado', notes: 'Criador piloto para validar operação local controlada.', createdAt: timestamp, updatedAt: timestamp }],
    products: [{ id: 'product-projetor-portatil', name: 'Projetor portátil', category: 'Tecnologia / lifestyle', mercadoLivreUrl: '', audienceFit: 'Quarto gamer, música, cinema em casa e jovens que querem transformar o ambiente.', creator: 'Anderso', creatorFit: 'Muito alto para Anderso: combina show, clipe, quarto e lifestyle urbano.', campaignAngle: 'Seu quarto vira palco', ctaKeyword: 'TELÃO', score: 9.2, status: 'Em campanha', notes: 'Produto âncora da Fase 04; usar demonstração manual, sem integração Mercado Livre.', createdAt: timestamp, updatedAt: timestamp }],
    campaigns: [{ id: 'campaign-seu-quarto-vira-palco', name: 'Seu quarto vira palco', productId: 'product-projetor-portatil', product: 'Projetor portátil', creator: 'Anderso', slogan: 'Seu quarto vira palco.', cta: 'Comenta TELÃO', channels: ['Instagram', 'TikTok', 'YouTube Shorts', 'WhatsApp Status'], status: 'Em validação', expectedMetric: 'Leads manuais por comentário/DM planejada', score: 9.1, briefing: 'Anderso entra no quarto apagado, liga o projetor, coloca beat/clipe na parede e mostra a transformação do ambiente.', createdAt: timestamp, updatedAt: timestamp }],
    creativeBriefs: [{ id: 'creative-quarto-palco', campaign: 'Seu quarto vira palco', product: 'Projetor portátil', creator: 'Anderso', hook: 'Seu quarto parece normal até isso ligar.', slogan: 'Seu quarto vira palco.', caption: 'Comenta TELÃO que eu te mando o setup planejado.', shortScript: 'Quarto escuro, projetor ligado, beat tocando e transformação visual.', whatsappText: 'Família, montei um setup visual pra transformar o quarto em telão.', status: 'Planejado', createdAt: timestamp, updatedAt: timestamp }],
    manualMetrics: [
      { id: 'metric-instagram-demo', campaign: 'Seu quarto vira palco', channel: 'Instagram', creative: 'Seu quarto parece normal até isso ligar.', date: timestamp.slice(0, 10), views: 850, estimatedClicks: 42, leads: 12, messages: 7, manualSales: 1, notes: 'Métrica demo manual da Fase 11.', createdAt: timestamp, updatedAt: timestamp },
      { id: 'metric-tiktok-demo', campaign: 'Seu quarto vira palco', channel: 'TikTok', creative: 'POV: sua parede virou palco.', date: timestamp.slice(0, 10), views: 640, estimatedClicks: 31, leads: 8, messages: 5, manualSales: 0, notes: 'Registro manual, sem leitura automática de rede social.', createdAt: timestamp, updatedAt: timestamp },
      { id: 'metric-youtube-demo', campaign: 'Seu quarto vira palco', channel: 'YouTube Shorts', creative: 'De quarto simples para cinema em 15 segundos.', date: timestamp.slice(0, 10), views: 420, estimatedClicks: 16, leads: 4, messages: 2, manualSales: 0, notes: 'Visualizações digitadas pelo operador humano.', createdAt: timestamp, updatedAt: timestamp },
      { id: 'metric-whatsapp-demo', campaign: 'Seu quarto vira palco', channel: 'WhatsApp Status', creative: 'Família, olha a vibe que dá pra montar no quarto.', date: timestamp.slice(0, 10), views: 190, estimatedClicks: 14, leads: 6, messages: 6, manualSales: 1, notes: 'Respostas recebidas manualmente no status.', createdAt: timestamp, updatedAt: timestamp },
    ],
    manualSales: [{ id: 'sale-demo-telao', campaign: 'Seu quarto vira palco', channel: 'Instagram', creative: 'Seu quarto parece normal até isso ligar.', product: 'Projetor portátil', quantity: 1, grossAmount: 320, commissionRate: 8, estimatedCommission: 25.6, date: timestamp.slice(0, 10), notes: 'Venda informada manualmente; pendente de conferência humana.', createdAt: timestamp, updatedAt: timestamp }],
    linkPlans: [{ id: 'link-telao-anderso-instagram', campaign: 'Seu quarto vira palco', product: 'Projetor portátil', creator: 'Anderso', channel: 'Instagram', slug: '/telao-anderso-instagram', destinationUrl: '', status: 'Planejado', notes: 'Slug planejado; provedor de links entra em fase futura.', createdAt: timestamp, updatedAt: timestamp }],
    leads: [{ id: 'lead-demo-telao', name: 'Lead demo TELÃO', channel: 'Instagram', interestedProduct: 'Projetor portátil', campaign: 'Seu quarto vira palco', creator: 'Anderso', status: 'Novo', observation: 'Exemplo local para validar CRM sem WhatsApp/API.', createdAt: timestamp, updatedAt: timestamp }],
  };
}

const isBrowser = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export function getXpeXLocalState(): XpeXCommerceLocalState {
  if (!isBrowser()) return memoryState ?? (memoryState = seedXpeXLocalState());
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return saveXpeXLocalState(seedXpeXLocalState());
    const parsed = JSON.parse(raw) as XpeXCommerceLocalState;
    if (parsed?.version !== 1) return saveXpeXLocalState(seedXpeXLocalState());
    return normalizeXpeXLocalState(parsed);
  } catch {
    return saveXpeXLocalState(seedXpeXLocalState());
  }
}

function normalizeXpeXLocalState(state: XpeXCommerceLocalState): XpeXCommerceLocalState {
  return { ...state, version: 1, schemaVersion: SCHEMA_VERSION, source: EXPORT_SOURCE, manualMetrics: state.manualMetrics || [], manualSales: state.manualSales || [] };
}

export function saveXpeXLocalState(state: XpeXCommerceLocalState): XpeXCommerceLocalState {
  const next = { ...normalizeXpeXLocalState(state), lastUpdatedAt: now() };
  memoryState = next;
  if (isBrowser()) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function resetXpeXLocalState(): XpeXCommerceLocalState {
  const seeded = seedXpeXLocalState();
  memoryState = seeded;
  if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY);
  return saveXpeXLocalState(seeded);
}

export function exportXpeXLocalStateJson(): string {
  const exportedState: XpeXCommerceLocalStateExport = {
    schemaVersion: SCHEMA_VERSION,
    exportedAt: now(),
    source: EXPORT_SOURCE,
    data: getXpeXLocalState(),
  };

  return JSON.stringify(exportedState, null, 2);
}
