import {
  PROVIDER_EVENT,
  UNSUPPORTED_CHAINS_IDS_MESSAGE,
  UNSUPPORTED_CHAIN_IDS,
} from '../constants';
import { WalletProviderEvent } from '../types';

export function emitUnsupportedChainEvent(event: string, supportedChainIds: string) {
  const UNSUPPORTED_CHAIN_IDS_EVENT = new CustomEvent<WalletProviderEvent>(PROVIDER_EVENT, {
    detail: {
      providerEvent: event,
      type: 'warn',
      title: UNSUPPORTED_CHAIN_IDS,
      message: `${UNSUPPORTED_CHAINS_IDS_MESSAGE}: ${supportedChainIds}`,
    },
  });
  window.dispatchEvent(UNSUPPORTED_CHAIN_IDS_EVENT);
}
