export const web3ProviderConfig = {
  providerKeys: {
    infura: process.env.REACT_APP_INFURA_API_KEY,
    alchemy: process.env.REACT_APP_ALCHEMY_API_KEY,
    etherscan: process.env.REACT_APP_ETHERSCAN_API_KEY
  },
  local: {
    localChainId: process.env.REACT_APP_LOCAL_CHAIN_ID,
    providerURL: process.env.REACT_APP_LOCAL_PROVIDER_URL,
  },
  fallbackChainId: process.env.REACT_APP_FALLBACK_CHAIN_ID || "",
  supportedChains: process.env.REACT_APP_SUPPORTED_CHAIN_IDS || "", // 3,4 chains seperated by commas
}