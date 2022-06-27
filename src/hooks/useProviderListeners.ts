import { DWPConfig } from '../types';
import { useState, useEffect, useMemo } from 'react';
import Web3Modal from 'web3modal';

export const useProviderListeners = (
  web3Modal: Web3Modal,
  config: DWPConfig,
  connectDefaultProvider: () => Promise<void>,
  account: string | null
) => {
  const [modalProvider, setModalProvider] = useState<any>(null);

  const isConnected = useMemo(() => !!account, [account]);

  useEffect(() => {
    if (!isConnected) {
      setModalProvider(null);
    }
  }, [isConnected]);

  useEffect(() => {
    // subscribe to connect events
    web3Modal.on('connect', async _modalProvider => {
      // check that connected chain is supported
      if (config.supportedChains.includes(parseInt(_modalProvider.chainId))) {
        setModalProvider(_modalProvider);
      } else if (config.supportedChains.includes(parseInt(config.fallbackChainId))) {
        await connectDefaultProvider();
        setModalProvider(null);
      } else {
        // @todo event cannot connect
        setModalProvider(null);
      }
    });
    return () => {
      web3Modal.off('connect');
    };
  }, [web3Modal, config, connectDefaultProvider]);

  useEffect(() => {
    const chainChangedCallback = async (chainId: string) => {
      if (!config.supportedChains.includes(parseInt(chainId))) {
        // switch to a default provider
        connectDefaultProvider();
      } else {
        await web3Modal.connect();
      }
    };

    const accountsChangedCallback = async (accounts: string[]) => {
      if (!accounts.length) {
        // switch to a default provider
        web3Modal.clearCachedProvider();
        connectDefaultProvider();
      } else {
        await web3Modal.connect();
      }
    };
    const disconnectCallback = async () => {
      // switch to a default provider
      web3Modal.clearCachedProvider();
      connectDefaultProvider();
    };
    if (!modalProvider) return;

    // subscribe to chain events
    modalProvider.on('chainChanged', chainChangedCallback);

    // subscribe to account change events
    modalProvider.on('accountsChanged', accountsChangedCallback);

    // subscribe to provider disconnection
    modalProvider.on('disconnect', disconnectCallback);
  }, [modalProvider, web3Modal, config, connectDefaultProvider]);

  return modalProvider;
};
