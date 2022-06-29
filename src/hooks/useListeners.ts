import { FallbackProviders, DWPConfig } from './../types/index';
import { CHAIN_CHANGED, CONNECT, ACCOUNT_CHANGED, DISCONNECT } from '../constants/events';
import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { emitUnsupportedChainEvent } from '../helpers';
import { ethers } from 'ethers';

export const useListeners = (
  web3Modal: Web3Modal,
  config: DWPConfig,
  connectDefaultProvider: () => Promise<FallbackProviders>,
  connectInjectedProvider: (provider: any) => Promise<ethers.providers.Web3Provider>
) => {
  const [modalProvider, setModalProvider] = useState<any>(null);

  useEffect(() => {
    const connectListener = async (_modalProvider: any) => {
      // check that connected chain is supported
      if (config.supportedChains.includes(parseInt(_modalProvider.chainId))) {
        await connectInjectedProvider(_modalProvider);
        setModalProvider(_modalProvider);

        // check that fallback id is supported (prevents endless loop)
      } else if (config.supportedChains.includes(parseInt(config.fallbackChainId))) {
        emitUnsupportedChainEvent(CONNECT, config.supportedChains.join(', '));
        await connectDefaultProvider();
        // cannot connect to provider, error in config
      } else {
        emitUnsupportedChainEvent(CONNECT, config.supportedChains.join(', '));
        setModalProvider(null);
      }
    };

    // subscribe to connect events
    web3Modal.on(CONNECT, connectListener);

    return () => {
      web3Modal.off(CONNECT, connectListener);
    };
  }, [web3Modal, config, connectDefaultProvider, connectInjectedProvider]);

  useEffect(() => {
    if (!modalProvider) return;
    const chainChangedCallback = async (chainId: string) => {
      if (!config.supportedChains.includes(parseInt(chainId))) {
        // switch to a default provider
        emitUnsupportedChainEvent(CHAIN_CHANGED, config.supportedChains.join(', '));
        await connectDefaultProvider();
        setModalProvider(null);
      } else {
        await web3Modal.connect();
      }
    };

    const accountsChangedCallback = async (accounts: string[]) => {
      if (!accounts.length) {
        // switch to a default provider
        await connectDefaultProvider();
        setModalProvider(null);
      } else {
        await web3Modal.connect();
      }
    };
    const disconnectCallback = async () => {
      // switch to a default provider
      web3Modal.clearCachedProvider();
      await connectDefaultProvider();
      setModalProvider(null);
    };

    // subscribe to chain events
    modalProvider.on(CHAIN_CHANGED, chainChangedCallback);

    // subscribe to account change events
    modalProvider.on(ACCOUNT_CHANGED, accountsChangedCallback);

    // subscribe to provider disconnection
    modalProvider.on(DISCONNECT, disconnectCallback);
  }, [modalProvider, web3Modal, config, connectDefaultProvider]);
};
