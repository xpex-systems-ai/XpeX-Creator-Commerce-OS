export type XpeXStorageMode = 'local' | 'backend';
export type XpeXBackendAvailability = 'disabled' | 'checking' | 'available' | 'unavailable' | 'fallback';

const BACKEND_FLAG = 'NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED';

export function isXpeXCommerceBackendEnabled() {
  return process.env.NEXT_PUBLIC_XPEX_COMMERCE_BACKEND_ENABLED === 'true';
}

export function getXpeXCommerceStorageMode(): XpeXStorageMode {
  return isXpeXCommerceBackendEnabled() ? 'backend' : 'local';
}

export function getXpeXStorageModeLabel(mode: XpeXStorageMode) {
  return mode === 'backend' ? 'Modo Backend Controlado' : 'Modo Demo Local';
}

export function getXpeXStorageModeDescription(mode: XpeXStorageMode, availability: XpeXBackendAvailability) {
  if (mode === 'local') {
    return `Backend desativado (${BACKEND_FLAG} diferente de true). Os dados ficam no localStorage deste navegador.`;
  }

  if (availability === 'available') {
    return 'Backend controlado habilitado. Mercado Livre, Dub, n8n, OpenAI e anúncios pagos continuam desconectados.';
  }

  if (availability === 'fallback') {
    return 'Backend habilitado apresentou falha em homologação. Fallback localStorage está ativo para preservar a operação.';
  }

  if (availability === 'unavailable') {
    return 'Backend habilitado, mas indisponível ou recusou a chamada. A interface continua em fallback localStorage.';
  }

  return 'Backend controlado habilitado; verificando disponibilidade antes de usar a API real autenticada.';
}
