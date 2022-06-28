import React, { ReactNode, useCallback, useEffect, useMemo, useReducer } from 'react';
import Web3Modal from 'web3modal';
import type { ConnectFn, DisconnectFn, DWPConfig, WalletProvider, ModalTheme } from './types';
import { ActionTypes, Web3ProviderActions } from './actions';
import { getWeb3modalOptions } from './helpers/web3ModalConfig';
import { useProviderListeners } from './hooks/useProviderListeners';
import { Web3ProviderContext } from './hooks/useWeb3Provider';
import { getFallbackProvider, getLocalProvider, getProviderInfo } from './helpers';

const initialState: WalletProvider = {
  account: null,
  signerOrProvider: null,
  connectionType: 'not connected',
  network: '',
  chainId: 0,
  provider: null,
  isProviderLoading: false,
};

const getInitialState = () => {
  return {
    ...initialState,
    isProviderLoading: true,
  };
};

const reducer = (state: WalletProvider, action: ActionTypes) => {
  switch (action.type) {
    case Web3ProviderActions.CONNECT: {
      const { account, signerOrProvider, provider, connectionType, network, chainId } =
        action.payload;
      return {
        ...state,
        account,
        signerOrProvider,
        provider,
        connectionType,
        network,
        chainId,
        isProviderLoading: false,
      };
    }
    default:
      return state;
  }
};

export function Web3Provider({
  config,
  theme,
  children,
}: {
  config: DWPConfig;
  theme?: string | ModalTheme;
  children: ReactNode | ReactNode[];
}) {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const web3Modal = useMemo(() => new Web3Modal(getWeb3modalOptions(theme)), [theme]);

  const connectDefaultProvider = useCallback(async () => {
    web3Modal.clearCachedProvider();
    if (process.env.REACT_APP_LOCAL_PROVIDER_URL && process.env.NODE_ENV === 'development') {
      dispatch({
        type: Web3ProviderActions.CONNECT,
        payload: await getLocalProvider(config),
      });
    } else {
      dispatch({
        type: Web3ProviderActions.CONNECT,
        payload: getFallbackProvider(config),
      });
    }
  }, [web3Modal, config]);

  const provider = useProviderListeners(web3Modal, config, connectDefaultProvider, state.account);

  useEffect(() => {
    if (provider) {
      const dispatchConnection = async () => {
        dispatch({
          type: Web3ProviderActions.CONNECT,
          payload: await getProviderInfo(provider, config),
        });
      };
      dispatchConnection();
    }
  }, [provider, config]);

  const connect: ConnectFn = useCallback(async () => {
    web3Modal.clearCachedProvider();
    await web3Modal.connect();
  }, [web3Modal]);

  const disconnect: DisconnectFn = useCallback(async () => {
    web3Modal.clearCachedProvider();
    connectDefaultProvider();
  }, [web3Modal, connectDefaultProvider]);

  const load = useCallback(async () => {
    if (web3Modal.cachedProvider) {
      await web3Modal.connect();
    } else {
      disconnect();
    }
  }, [web3Modal, disconnect]);

  useEffect(() => {
    load();
  }, [load]);

  const contextValue = useMemo(
    () => ({
      state,
      connect,
      disconnect,
    }),
    [state, connect, disconnect]
  );
  return (
    <Web3ProviderContext.Provider value={contextValue}>{children}</Web3ProviderContext.Provider>
  );
}
