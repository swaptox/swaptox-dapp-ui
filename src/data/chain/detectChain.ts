import { chainsMap, defaultChain } from './chains';


export function isChain(chain : string) : chain is keyof typeof chainsMap {
	const newChain = chain.toLowerCase();
	return newChain in chainsMap;
}



export function detectChain(cookies : any, segments : string[]) {
	// 👉 先找标准位置
	if (segments.length > 1 && isChain(segments[1])) {
		return segments[1].toLowerCase();
	}

	// 👉 用户省略 locale
	if (segments.length > 0 && isChain(segments[0])) {
		return segments[0].toLowerCase();
	}

	const cookieChain = cookies?.get('chain')?.value;
	if (cookieChain && isChain(cookieChain)) {
		return cookieChain.toLowerCase();
	}

	return defaultChain;
}