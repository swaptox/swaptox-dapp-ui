"use client";

import { useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
// 假设你的数据从这里导入，格式与之前一致
import { navItems } from '@/data/navItem'; 

export default function ComDesktopNav() {
	const pathname = usePathname();
	// 记录当前鼠标悬停展开二级菜单的 id
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const $t = useTranslations('Components');

	// 辅助函数：判断某个链接是否高亮
	const checkIfActive = (href?: string) => {
		if (!href) return false;
		const segments = pathname.split('/').filter(Boolean);
		
		if (href === "/") {
			// 首页：路径只有 [locale] 和 [chain] 共 2 段
			return segments.length === 2;
		}
		return pathname.includes(href);
	};

	return (
		<nav className="flex items-center space-x-2 lg:space-x-4">
			{navItems.map((item) => {
				const hasChildren = item.children && item.children.length > 0;
				// 判断自身或者子菜单是否有处于激活状态的
				const isItemActive = checkIfActive(item.href) || 
					(hasChildren && item.children?.some(sub => checkIfActive(sub.href)));
				const isHovered = hoveredId === item.id;

				return (
					<div
						key={item.id}
						className="relative py-2"
						onMouseEnter={() => setHoveredId(item.id)}
						onMouseLeave={() => setHoveredId(null)}
					>
						{/* 一级导航项 */}
						{item.href && !hasChildren ? (
							<Link
								href={item.href}
								className={`
									relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors select-none
									${isItemActive 
										? 'text-[#02b6a6] bg-[#02b6a610] cursor-default' 
										: 'text-gray-700 dark:text-gray-200 hover:text-[#02b6a6] hover:bg-[#02b6a610] dark:hover:bg-zinc-800'}
								`}
							>
								{item.icon ? (
									<span className="w-4 h-4 flex items-center justify-center">{item.icon}</span>
								) : item.img ? (
									<img src={item.img} alt="" className="w-4 h-4 object-contain" />
								) : null}

								<span>{$t(item.label)}</span>

								{/* 标签 */}
								{item.tag && (
									<span className="absolute right-1 top-1 text-[9px] font-bold text-red-500 pointer-events-none">
										{item.tag}
									</span>
								)}
							</Link>
						) : (
							<div
								className={`
									relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors select-none
									${isItemActive || isHovered
										? 'text-[#02b6a6] bg-[#02b6a610]' 
										: 'text-gray-700 dark:text-gray-200 hover:text-[#02b6a6] hover:bg-gray-100 dark:hover:bg-zinc-800'}
								`}
							>
								{item.icon ? (
									<span className="w-4 h-4 flex items-center justify-center">{item.icon}</span>
								) : item.img ? (
									<img src={item.img} alt="" className="w-4 h-4 object-contain" />
								) : null}

								<span>{$t(item.label)}</span>

								{/* 下拉小箭头 */}
								{hasChildren && (
									<svg 
										className={`w-3.5 h-3.5 transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`} 
										fill="none" 
										stroke="currentColor" 
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								)}

								{/* 标签 */}
								{item.tag && (
									<span className="absolute right-2 top-1 text-[9px] font-bold text-red-500 pointer-events-none">
										{item.tag}
									</span>
								)}
							</div>
						)}

						{/* 二级菜单下拉浮层 */}
						{hasChildren && isHovered && (
							<div className="absolute top-full left-0 pt-1 w-48 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
								<div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg p-1.5 flex flex-col gap-1">
									{item.children?.map((subItem) => {
										const isSubActive = checkIfActive(subItem.href);
										return (
											<Link
												key={subItem.id}
												href={subItem.href}
												className={`
													relative flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors select-none
													${isSubActive 
														? 'text-[#02b6a6] bg-[#02b6a610] font-medium cursor-default' 
														: 'text-gray-600 dark:text-gray-300 hover:text-[#02b6a6] hover:bg-gray-50 dark:hover:bg-zinc-800'}
												`}
											>
												<div className="flex items-center gap-2">
													{subItem.icon ? (
														<span className="w-3.5 h-3.5 flex items-center justify-center">{subItem.icon}</span>
													) : subItem.img ? (
														<img src={subItem.img} alt="" className="w-3.5 h-3.5 object-contain" />
													) : null}
													<span>{$t(subItem.label)}</span>
												</div>

												{/* 二级菜单标签 */}
												{subItem.tag && (
													<span className="text-[9px] font-bold text-red-500 pointer-events-none">
														{subItem.tag}
													</span>
												)}
											</Link>
										);
									})}
								</div>
							</div>
						)}
					</div>
				);
			})}
		</nav>
	);
}