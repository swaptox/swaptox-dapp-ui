import { create } from 'zustand';

import { defaultChain } from './chains';

type ChainState = {
	chain : string;
	setChain : (chain : string) => void;
};

export const useChainStore = create<ChainState>((set) => ({
	chain: defaultChain,
	setChain: (chain) => set({ chain }),
}));