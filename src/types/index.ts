export type ConnectFn = () => Promise<void>;
export type DisconnectFn = () => void;
export type ModalProvider = any;

export interface WalletProvider {
  connectionType: string;
  network: string;
  chainId: number;
  provider: any | null;
  account: string | null;
  signerOrProvider: any | null;
  isProviderLoading?: boolean;
}

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
  supportedChains: number[];
}

export interface ModalTheme {
  background: string;
  main: string;
  secondary: string;
  border: string;
  hover: string;
}

export interface WalletProviderEvent {
  type: 'error' | 'warn' | 'info';
  title: string;
  message: string;
  providerEvent: string;
}
