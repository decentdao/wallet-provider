import { DWPConfig } from "./types";

export const supportedChains = (config: DWPConfig) => {
  const dev =
    process.env.NODE_ENV !== 'production'
      ? [parseInt(config.local?.localChainId || '0')]
      : [];
  const supported = [
    ...dev,
    ...(config.supportedChains || '').split(',').map(i => parseInt(i)),
  ];
  return supported;
};
