export type XpeXCommerceStatus =
  | 'Em análise'
  | 'Aprovado'
  | 'Em campanha'
  | 'Vencedor'
  | 'Pausado'
  | 'Descartado'
  | 'Planejado'
  | 'Em validação'
  | 'Novo'
  | 'Link enviado'
  | 'Interessado'
  | 'Comprou'
  | 'Follow-up'
  | 'Não respondeu';

export type XpeXCommerceChannel = 'Instagram' | 'TikTok' | 'WhatsApp' | 'Manual' | 'Outro';

export type XpeXCommerceCreator = {
  id: string;
  name: string;
  niche: string;
  audience: string;
  channels: XpeXCommerceChannel[];
  status: XpeXCommerceStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type XpeXCommerceProduct = {
  id: string;
  name: string;
  category: string;
  mercadoLivreUrl?: string;
  audienceFit: string;
  creator: string;
  creatorFit: string;
  campaignAngle: string;
  ctaKeyword: string;
  score: number;
  status: XpeXCommerceStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type XpeXCommerceCampaign = {
  id: string;
  name: string;
  productId?: string;
  product: string;
  creator: string;
  slogan: string;
  cta: string;
  channels: XpeXCommerceChannel[];
  status: XpeXCommerceStatus;
  expectedMetric: string;
  score: number;
  briefing: string;
  createdAt: string;
  updatedAt: string;
};

export type XpeXCommerceCreativeBrief = {
  id: string;
  campaign: string;
  product: string;
  creator: string;
  hook: string;
  slogan: string;
  caption: string;
  shortScript: string;
  whatsappText: string;
  status: XpeXCommerceStatus;
  createdAt: string;
  updatedAt: string;
};

export type XpeXCommerceLinkPlan = {
  id: string;
  campaign: string;
  product: string;
  creator: string;
  channel: XpeXCommerceChannel;
  slug: string;
  destinationUrl?: string;
  status: XpeXCommerceStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type XpeXCommerceLead = {
  id: string;
  name: string;
  channel: XpeXCommerceChannel;
  interestedProduct: string;
  campaign: string;
  creator: string;
  status: XpeXCommerceStatus;
  observation: string;
  createdAt: string;
  updatedAt: string;
};

export type XpeXCommerceLocalState = {
  version: 1;
  schemaVersion: 'xpex-commerce-local-v1';
  source: 'xpex-commerce-local-mvp';
  products: XpeXCommerceProduct[];
  campaigns: XpeXCommerceCampaign[];
  creators: XpeXCommerceCreator[];
  creativeBriefs: XpeXCommerceCreativeBrief[];
  linkPlans: XpeXCommerceLinkPlan[];
  leads: XpeXCommerceLead[];
  lastUpdatedAt: string;
};

export type XpeXCommerceLocalStateExport = {
  schemaVersion: 'xpex-commerce-local-v1';
  exportedAt: string;
  source: 'xpex-commerce-local-mvp';
  data: XpeXCommerceLocalState;
};
