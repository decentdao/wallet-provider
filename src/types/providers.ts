export interface WalletProvider {
  connectionType: string;
  network: string;
  chainId: number;
  provider: any | null;
  account: string | null;
  signerOrProvider: any | null;
  isProviderLoading?: boolean;
}

export interface ProviderApiKeys {
  infura?: string;
  alchemy?: string;
  etherscan?: string;
}

export interface DWPConfig {
  providerKeys: ProviderApiKeys;
  localChainId?: string;
  localProviderURL?: string;
  fallbackChainId: string;
  supportedChains: number[];
}
