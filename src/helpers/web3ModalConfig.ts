import { ModalTheme } from './../types/index';
import WalletConnectProvider from '@walletconnect/ethereum-provider';

export function getWeb3modalOptions(theme: string | ModalTheme = 'light') {
  return {
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_API_KEY,
        },
      },
    },

    theme,
  };
}
