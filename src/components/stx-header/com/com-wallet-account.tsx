'use client';

import { useEffect, useState } from 'react';
//import { useTheme } from "next-themes";
//import { Sun, Moon } from 'lucide-react';
import { useUIReady } from '@/lib/js_sdk/index';

import './com.css';


interface StxAccountProps {
	account: string;
	logo: string;
}



export default function ComWalletAccount({account, logo}: StxAccountProps) {
	//const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	
	// 等待客户端挂载完成
	useEffect(() => setMounted(true), []);
	
	
	const onTapAccount = function(){
		//window?.$swaptoxWidget?.$el?.openWallet();
		document.querySelector('swaptox-wallet')?.open();
	};
	
	
	
	
	const walletLogo = logo;;
	const accountBefore = account?account.slice(0, 6):'';
	const accountAfter = account?account.slice(-4):'';
	
	const ready = useUIReady();
	

	return (
		<div
			onClick={onTapAccount}
			className={`transition-opacity
				relative
				cursor-pointer 
				px-3 h-8 
				flex items-center justify-center gap-1 
				rounded-full 
				border border-border-primary 
				bg-bg-base 
				shadow-sm 
				stx-header-element-hover
				${!ready ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
			`}
		>
			
			{walletLogo && (
			    <img
			    	draggable="false"
			    	width="18" 
			    	height="18" 
			    	style={{maxWidth: '18px',minWidth: '18px'}}
			    	src={walletLogo}
			    	className="select-none"
			    />
			)}
			
			{!walletLogo && (
			    <svg className="fill-[#1e2939] dark:fill-[#fff]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32394" width="20" height="20" data-spm-anchor-id="a313x.search_index.0.i22.143f3a812Jo4D0"><path d="M911.7696 731.8528h-209.408a146.4832 146.4832 0 0 1 0-292.9664h209.408a30.72 30.72 0 0 1 30.72 30.72v231.5264a30.72 30.72 0 0 1-30.72 30.72z m-209.408-231.5264a85.0432 85.0432 0 0 0 0 170.0864h178.688V500.3264z" p-id="32395"></path><path d="M711.424 585.3696m-37.7344 0a37.7344 37.7344 0 1 0 75.4688 0 37.7344 37.7344 0 1 0-75.4688 0Z" fill="#ffffff00" p-id="32396" data-spm-anchor-id="a313x.search_index.0.i24.143f3a812Jo4D0"></path><path d="M781.9776 245.76l-86.7328-131.1232A110.848 110.848 0 0 0 547.84 79.6672L258.304 245.76h-23.7568a165.7856 165.7856 0 0 0-165.632 165.5296v348.16a165.7856 165.7856 0 0 0 165.632 165.632h542.3104a165.7856 165.7856 0 0 0 165.632-165.632v-348.16A165.7856 165.7856 0 0 0 781.9776 245.76zM578.56 133.12a49.2544 49.2544 0 0 1 65.4336 15.36l64.2048 97.28H381.9008z m302.4896 626.5344a104.2944 104.2944 0 0 1-104.192 104.192H234.5472a104.2944 104.2944 0 0 1-104.192-104.192v-348.16A104.2944 104.2944 0 0 1 234.5472 307.2h542.3104a104.2944 104.2944 0 0 1 104.192 104.192z" p-id="32397"></path></svg>
			)}
			
			
			<div className="flex items-center">
				<span className="text-sm font-sans text-text-base select-none whitespace-nowrap stx-account-before-hide-id1080"
				>{accountBefore}</span>
				<span className="text-sm font-sans text-text-base select-none whitespace-nowrap"
				>...{accountAfter}</span>
			</div>
			
		</div>
	);
}