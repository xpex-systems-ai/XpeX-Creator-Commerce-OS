export type XpeXStatus = 'MVP' | 'Mockado' | 'Em validação' | 'Pronto para próxima fase';

export type XpeXChannel = 'Instagram' | 'TikTok' | 'WhatsApp';

export const xpexCreatorCommerceMock = {
  creator: {
    name: 'Anderso',
    profile: 'Cantor de trap com público jovem',
    audience: 'Jovens conectados a música, lifestyle, quarto gamer e cultura urbana',
    channels: ['Instagram', 'TikTok', 'WhatsApp'] as XpeXChannel[],
    status: 'MVP' as XpeXStatus,
  },
  product: {
    name: 'Projetor portátil',
    category: 'Tecnologia / lifestyle',
    status: 'Em validação' as XpeXStatus,
    score: 8.5,
    pricingNote: 'Preço fixo ainda não obrigatório no MVP visual',
  },
  campaign: {
    name: 'Seu quarto vira palco',
    cta: 'Comenta TELÃO',
    channels: ['Instagram', 'TikTok', 'WhatsApp'] as XpeXChannel[],
    status: 'MVP' as XpeXStatus,
    promise: 'Transformar o quarto do público em uma experiência de show e cinema particular.',
  },
  metrics: {
    clicks: 1240,
    leads: 186,
    plannedPosts: 9,
    generatedCreatives: 27,
    campaignScore: 8.7,
    complianceStatus: 'Aprovado para demonstração interna com dados mockados',
  },
  modules: [
    { title: 'Produtos ML', value: '1', detail: 'Produto inicial em validação manual' },
    { title: 'Campanhas', value: '1', detail: 'Brief e CTA definidos para MVP' },
    { title: 'Criadores', value: '1', detail: 'Anderso como creator piloto' },
    { title: 'Links', value: '3', detail: 'Fontes planejadas por canal' },
    { title: 'Leads', value: '186', detail: 'Intenção capturada via CTA mockado' },
    { title: 'Métricas', value: '8.7', detail: 'Score consolidado da campanha' },
  ],
  funnel: [
    'Produto',
    'Radar IA',
    'Criativo',
    'Link',
    'Postagem',
    'Lead',
    'Métrica',
    'Otimização',
  ],
  agents: [
    { name: 'Radar de Produto', status: 'Mockado', role: 'Avalia potencial, categoria e ângulos comerciais do produto.' },
    { name: 'Copywriter', status: 'Mockado', role: 'Cria hooks, CTAs, legendas e variações para cada canal.' },
    { name: 'Diretor de Vídeo', status: 'Mockado', role: 'Organiza roteiro curto, cenas e ritmo para Reels e TikTok.' },
    { name: 'Criativo Visual', status: 'Mockado', role: 'Define direção visual premium sem depender de imagens externas.' },
    { name: 'Publicador', status: 'Mockado', role: 'Planeja distribuição, sem alterar lógica social existente.' },
    { name: 'Links/Tracking', status: 'Mockado', role: 'Planeja links rastreáveis para Instagram, TikTok e WhatsApp.' },
    { name: 'CRM', status: 'Mockado', role: 'Agrupa leads por intenção, canal e próxima ação manual.' },
    { name: 'Métricas', status: 'Mockado', role: 'Consolida cliques, leads, criativos e score de campanha.' },
    { name: 'Compliance', status: 'Mockado', role: 'Sinaliza restrições, claims e aprovação humana.' },
    { name: 'Growth', status: 'Mockado', role: 'Sugere próximos experimentos e otimizações controladas.' },
  ],
  nextSteps: [
    'Produto manual',
    'Campanha manual',
    'Criador Anderso',
    'Links rastreáveis',
    'CRM',
  ],
} as const;
