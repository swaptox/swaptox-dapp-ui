import { create } from 'zustand';

type UIState = {
	mounted : boolean;
	routing : boolean;

	setMounted : (v : boolean) => void;
	setRouting : (v : boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
	mounted: false,
	routing: false,

	setMounted: (v) => set({ mounted: v }),
	setRouting: (v) => set({ routing: v }),
}));