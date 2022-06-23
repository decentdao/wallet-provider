/**
 * utility to help parse supported chains from an .env string format
 * @param supportedChainsStr string seperating chain ids with commas - "3,4,42"
 * @param localChainId local chain id if needed
 * @returns number array containing all supported chain ids
 */
export const parseChainsIds = (supportedChainsStr: string, localChainId?: number) => {
  const dev = process.env.NODE_ENV !== 'production' && localChainId ? [localChainId] : [];
  const supported = [...dev, ...(supportedChainsStr || '').split(',').map(i => parseInt(i))];
  return supported;
};
