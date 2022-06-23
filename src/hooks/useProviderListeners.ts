import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { ConnectFn, DWPConfig, ModalProvider } from '../types';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

export const useProviderListeners = (
  web3Modal: Web3Modal,
  connectDefaultProvider: () => void,
  connect: ConnectFn,
  config: DWPConfig
) => {
  const [modalProvider, setModalProvider] = useState<ModalProvider | null>(null);

  useEffect(() => {
    // subscribe to connect events
    web3Modal.on('connect', _modalProvider => {
      // check that connected chain is supported
      if (!config.supportedChains.includes(parseInt(_modalProvider.chainId))) {
        // @todo add 'unsupported network' event
        // switch to a default provider
        connectDefaultProvider();
      } else {
        setModalProvider(_modalProvider);
        // @todo add 'connect' event
      }
    });
    return () => {
      web3Modal.off('connect');
    };
  }, [web3Modal, connectDefaultProvider, config]);

  useEffect(() => {
    const chainChangedCallback = (chainId: string) => {
      if (!config.supportedChains.includes(parseInt(chainId))) {
        // @todo add 'unsupported network' event
        // switch to a default provider
        connectDefaultProvider();
      } else {
        // @todo add 'network changed' event
        connect();
      }
    };

    const accountsChangedCallback = (accounts: string[]) => {
      if (!accounts.length) {
        // @todo add 'access revoked' event
        // switch to a default provider
        connectDefaultProvider();
        // remove listeners
        setModalProvider(null);
      } else {
        // @todo add 'account changed event' event
        connect();
      }
    };
    const disconnectCallback = () => {
      // @todo add 'access revoked' event
      // switch to a default provider
      connectDefaultProvider();
      // remove listeners
      setModalProvider(null);
    };
    if (!modalProvider) return;

    // subscribe to chain events
    modalProvider.on('chainChanged', chainChangedCallback);

    // subscribe to account change events
    modalProvider.on('accountsChanged', accountsChangedCallback);

    // subscribe to provider disconnection
    modalProvider.on('disconnect', disconnectCallback);

    // unsubscribe
    return () => {
      if ((modalProvider as WalletConnectProvider).isWalletConnect) {
        modalProvider.off('accountsChanged', chainChangedCallback);
        modalProvider.off('chainChanged', chainChangedCallback);
        modalProvider.off('disconnect', disconnectCallback);
      } else {
        (modalProvider as ethers.providers.Web3Provider).removeAllListeners();
      }
    };
  }, [modalProvider, web3Modal, connectDefaultProvider, connect, config]);
};
