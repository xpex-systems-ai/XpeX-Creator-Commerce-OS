'use client';

import { useEffect, useState } from 'react';
import { exportXpeXLocalStateJson, getXpeXLocalState, resetXpeXLocalState, saveXpeXLocalState } from './local-store';
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
  useEffect(() => setState(getXpeXLocalState()), []);

  const persist = (updater: (current: XpeXCommerceLocalState) => XpeXCommerceLocalState) => {
    setState((current) => saveXpeXLocalState(updater(current)));
  };

  return {
    state,
    addProduct(input: NewProduct) {
      const time = stamp();
      persist((current) => ({ ...current, products: [{ ...input, id: id('product'), createdAt: time, updatedAt: time }, ...current.products] }));
    },
    addCampaign(input: NewCampaign) {
      const time = stamp();
      persist((current) => ({ ...current, campaigns: [{ ...input, id: id('campaign'), createdAt: time, updatedAt: time }, ...current.campaigns] }));
    },
    addLead(input: NewLead) {
      const time = stamp();
      persist((current) => ({ ...current, leads: [{ ...input, id: id('lead'), createdAt: time, updatedAt: time }, ...current.leads] }));
    },
    addLinkPlan(input: NewLinkPlan) {
      const time = stamp();
      persist((current) => ({ ...current, linkPlans: [{ ...input, id: id('link'), createdAt: time, updatedAt: time }, ...current.linkPlans] }));
    },
    addCreativeBrief(input: NewCreativeBrief) {
      const time = stamp();
      persist((current) => ({ ...current, creativeBriefs: [{ ...input, id: id('creative'), createdAt: time, updatedAt: time }, ...current.creativeBriefs] }));
    },
    updateProductStatus(productId: string, status: XpeXCommerceStatus) {
      const time = stamp();
      persist((current) => ({ ...current, products: current.products.map((product) => product.id === productId ? { ...product, status, updatedAt: time } : product) }));
    },
    updateCampaignStatus(campaignId: string, status: XpeXCommerceStatus) {
      const time = stamp();
      persist((current) => ({ ...current, campaigns: current.campaigns.map((campaign) => campaign.id === campaignId ? { ...campaign, status, updatedAt: time } : campaign) }));
    },
    resetDemoData() { setState(resetXpeXLocalState()); },
    exportJson() { return exportXpeXLocalStateJson(); },
  };
}
