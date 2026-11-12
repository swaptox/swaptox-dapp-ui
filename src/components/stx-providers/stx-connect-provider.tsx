'use client';
import { useEffect } from 'react';
import { chainsMap } from '@/data/chain/chains';

interface StxUiProps {
	chain: string;
	theme: string;
	lang: string;
}

export default function StxConnectProvider({chain, theme, lang}: StxUiProps) {

	useEffect(() => {
		let disposed = false;

		// 当前组件创建的实例
		let $swaptoxConnect: any = null;

		async function init() {
			try {
				const { createConnect } = await import('@swaptox/connect-ui');

				// 组件已经卸载，不再初始化
				if (disposed) return;

				// 避免覆盖其他地方已经创建的实例
				if (window.$swaptoxConnect) {
					if(!$swaptoxConnect){
						$swaptoxConnect = window.$swaptoxConnect;
					}
					const connectState = $swaptoxConnect.getState();
					const chainData = chainsMap[chain as keyof typeof chainsMap]
					if(connectState.chainId!==chainData.chainId){
						$swaptoxConnect?.updateConfig({ currentChain: chain });
					}
					console.warn('[SwaptoX Connect] Instance already exists.');
					return;
				}

				const connectConfig = {
					projectId: '19c224694c2b8c5e44f39cd795aa0837',
					chains: ['base', 'rootstock'],
					currentChain: chain,
					metadata: {
						name: 'SwaptoX',
						description: 'Swap Aggregator & DEX',
						logo: 'https://cdn.swaptox.com/logo.png',
						url: window.location.origin,
					},
					rpcMap: {},
				};

				$swaptoxConnect = createConnect(connectConfig, {theme, lang});
				

				// 初始化期间组件可能已经卸载
				if (disposed) {
					if ($swaptoxConnect) {
						$swaptoxConnect?.destroy();
					}
					return;
				}

			} catch (error) {
				if (!disposed) {
					console.error('[SwaptoX Connect] Initialization failed:', error);
				}
			}
		}

		init();

		return () => {
			disposed = true;
			// 只销毁当前组件创建的实例
			if ($swaptoxConnect) {
				$swaptoxConnect.destroy();
			}
			$swaptoxConnect = null;
		};

	}, [chain, theme, lang]);

	return null;
}
