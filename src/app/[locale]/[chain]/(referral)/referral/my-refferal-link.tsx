'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CopyButton from "./copy-button";

import './my-refferal-link.css';


interface RefferalLinkProps {
	account: string;
}



export default function MyRefferalLink({ account }: RefferalLinkProps) {
	// 对应原来的 data
	//const [account, setAccount] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [longLink, setLongLink] = useState(true);
	const [longUrl] = useState('https://app.swaptox.com/');
	const [shortUrl] = useState('https://i.swaptox.com/');
	const [shortLink, setShortLink] = useState('');

	// 模拟生命周期 created
	useEffect(() => {
		
	}, []);

	// 对应 computed 的 getLongUrl 逻辑
	const getLongUrl = (url: string, acc: string) => {
		if (!acc) {
			return url;
		}
		return `${url}?ref=${acc}`;
	};

	const currentDisplayUrl = longLink ? getLongUrl(longUrl, account) : shortLink;

	// 切换长短链接
	const qiehuanLj = (isLong: boolean) => {
		if (!isLong) {
			getShortLink();
			return;
		}
		setLongLink(isLong);
	};

	// 获取短链接逻辑
	const getShortLink = () => {
		if (shortLink) {
			setLongLink(false);
			return;
		}
		if (!account) return;
		setIsLoading(true);

		// 这里你可以换成你的 fetch / axios 请求
		fetch(shortUrl + account, { method: 'POST' })
			.then((res) => res.json())
			.then((data) => {
				if (data?.url) {
					setShortLink(data.url);
					setLongLink(false);
				}
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
			});
	};

	// 复制链接
	const fuzhi = (textToCopy: string) => {
		navigator.clipboard.writeText(textToCopy).then(() => {
			// 对应你的 uni.showToast
			alert('复制成功'); // 临时用 alert 代替，你可以换成你项目的 Toast 组件
		});
	};

	// 连接钱包按钮事件
	const connectWallet = () => {
		window?.$swaptoxConnect?.open();
	};

	const $t = useTranslations('Referral');
	const $c = useTranslations('Components');
	return (
		<div className="my-refferal-body">
			<div className="my-refferal-bottom">
				<div className="h-[28px] flex flex-row items-center rounded-full shadow-[0_0_0_1px_#6ad6cd75] bg-[#f0ffff] dark:shadow-[0_0_0_1px_#34343475] dark:bg-[#1c1c1c]">

					<div
						className={`lianjies-css select-none
							${longLink?'bg-[#02b6a6] cursor-default text-gray-50':'bg-[#02b6a600] cursor-pointer text-text-base'}
						`}
						onClick={() => qiehuanLj(true)}
					>{$t('long-link')}</div>

{/*
					<div
						className={`lianjies-css select-none
							${!longLink?'bg-[#02b6a6] cursor-default text-gray-50':'bg-[#02b6a600] cursor-pointer text-text-base'}
						`}
						onClick={() => qiehuanLj(false)}
					>{$t('short-link')}</div>
*/}

				</div>
			</div>



			{/* 链接文本展示 */}
			<div className="text-text-base" style={{fontSize: '16px', userSelect: 'text', wordBreak: 'break-all' }}>
				{currentDisplayUrl}
			</div>



			{/* 底部说明与复制按钮 */}
			<div style={{ paddingTop: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', columnGap: '10px' }}>
				<div className="select-none text-[#999] dark:text-[#555] text-sm" style={{ flex: 1, wordBreak: 'break-all'}}>
					{$t('both-long-and-short-links-valid')}
				</div>
				<CopyButton text={$t('copy-link')} content={currentDisplayUrl}></CopyButton>
			</div>






			{/* 未登录遮罩层 */}
			{!account && (
				<div className="zhezhao-weidenglu">
					<button onClick={connectWallet} className={`transition-opacity whitespace-nowrap
				h-10 px-5
				flex items-center justify-center 
				rounded-full 
				border border-border-primary 
				text-base stx-theme-button
				shadow-sm select-none cursor-pointer`}>
						{$c('connectWallet')}
					</button>
					<div  className="select-none text-sm" style={{color: '#999'}}
					>{$t('connect-wallet-get-invitation-link')}</div>
				</div>
			)}

		</div>
	);
}