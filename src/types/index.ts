import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ethers } from 'ethers';

export type ConnectFn = () => Promise<void>;
export type DisconnectFn = () => void;
export type Providers =
  | ethers.providers.Web3Provider
  | ethers.providers.JsonRpcProvider
  | ethers.providers.BaseProvider;

export type ModalProvider = ethers.providers.Web3Provider | WalletConnectProvider;

export interface InitialState {
  connectionType: string;
  network: string;
  chainId: number;
  provider: Providers | null;
  account: string | null;
  signerOrProvider: ethers.Signer | Providers | null;
  isProviderLoading: boolean;
}

export type InjectedProviderInfo = {
  account: string;
  signerOrProvider: ethers.Signer;
  provider: ethers.providers.Web3Provider;
  connectionType: string;
  network: string;
  chainId: number;
};

export type BaseProviderInfo = {
  provider: Providers;
  signerOrProvider: ethers.Signer | Providers;
  connectionType: string;
  network: string;
  chainId: number;
};

export type ProviderApiKeys = {
  infura?: string;
  alchemy?: string;
  etherscan?: string;
};

export interface DWPConfig {
  providerKeys: ProviderApiKeys;
  localChainId?: string;
  localProviderURL?: string;
  fallbackChainId: string;
  supportedChains: string; // 3,4 chains seperated by commas
}

export interface ModalTheme {
  background: string;
  main: string;
  secondary: string;
  border: string;
  hover: string;
}
