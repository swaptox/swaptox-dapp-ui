"use client";

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import StxLogo from "@/components/stx-logo/stx-logo";
import StxName from "@/components/stx-name/stx-name";
import StxIconClose from '@/components/stx-icon/stx-icon-close';
import styles from "./stx-left-nav.module.css";
import { navItems } from '@/data/navItem';



interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const disableScroll = `
body {
	touch-action: none;
	overflow: hidden;
	overscroll-behavior: contain;
}`;


export default function StxLeftNav({ isOpen, onClose }: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const pathname = usePathname(); // 获取当前路径，例如 /en/eth 或 /en/eth/referral

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);
	
	const $t = useTranslations('Components');

	// 辅助函数：判断某个导航链接是否与当前 pathname 匹配
	// 首页规则：/[locale]/[chain] （即路径分割后只有两段，如 ["", "en", "eth"]）
	// 其他页面规则：路径中包含该 href，或者以其结尾
	const checkIfActive = (href?: string) => {
		if (!href) return false;
		
		const segments = pathname.split('/').filter(Boolean); // 过滤空字符串
		
		if (href === "/") {
			// 如果是首页，当路径只有 [locale] 和 [chain] 共 2 段时判定为首页选中
			return segments.length === 2;
		}

		// 对于其他子路径，检查当前路径是否包含或匹配该 href
		return pathname.includes(href);
	};

	return (
		<dialog
			ref={dialogRef}
			className={styles.navDialog}
			onClose={onClose}
			onClick={(e) => {
				if (e.target === dialogRef.current) onClose();
			}}
		>
			{isOpen && <style>{disableScroll}</style>}
			
			{/* 顶部 Logo 与关闭按钮 */}
			<div 
				style={{ padding: '0 15px 0 10px', columnGap: '6px' }} 
				className="relative h-[60px] border-b border-border-divider-line sticky top-0 z-50 bg-bg-dark-primary flex items-center"
			>
				<StxLogo />
				<StxName />
				
				<div className="absolute top-4 right-4 text-gray-400">
					<StxIconClose onClose={onClose} />
				</div>
			</div>
			
			{/* 导航列表区 */}
			<nav className={`${styles.navContainer} flex flex-col py-3 px-3 gap-2 overflow-y-auto`}>
				{navItems.map((item) => {
					const hasChildren = item.children && item.children.length > 0;
					const isActive = checkIfActive(item.href) || (hasChildren && item.children?.some(sub => checkIfActive(sub.href)));

					return (
						<div key={item.id} className="flex flex-col">
							{/* 一级菜单项 */}
							<div
								onClick={() => {
									if (item.href) {
										// 如果有跳转链接，可结合 router 进行跳转
										window.location.href = item.href;
									}
								}}
								className={`
									relative flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-all
									${isActive && !hasChildren ? 'bg-[#02b6a61a] text-[#02b6a6] font-medium cursor-default' : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200'}
								`}
							>
								<div className="flex items-center gap-3 text-sm select-none">
									{/* 图标渲染逻辑：优先 icon，其次 img */}
									{item.icon ? (
										<span className="flex items-center justify-center w-4 h-4">{item.icon}</span>
									) : item.img ? (
										<img src={item.img} alt="" className="w-4 h-4 object-contain" />
									) : null}

									<span>{$t(item.label)}</span>
								</div>

								{/* 右上角标签 (tag) */}
								{item.tag && (
									<span className="absolute right-3 text-[10px] font-bold text-red-500 select-none pointer-events-none">
										{item.tag}
									</span>
								)}

								{/* 如果有二级菜单，展示下拉箭头 */}
								{hasChildren && (
									<svg 
										className="w-4 h-4 transition-transform duration-200" 
										fill="none" 
										stroke="currentColor" 
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								)}
							</div>

							{/* 二级菜单列表 */}
							{hasChildren && (
								<div className="flex flex-col pl-3 mt-1 space-y-1 border-l border-gray-200 dark:border-zinc-800 ml-4">
									{item.children?.map((subItem) => {
										const isSubActive = checkIfActive(subItem.href);
										return (
											<a
												key={subItem.id}
												href={subItem.href}
												className={`
													relative flex items-center justify-between py-2 px-3 rounded-md text-sm transition-colors select-none
													${isSubActive 
														? 'text-[#02b6a6] bg-[#02b6a610] font-medium cursor-default' 
														: 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800'}
												`}
											>
												<div className="flex items-center gap-2">
													{subItem.icon ? (
														<span className="flex items-center justify-center w-3.5 h-3.5">{subItem.icon}</span>
													) : subItem.img ? (
														<img src={subItem.img} alt="" className="w-3.5 h-3.5 object-contain" />
													) : null}
													<span>{$t(subItem.label)}</span>
												</div>

												{/* 二级菜单项右上角标签 (tag) */}
												{subItem.tag && (
													<span className="text-[10px] font-bold text-red-500 select-none pointer-events-none">
														{subItem.tag}
													</span>
												)}
											</a>
										);
									})}
								</div>
							)}
						</div>
					);
				})}
			</nav>
		</dialog>
	);
}