

import { chainsMap, defaultChain, ChainKey } from './chains';

/* export function resolveChain(chainFromUrl?: string) {
	if (chainFromUrl && chainFromUrl in chainsMap) {
		return chainsMap[chainFromUrl as ChainKey];
	}

	return chainsMap[defaultChain];
} */
export function resolveChain(chainFromUrl?: string) {
  if (!chainFromUrl) {
    return chainsMap[defaultChain];
  }

  const normalized = chainFromUrl.toLowerCase();

  if (normalized in chainsMap) {
    return chainsMap[normalized as keyof typeof chainsMap];
  }

  return chainsMap[defaultChain];
}