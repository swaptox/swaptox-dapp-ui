import { useUIStore } from './ui';

export function useUIReady() {
	const { mounted, routing } = useUIStore();
	return mounted && !routing;
}


let timer : NodeJS.Timeout | null = null;

export function lockUI() {
	const store = useUIStore.getState();
	store.setRouting(true);
	if (timer) clearTimeout(timer);
	timer = setTimeout(() => {
		store.setRouting(false);
		timer = null;
	}, 1500);
	setTimeout(()=>{
		store.setRouting(false);
		timer = null;
	}, 3000);
}