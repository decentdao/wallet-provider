import { WalletProvider } from '../types';

export enum Web3ProviderActions {
  CONNECT = 'CONNECT_WALLET',
  DISCONNECT = 'DISCONNECT',
}

export type ActionTypes =
  | {
      type: Web3ProviderActions.CONNECT;
      payload: WalletProvider;
    }
  | {
      type: Web3ProviderActions.DISCONNECT;
    };
