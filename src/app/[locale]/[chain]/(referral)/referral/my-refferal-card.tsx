'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSwaptoxConnect } from '@/lib/js_sdk/index';

import MyRefferalLink from "./my-refferal-link";

import './my-refferal-card.css';

export default function MyRefferalCard() {
	const { connect, isReady } = useSwaptoxConnect();
	const [countOf, setCountOf] = useState('--');
	const [walletAccount, setWalletAccount] = useState<string>('');
	
	// ✅ 所有 Hook 必须在最前面声明，绝对不能写在 return 的后面！
	const $t = useTranslations('Referral');
	
	// 2. 自动连接检查 & 注册连接/断开监听
	useEffect(() => {
		if (!isReady || !connect) return;
		
		const state = connect.getState();
		if(state.accounts && state.accounts.length > 0){
			setWalletAccount(state.accounts[0]);
		}
	}, [isReady, connect]);

	// 模拟异步加载
	useEffect(() => {
		if (!isReady) return;
		const timer = setTimeout(() => {
			setCountOf('0');
		}, 1000);
		return () => clearTimeout(timer);
	}, [isReady]);
	
	// ❌ 错误：如果把 return 写在 Hook 下方，就可以完美规避顺序错乱问题
	if (!isReady) {
		return null;
	}
	
	

	return (
		<div className="app-card-theme-style pagesd-dfs">
			<div className="app-card-title">{$t('my-refferal-link')}</div>
			<div style={{height:'10px'}}></div>
			
			<MyRefferalLink account={walletAccount}></MyRefferalLink>
			
			<div style={{height:'15px'}}></div>
			
			<div className="com-flex-con2323 h-[42px]">
				<div className="select-none whitespace-nowrap leading-4 text-sm text-[#999] dark:text-[#555]" style={{paddingLeft:'6px'}}
				>{$t('number-invited-friends')}</div>
				
				<div className="select-none whitespace-nowrap leading-4 text-sm text-[#02b6a6] dark:text-[#00e0cc]" style={{paddingRight:'5px'}}
				>{countOf}</div>
			</div>
			
			<div style={{paddingTop: '10px',paddingRight:'12px',paddingLeft:'12px'}}>
				<span className="shuomings-p1 select-none">{$t('invite-friends-permanently')}</span>
			</div>
			<div style={{paddingTop: '5px',paddingRight:'12px',paddingLeft:'12px'}}>
				<span className="shuomings-p1 select-none">{$t('note-current-swaptorx-promotion')}</span>
			</div>
		</div>
	);
}







/*
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSwaptoxConnect } from '@/lib/js_sdk/index';

import MyRefferalLink from "./my-refferal-link";

import './my-refferal-card.css';



export default function MyRefferalCard() {
	const { connect, isReady } = useSwaptoxConnect();
	//const [mounted, setMounted] = useState(false);
	const [countOf, setCountOf] = useState('--');
	const [walletAccount, setWalletAccount] = useState<string>('');
	
	
	
	// 1. 确保只在客户端挂载
	useEffect(() => {
		//setMounted(true);
	}, []);
	
	
	
	// 2. 自动连接检查 & 注册连接/断开监听
	useEffect(() => {
		if (!isReady || !connect) return;
		
		const state = connect.getState();
		if(state.accounts&&state.accounts.length>0){
			setWalletAccount(state.accounts[0]);
		}
		
		//return () => {};
	}, [isReady, connect]);
	
	
	if (!isReady) {
		return null;
	}
	
	
	
	
	
	
	
	setTimeout(()=>{
		setCountOf('0');
	}, 1000);
	
	

	const $t = useTranslations('Referral');
	return (
		<div className="app-card-theme-style pagesd-dfs">
			
			<div className="app-card-title">{$t('my-refferal-link')}</div>
			<div style={{height:'10px'}}></div>
			
			<MyRefferalLink account={walletAccount}></MyRefferalLink>
			
			<div style={{height:'15px'}}></div>
			
			
			
			<div className="com-flex-con2323 h-[42px]">
				
				<div className="select-none whitespace-nowrap leading-4 text-sm select-none text-[#999] dark:text-[#555]" style={{paddingLeft:'6px'}}
				>{$t('number-invited-friends')}</div>
				
				<div className="select-none whitespace-nowrap leading-4 text-sm text-[#02b6a6] dark:text-[#00e0cc]" style={{paddingRight:'5px'}}
				>{countOf}</div>
				
			</div>
			
			
			
			<div style={{paddingTop: '10px',paddingRight:'12px',paddingLeft:'12px'}}>
				<span className="shuomings-p1 select-none">{$t('invite-friends-permanently')}</span>
			</div>
			<div style={{paddingTop: '5px',paddingRight:'12px',paddingLeft:'12px'}}>
				<span className="shuomings-p1 select-none">{$t('note-current-swaptorx-promotion')}</span>
			</div>


			
		</div>
	);
}

*/