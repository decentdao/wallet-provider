import { DWPConfig } from './../types/index';
import Web3Modal from 'web3modal';
import { ethers, getDefaultProvider } from 'ethers';
import { InjectedProviderInfo, BaseProviderInfo, ProviderApiKeys } from '../types';

export const makeInjectedProvider = async (
  web3Provider: ethers.providers.Web3Provider,
  config: DWPConfig
): Promise<InjectedProviderInfo> => {
  const local =
    config.local && config.local.localChainId &&
    (await web3Provider.getNetwork()).chainId ===
    parseInt(config.local.localChainId, 10);

  const signer = web3Provider.getSigner();
  return {
    account: await signer.getAddress(),
    signerOrProvider: signer,
    provider: web3Provider,
    connectionType: 'injected provider',
    network: local ? 'localhost' : (await web3Provider.getNetwork()).name,
    chainId: (await web3Provider.getNetwork()).chainId,
  };
};

export const getInjectedProvider = (
  web3ModalProvider: Web3Modal,
  config: DWPConfig
): Promise<InjectedProviderInfo> => {
  return new Promise<InjectedProviderInfo>((resolve, reject) => {
    web3ModalProvider
      .connect()
      .then(userSuppliedProvider =>
        makeInjectedProvider(new ethers.providers.Web3Provider(userSuppliedProvider), config)
      )
      .then(resolve)
      .catch(reject);
  });
};

export const getLocalProvider = (config: DWPConfig): Promise<BaseProviderInfo> => {
  const localProvider = new ethers.providers.JsonRpcProvider(config.local!.providerURL);
  return new Promise<BaseProviderInfo>((resolve, reject) => {
    localProvider
      .detectNetwork()
      .then(network => {
        resolve({
          provider: localProvider,
          signerOrProvider: localProvider,
          connectionType: 'local provider',
          network: 'localhost',
          chainId: network.chainId,
        });
      })
      .catch(reject);
  });
};

export const getFallbackProvider = (config: DWPConfig): BaseProviderInfo => {
  const providerApiKeys: ProviderApiKeys = {};
  if (config.providerKeys.infura)
    providerApiKeys.infura = config.providerKeys.infura;
  if (config.providerKeys.alchemy)
    providerApiKeys.alchemy = config.providerKeys.alchemy;
  if (config.providerKeys.etherscan)
    providerApiKeys.etherscan = config.providerKeys.etherscan;

  const network = ethers.providers.getNetwork(parseInt(config.fallbackChainId || '0', 10));
  const defaultProvider = getDefaultProvider(network, providerApiKeys);

  return {
    provider: defaultProvider,
    signerOrProvider: defaultProvider,
    connectionType: 'readonly provider',
    network: defaultProvider.network.name,
    chainId: defaultProvider.network.chainId,
  };
};
