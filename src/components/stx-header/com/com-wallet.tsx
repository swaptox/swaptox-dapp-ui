'use client';

import { useEffect, useState } from 'react';
import { useSwaptoxConnect } from '@/lib/js_sdk/index';

import ComConnectWalletButton from "./com-connect-wallet-button";
import ComWalletAccount from "./com-wallet-account";

export default function ComWallet() {
	const { connect, isReady } = useSwaptoxConnect();
	const [mounted, setMounted] = useState(false);
	const [isChecking, setIsChecking] = useState(true);
	const [isConnect, setIsConnect] = useState(false);
	
	// 使用 useState 来管理钱包账号和 Logo，这样更新时组件才会正确重新渲染
	const [walletAccount, setWalletAccount] = useState<string>('');
	const [walletLogo, setWalletLogo] = useState<string>('');

	// 1. 确保只在客户端挂载
	useEffect(() => {
		setMounted(true);
	}, []);



	// 2. 自动连接检查 & 注册连接/断开监听
	useEffect(() => {
		if (!isReady || !connect) return;
		
		// 检查自动连接
		async function checkAutoConnect() {
			try {
				const connected = await connect?.autoConnect();
				// 如果 autoConnect 成功，也可以顺便获取当前账号
				if (connected) {
					setIsConnect(true);
					// 可以写在这里
					// const currentAccount = connected.account[0];
					// if (currentAccount) setWalletAccount(currentAccount);
				} else {
					setIsConnect(false);
				}
			} catch (error) {
				console.error("Auto connect failed:", error);
				setIsConnect(false);
			} finally {
				setIsChecking(false);
			}
		}

		// 监听连接成功事件 (connect)
		const handleConnect = (event: any) => {
			//console.log('Wallet connected event:', event);
			const account = event?.accounts?.[0] || event?.account || '';
			const logo = event?.info?.icon || event?.logo || '';
			
			setWalletAccount(account);
			setWalletLogo(logo);
			setIsConnect(true);
		};
		
		// 监听断开连接事件 (disconnect)
		const handleDisconnect = (event: any|null) => {
			//console.log('Wallet disconnected event:', event);
			setIsConnect(false);
			setWalletAccount('');
			setWalletLogo('');
		};
		
		// 监听切换账户事件 (accountsChanged)
		const handleAccountsChanged = (event: any) => {
			const account = event?.[0];
			setWalletAccount(account);
		};
		
		
		// 绑定监听器
		connect.on('connect', handleConnect);
		connect.on('disconnect', handleDisconnect);
		connect.on('accountsChanged', handleAccountsChanged);
		
		
		// 这里延迟是为了保证事件注册成功，如果是同步执行可以不用延迟
		setTimeout(async ()=>{
			await checkAutoConnect();
		}, 1);
		
		
		// 清理函数：组件卸载或 connect 变更时移除监听
		return () => {
			if (connect && typeof connect.off === 'function') {
				connect.off('connect', handleConnect);
				connect.off('disconnect', handleDisconnect);
				connect.off('accountsChanged', handleAccountsChanged);
			}
		};
	}, [isReady, connect]);

	// 服务端渲染或检查中时返回空，避免 hydration 不匹配
	if (!mounted || !isReady || isChecking) {
		return null;
	}

	// 已经连接，显示钱包logo和账户
	if (isConnect) {
		return <ComWalletAccount account={walletAccount} logo={walletLogo} />;
	}

	// 未连接，显示连接按钮
	return <ComConnectWalletButton />;
}