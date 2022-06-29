import { Context, createContext, useContext } from 'react';

import { ConnectFn, DisconnectFn, WalletProvider } from '../types';

export interface IWeb3ProviderContext {
  state: WalletProvider;
  connect: ConnectFn;
  disconnect: DisconnectFn;
}

export const Web3ProviderContext = createContext<IWeb3ProviderContext | null>(null);

export const useWeb3Provider = (): IWeb3ProviderContext =>
  useContext(Web3ProviderContext as Context<IWeb3ProviderContext>);
