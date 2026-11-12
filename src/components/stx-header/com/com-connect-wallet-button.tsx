'use client';

//import { useEffect, useState } from 'react';
import { useUIReady } from '@/lib/js_sdk/index';
import { useTranslations } from 'next-intl';

export default function ComConnectWalletButton() {
	/* const [mounted, setMounted] = useState(false);
	
	// 等待客户端挂载完成
	useEffect(() => setMounted(true), []); */
	
	const connectWallet = function(){
		window?.$swaptoxConnect?.open();
	};
	
	//const isDark = !mounted;
	const ready = useUIReady();
	
	const $t = useTranslations('Components');
	return (
		<button
			onClick={connectWallet}
			className={`transition-opacity whitespace-nowrap
				h-8 px-4
				flex items-center justify-center 
				rounded-full 
				border border-border-primary 
				text-sm stx-theme-button
				shadow-sm select-none 
				${!ready ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
		`}>
			{$t('connectWallet')}
		</button>
	);
}