// /lib/chain/storage.ts

import { ChainKey } from './chains';

const STORAGE_KEY = 'chain';

export function getStoredChain() : ChainKey | null {
	if (typeof window === 'undefined') return null;

	const value = localStorage.getItem(STORAGE_KEY);
	return value as ChainKey | null;
}

export function setStoredChain(chain : ChainKey) {
	if (typeof window === 'undefined') return;
	localStorage.setItem(STORAGE_KEY, chain);
}