import { CHAIN_CHANGED, CONNECT, ACCOUNT_CHANGED, DISCONNECT } from '../constants/events';
import { DWPConfig } from '../types';
import { useState, useEffect, useMemo } from 'react';
import Web3Modal from 'web3modal';
import { emitUnsupportedChainEvent } from '../helpers';

export const useListeners = (
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
    web3Modal.on(CONNECT, async _modalProvider => {
      // check that connected chain is supported
      if (config.supportedChains.includes(parseInt(_modalProvider.chainId))) {
        setModalProvider(_modalProvider);

        // check that fallback id is supported (prevents endless loop)
      } else if (config.supportedChains.includes(parseInt(config.fallbackChainId))) {
        emitUnsupportedChainEvent(CONNECT, config.supportedChains.join(', '));
        await connectDefaultProvider();
        setModalProvider(null);

        // connect connect to provider, error in config
      } else {
        emitUnsupportedChainEvent(CONNECT, config.supportedChains.join(', '));
        setModalProvider(null);
      }
    });
    return () => {
      web3Modal.off(CONNECT);
    };
  }, [web3Modal, config, connectDefaultProvider]);

  useEffect(() => {
    const chainChangedCallback = async (chainId: string) => {
      if (!config.supportedChains.includes(parseInt(chainId))) {
        // switch to a default provider
        emitUnsupportedChainEvent(CHAIN_CHANGED, config.supportedChains.join(', '));
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
    modalProvider.on(CHAIN_CHANGED, chainChangedCallback);

    // subscribe to account change events
    modalProvider.on(ACCOUNT_CHANGED, accountsChangedCallback);

    // subscribe to provider disconnection
    modalProvider.on(DISCONNECT, disconnectCallback);
  }, [modalProvider, web3Modal, config, connectDefaultProvider]);

  return modalProvider;
};
