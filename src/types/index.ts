import { ethers } from 'ethers';
export * from './events';
export * from './providers';
export * from './theme';

export type ConnectFn = () => Promise<void>;
export type DisconnectFn = () => void;
export type ModalProvider = any;

export type FallbackProviders = ethers.providers.JsonRpcProvider | ethers.providers.BaseProvider;
