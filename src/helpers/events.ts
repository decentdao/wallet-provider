import {
  PROVIDER_EVENT,
  UNSUPPORTED_CHAINS_IDS_MESSAGE,
  UNSUPPORTED_CHAIN_IDS,
} from '../constants';
import type { WalletProviderEvent } from '../types';

export function emitUnsupportedChainEvent(event: string, supportedChainIds: string) {
  const unsupportChainIdEvent = new CustomEvent<WalletProviderEvent>(PROVIDER_EVENT, {
    detail: {
      type: 'warn',
      title: UNSUPPORTED_CHAIN_IDS,
      message: `${UNSUPPORTED_CHAINS_IDS_MESSAGE}: ${supportedChainIds}`,
    },
  });
  window.dispatchEvent(unsupportChainIdEvent);
}
