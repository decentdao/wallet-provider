import { FallbackProviders, DWPConfig, WalletProvider, ProviderApiKeys } from './../types/index';
import { ethers, getDefaultProvider, providers } from 'ethers';

export const getProviderInfo = async (
  _provider: any
): Promise<[WalletProvider, ethers.providers.Web3Provider]> => {
  const provider = new ethers.providers.Web3Provider(_provider);
  const network = await provider.getNetwork();
  const signer = provider.getSigner();
  const account = (await signer.getAddress()) || null;
  return [
    {
      account: account,
      signerOrProvider: signer,
      provider: provider,
      connectionType: !account ? 'fallback' : 'injected provider',
      network: network.name,
      chainId: network.chainId,
    },
    provider,
  ];
};

export const getLocalProvider = async (
  config: DWPConfig
): Promise<[WalletProvider, FallbackProviders] | []> => {
  try {
    const isTestEnviroment = process.env.NODE_ENV === 'test';

    const localProvider = new ethers.providers.JsonRpcProvider(config.localProviderURL);

    const network = await localProvider.detectNetwork();
    const signerOrProvider = isTestEnviroment ? localProvider.getSigner() : localProvider;
    const account = isTestEnviroment
      ? await (signerOrProvider as providers.JsonRpcSigner).getAddress()
      : null;
    return [
      {
        account,
        provider: localProvider,
        signerOrProvider,
        connectionType: 'local provider',
        network: 'localhost',
        chainId: network.chainId,
      },
      localProvider,
    ];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getFallbackProvider = (config: DWPConfig): [WalletProvider, FallbackProviders] => {
  const providerApiKeys: ProviderApiKeys = {};
  if (config.providerKeys.infura) providerApiKeys.infura = config.providerKeys.infura;
  if (config.providerKeys.alchemy) providerApiKeys.alchemy = config.providerKeys.alchemy;
  if (config.providerKeys.etherscan) providerApiKeys.etherscan = config.providerKeys.etherscan;

  const network = ethers.providers.getNetwork(parseInt(config.fallbackChainId || '0', 10));
  const defaultProvider = getDefaultProvider(network, providerApiKeys);

  return [
    {
      account: null,
      provider: defaultProvider,
      signerOrProvider: defaultProvider,
      connectionType: 'readonly provider',
      network: defaultProvider.network.name,
      chainId: defaultProvider.network.chainId,
    },
    defaultProvider,
  ];
};
