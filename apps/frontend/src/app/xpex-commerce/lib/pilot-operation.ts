export const PILOT_REAL_REVIEW = 'PILOT_REAL_REVIEW' as const;

export const xpexPhase10PilotOperation = {
  status: PILOT_REAL_REVIEW,
  principle: 'Operação interna real controlada, manual e revisada por humano antes de qualquer publicação.',
  creator: {
    name: 'Anderso',
    role: 'Criador de conteúdo jovem / trap / influência local',
    audience: 'Público jovem, entretenimento, música, tecnologia acessível e lifestyle',
    niche: 'Trap, lifestyle urbano, quarto gamer, bastidores e influência local',
    tone: 'Direto, visual, natural, aspiracional e sem parecer vendedor forçado',
    channels: ['Instagram Reels', 'TikTok', 'YouTube Shorts', 'WhatsApp Status'],
    contentTypes: ['Transformação de ambiente', 'Bastidor de clipe', 'Reação com amigos', 'Review curto', 'Story com enquete'],
    status: PILOT_REAL_REVIEW,
  },
  product: {
    name: 'Projetor portátil — referência manual',
    category: 'Projetor portátil / entretenimento em casa',
    positioning: 'Transformar quarto, sala ou parede em cinema, palco ou sessão de gameplay',
    source: 'Mercado Livre manual, sem API nesta fase',
    status: PILOT_REAL_REVIEW,
    manualReviewNotes: ['Validar preço e disponibilidade manualmente antes de compartilhar link.', 'Não usar marca, garantia ou atributo técnico sem conferência humana.', 'Registrar URL manual somente após revisão de segurança.'],
  },
  campaign: {
    name: 'Seu quarto vira palco',
    angle: 'Projetor portátil para filme, clipe, live, jogo e resenha com os amigos',
    promise: 'Mostrar a transformação visual do quarto sem prometer preço, resultado ou garantia não verificada.',
    audience: 'Jovens que querem melhorar o quarto, assistir conteúdos, jogar ou criar vídeos com estética premium acessível.',
    status: PILOT_REAL_REVIEW,
    channels: ['Instagram Reels', 'TikTok', 'YouTube Shorts', 'WhatsApp Status'],
  },
  creativeBriefs: [
    { format: 'Instagram Reels', hook: 'Seu quarto parece normal até isso ligar.', script15s: 'Quarto apagado, Anderso liga o projetor, clipe aparece na parede, reação real e CTA para pedir o link revisado.', caption: 'Comenta TELÃO que eu mando o setup revisado manualmente.', cta: 'Comenta TELÃO', thumbnail: 'Antes/depois do quarto com parede iluminada', story: 'Enquete: qual parede viraria telão aí?' },
    { format: 'TikTok', hook: 'POV: sua parede virou palco.', script15s: 'Corte rápido do quarto comum para projeção com beat, texto grande na tela e demonstração sem preço inventado.', caption: 'Isso mudou a vibe do quarto sem obra. Link só depois de revisão manual.', cta: 'Pede TELÃO nos comentários', thumbnail: 'Anderso apontando para projeção', story: 'Bastidor testando distância do projetor' },
    { format: 'YouTube Shorts', hook: 'De quarto simples para cinema em 15 segundos.', script15s: 'Mostrar setup, projeção, uso para filme/gameplay e aviso de link manual revisado.', caption: 'Projeto piloto XpeX: produto conferido manualmente antes do envio.', cta: 'Escreve TELÃO', thumbnail: 'Tela grande na parede', story: 'Checklist do setup' },
    { format: 'WhatsApp Status', hook: 'Família, olha a vibe que dá pra montar no quarto.', script15s: 'Vídeo vertical curto com demonstração e chamada para responder status pedindo link.', caption: 'Quem quiser o link revisado responde TELÃO aqui.', cta: 'Responder TELÃO', thumbnail: 'Parede projetada em ambiente escuro', story: 'Status com aviso de revisão manual' },
  ],
  manualLinkPlan: [
    { origin: 'Mercado Livre manual', channel: 'Instagram Reels', campaign: 'Seu quarto vira palco', creator: 'Anderso', manualUrl: 'https://example.com/revisar-url-do-produto', suggestedUtm: 'utm_source=instagram&utm_medium=reels&utm_campaign=seu_quarto_vira_palco&utm_content=anderso_telao', status: PILOT_REAL_REVIEW, notes: 'Substituir por URL real somente após revisão humana; sem Dub nesta fase.' },
    { origin: 'Mercado Livre manual', channel: 'TikTok', campaign: 'Seu quarto vira palco', creator: 'Anderso', manualUrl: 'https://example.com/revisar-url-do-produto', suggestedUtm: 'utm_source=tiktok&utm_medium=short_video&utm_campaign=seu_quarto_vira_palco&utm_content=anderso_telao', status: PILOT_REAL_REVIEW, notes: 'Não encurtar automaticamente; copiar manualmente após validação.' },
    { origin: 'Mercado Livre manual', channel: 'YouTube Shorts', campaign: 'Seu quarto vira palco', creator: 'Anderso', manualUrl: 'https://example.com/revisar-url-do-produto', suggestedUtm: 'utm_source=youtube&utm_medium=shorts&utm_campaign=seu_quarto_vira_palco&utm_content=anderso_telao', status: PILOT_REAL_REVIEW, notes: 'Usar descrição/comentário somente após aprovação.' },
    { origin: 'Mercado Livre manual', channel: 'WhatsApp Status', campaign: 'Seu quarto vira palco', creator: 'Anderso', manualUrl: 'https://example.com/revisar-url-do-produto', suggestedUtm: 'utm_source=whatsapp&utm_medium=status&utm_campaign=seu_quarto_vira_palco&utm_content=anderso_telao', status: PILOT_REAL_REVIEW, notes: 'Sem automação de WhatsApp; resposta manual.' },
  ],
  flow: ['produto manual', 'campanha', 'criador', 'criativo', 'link manual', 'lead', 'métrica'],
  checklist: ['Produto conferido manualmente', 'URL segura revisada', 'Roteiro aprovado por humano', 'CTA sem promessa enganosa', 'Publicação manual', 'Métrica registrada manualmente'],
  disabledIntegrations: ['Mercado Livre API', 'Dub', 'n8n', 'OpenAI', 'WhatsApp automation', 'paid ads', 'auto publish'],
} as const;

export function sanitizeManualPilotUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return { safe: false, value: '', reason: 'URL vazia' };
  try {
    const url = new URL(trimmed);
    if (!['http:', 'https:'].includes(url.protocol)) return { safe: false, value: trimmed, reason: 'Protocolo bloqueado' };
    return { safe: true, value: url.toString(), reason: 'URL http/https permitida para revisão manual' };
  } catch {
    return { safe: false, value: trimmed, reason: 'URL inválida' };
  }
}
