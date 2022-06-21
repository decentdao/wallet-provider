import { Context, createContext, useContext } from 'react';

import { ConnectFn, DisconnectFn, InitialState } from '../types';

export interface IWeb3ProviderContext {
  state: InitialState;
  connect: ConnectFn;
  disconnect: DisconnectFn;
}

export const Web3ProviderContext = createContext<IWeb3ProviderContext | null>(null);

export const useWeb3Provider = (): IWeb3ProviderContext =>
  useContext(Web3ProviderContext as Context<IWeb3ProviderContext>);
