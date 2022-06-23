import { parseChainsIds } from '@decent-org/wallet-provider';

export const web3ProviderConfig = () => {
  const infura = process.env.REACT_APP_INFURA_API_KEY
  const alchemy = process.env.REACT_APP_ALCHEMY_API_KEY
  const etherscan = process.env.REACT_APP_ETHERSCAN_API_KEY

  const localChainId =  process.env.REACT_APP_LOCAL_CHAIN_ID ? parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID) : undefined
  const localProviderURl = process.env.REACT_APP_LOCAL_PROVIDER_URL
  const fallbackChainId = process.env.REACT_APP_FALLBACK_CHAIN_ID
  const supportedChains = process.env.REACT_APP_SUPPORTED_CHAIN_IDS
  return {
    providerKeys: {
      infura: infura,
      alchemy: alchemy,
      etherscan: etherscan
    },
    local: {
      localChainId: localChainId,
      localProviderURL: localProviderURl,
    },
    // fallback chain id is required
    fallbackChainId: fallbackChainId!,
    // supported chains is required
    supportedChains: parseChainsIds(supportedChains!),
  }
}