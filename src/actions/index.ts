import { WalletProvider } from '../types';

export enum Web3ProviderActions {
  CONNECT = 'CONNECT_WALLET',
}

export type ActionTypes = {
  type: Web3ProviderActions.CONNECT;
  payload: WalletProvider;
};
