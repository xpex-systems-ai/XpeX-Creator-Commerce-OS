'use client';

import { ContentCalendarCard, ManualTrackingNotice, SectionHeader, XpeXPageShell } from '../components';

const calendar = [
  ['Dia 1','Instagram Reels','Antes/depois','Seu quarto parece normal até isso ligar.','Comenta TELÃO','planejado'],
  ['Dia 2','TikTok','POV','POV: sua parede virou palco.','Pede TELÃO nos comentários','criado'],
  ['Dia 3','YouTube Shorts','Review curto','De quarto simples para cinema em 15 segundos.','Escreve TELÃO','aprovado'],
  ['Dia 4','WhatsApp Status','Bastidor','Família, olha a vibe que dá pra montar no quarto.','Responder TELÃO','publicado manualmente'],
  ['Dia 5','Instagram Reels','Reação','Mostrei o telão pros amigos e olha a reação.','Comenta TELÃO','planejado'],
  ['Dia 6','TikTok','Setup','3 coisas que mudaram a vibe do quarto.','Pede o link revisado','planejado'],
  ['Dia 7','YouTube Shorts','Resumo','O melhor teste da semana com o projetor.','Escreve TELÃO','analisado'],
].map(([day, channel, format, hook, cta, status]) => ({ day, channel, format, hook, cta, status }));

export default function XpeXCalendarPage() { return <XpeXPageShell eyebrow="Phase 11 · Calendário" title="Calendário Operacional da Campanha" description="Plano de 7 dias para Anderso divulgar o projetor com publicação manual e revisão humana."><ManualTrackingNotice /><section className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7"><SectionHeader eyebrow="7 dias" title="Seu quarto vira palco" description="Status: planejado, criado, aprovado, publicado manualmente e analisado. Sem Google Calendar e sem autopublicação." /><div className="mt-6 grid gap-4 lg:grid-cols-2">{calendar.map((item) => <ContentCalendarCard key={item.day} item={item} />)}</div></section></XpeXPageShell>; }
