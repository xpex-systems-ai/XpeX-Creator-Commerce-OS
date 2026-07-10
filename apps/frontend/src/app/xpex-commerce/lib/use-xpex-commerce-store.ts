'use client';

import { useEffect, useState } from 'react';
import { xpexCommerceBackendClient } from './backend-client';
import { exportXpeXLocalStateJson, getXpeXLocalState, resetXpeXLocalState, saveXpeXLocalState } from './local-store';
import { getXpeXCommerceStorageMode, getXpeXStorageModeDescription, type XpeXBackendAvailability } from './storage-mode';
import type { XpeXCommerceCampaign, XpeXCommerceCreativeBrief, XpeXCommerceLead, XpeXCommerceLinkPlan, XpeXCommerceLocalState, XpeXCommerceProduct, XpeXCommerceStatus } from './types';

const id = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const stamp = () => new Date().toISOString();

type NewProduct = Omit<XpeXCommerceProduct, 'id' | 'createdAt' | 'updatedAt'>;
type NewCampaign = Omit<XpeXCommerceCampaign, 'id' | 'createdAt' | 'updatedAt'>;
type NewLead = Omit<XpeXCommerceLead, 'id' | 'createdAt' | 'updatedAt'>;
type NewLinkPlan = Omit<XpeXCommerceLinkPlan, 'id' | 'createdAt' | 'updatedAt'>;
type NewCreativeBrief = Omit<XpeXCommerceCreativeBrief, 'id' | 'createdAt' | 'updatedAt'>;

export function useXpeXCommerceStore() {
  const [state, setState] = useState<XpeXCommerceLocalState>(() => getXpeXLocalState());
  const [availability, setAvailability] = useState<XpeXBackendAvailability>(() => getXpeXCommerceStorageMode() === 'backend' ? 'checking' : 'disabled');
  const [notice, setNotice] = useState('');
  const mode = getXpeXCommerceStorageMode();

  useEffect(() => {
    const local = getXpeXLocalState();
    setState(local);
    if (mode !== 'backend') return;

    let cancelled = false;
    async function loadBackend() {
      const [products, campaigns, leads, linkPlans, creativeBriefs] = await Promise.all([
        xpexCommerceBackendClient.listProducts(),
        xpexCommerceBackendClient.listCampaigns(),
        xpexCommerceBackendClient.listLeads(),
        xpexCommerceBackendClient.listLinkPlans(),
        xpexCommerceBackendClient.listCreativeBriefs(),
      ]);
      if (cancelled) return;
      const results = [products, campaigns, leads, linkPlans, creativeBriefs];
      const failed = results.find((result) => !result.ok) as { ok: false; error: string } | undefined;
      if (failed) {
        setAvailability('unavailable');
        setNotice(`Backend indisponível (${failed.error}). Fallback localStorage ativo.`);
        setState(local);
        return;
      }
      const backendState = saveXpeXLocalState({ ...local, products: products.ok ? products.data as XpeXCommerceProduct[] : local.products, campaigns: campaigns.ok ? campaigns.data as XpeXCommerceCampaign[] : local.campaigns, leads: leads.ok ? leads.data as XpeXCommerceLead[] : local.leads, linkPlans: linkPlans.ok ? linkPlans.data as XpeXCommerceLinkPlan[] : local.linkPlans, creativeBriefs: creativeBriefs.ok ? creativeBriefs.data as XpeXCommerceCreativeBrief[] : local.creativeBriefs });
      setAvailability('available');
      setNotice('Backend controlado disponível. Dados carregados da API XpeX Commerce autenticada.');
      setState(backendState);
    }
    loadBackend();
    return () => { cancelled = true; };
  }, [mode]);

  const persist = (updater: (current: XpeXCommerceLocalState) => XpeXCommerceLocalState) => {
    setState((current) => saveXpeXLocalState(updater(current)));
  };

  const fallbackNotice = (error: string) => {
    setAvailability('unavailable');
    setNotice(`Backend indisponível (${error}). Operação salva no localStorage.`);
  };

  return {
    state,
    mode,
    backendAvailability: availability,
    operationNotice: notice || getXpeXStorageModeDescription(mode, availability),
    async addProduct(input: NewProduct) {
      if (mode === 'backend') { const result = await xpexCommerceBackendClient.createProduct(input); if (!result.ok) fallbackNotice((result as { ok: false; error: string }).error); }
      const time = stamp();
      persist((current) => ({ ...current, products: [{ ...input, id: id('product'), createdAt: time, updatedAt: time }, ...current.products] }));
    },
    async addCampaign(input: NewCampaign) {
      if (mode === 'backend') { const result = await xpexCommerceBackendClient.createCampaign(input); if (!result.ok) fallbackNotice((result as { ok: false; error: string }).error); }
      const time = stamp();
      persist((current) => ({ ...current, campaigns: [{ ...input, id: id('campaign'), createdAt: time, updatedAt: time }, ...current.campaigns] }));
    },
    async addLead(input: NewLead) {
      if (mode === 'backend') { const result = await xpexCommerceBackendClient.createLead(input); if (!result.ok) fallbackNotice((result as { ok: false; error: string }).error); }
      const time = stamp();
      persist((current) => ({ ...current, leads: [{ ...input, id: id('lead'), createdAt: time, updatedAt: time }, ...current.leads] }));
    },
    async addLinkPlan(input: NewLinkPlan) {
      if (mode === 'backend') { const result = await xpexCommerceBackendClient.createLinkPlan(input); if (!result.ok) fallbackNotice((result as { ok: false; error: string }).error); }
      const time = stamp();
      persist((current) => ({ ...current, linkPlans: [{ ...input, id: id('link'), createdAt: time, updatedAt: time }, ...current.linkPlans] }));
    },
    async addCreativeBrief(input: NewCreativeBrief) {
      if (mode === 'backend') { const result = await xpexCommerceBackendClient.createCreativeBrief(input); if (!result.ok) fallbackNotice((result as { ok: false; error: string }).error); }
      const time = stamp();
      persist((current) => ({ ...current, creativeBriefs: [{ ...input, id: id('creative'), createdAt: time, updatedAt: time }, ...current.creativeBriefs] }));
    },
    async updateProductStatus(productId: string, status: XpeXCommerceStatus) {
      if (mode === 'backend') { const result = await xpexCommerceBackendClient.updateProductStatus(productId, status); if (!result.ok) fallbackNotice((result as { ok: false; error: string }).error); }
      const time = stamp();
      persist((current) => ({ ...current, products: current.products.map((product) => product.id === productId ? { ...product, status, updatedAt: time } : product) }));
    },
    updateCampaignStatus(campaignId: string, status: XpeXCommerceStatus) {
      const time = stamp();
      persist((current) => ({ ...current, campaigns: current.campaigns.map((campaign) => campaign.id === campaignId ? { ...campaign, status, updatedAt: time } : campaign) }));
    },
    resetDemoData() { setState(resetXpeXLocalState()); setAvailability(mode === 'backend' ? 'checking' : 'disabled'); },
    exportJson() { return exportXpeXLocalStateJson(); },
  };
}
