



export const chainsMap = {
	rootstock: {
		chain: 'rootstock',
		name: 'Rootstock',
		chainId: 30,
		//chainIdHex: '0x1e',
		logo: '/logo/chain/rsk.png',
	},
	base: {
		chain: 'base',
		name: 'Base',
		chainId: 8453,
		//chainIdHex: '0x2105',
		logo: '/logo/chain/base.svg',
	},
	
	
	/* eth: {
		'chain': 'eth',
		'name': 'Ethereum',
		'logo': '/logo/chain/eth.svg',
	},
	bsc: {
		'chain': 'bsc',
		'name': 'BNB Chain',
		'logo': '/logo/chain/bnb.svg',
	},
	arbitrum: {
		'chain': 'arbitrum',
		'name': 'Arbitrum',
		'logo': '/logo/chain/arbitrum.svg',
	} */
	
	
} as const;

export type ChainKey = keyof typeof chainsMap;

export const chainsList = Object.values(chainsMap);

export const defaultChain: ChainKey = 'rootstock';








