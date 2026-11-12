'use client';

import { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import { Sun, Moon } from 'lucide-react';
import { useUIReady } from '@/lib/js_sdk/index';
interface StxThemeActionProps {
	initialTheme: string;//'light' | 'dark';
}


export default function StxThemeAction({ initialTheme }: StxThemeActionProps) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	
	// 等待客户端挂载完成
	useEffect(() => setMounted(true), []);
	
	const setThemeTo = (t: 'light' | 'dark') => {
		setTheme(t);
		const root = document.documentElement;
		if (t === 'dark') root.classList.add('dark');
		else root.classList.remove('dark');
		document.cookie = `theme=${t}; path=/; max-age=31536000; SameSite=Lax`;
		window?.$swaptoxConnect?.setTheme(t);
		window?.$swaptoxWidget?.setTheme(t==='dark'?'dark':'stxui');
	};
	
	
	
	const isDark = !mounted?(initialTheme === "dark"):(theme === "dark");
	const ready = useUIReady();
	

	return (
		<div
			onClick={() => setThemeTo(isDark ? "light" : "dark")}
			className={`transition-opacity
				w-8 h-8 
				flex items-center justify-center 
				rounded-xl 
				border border-border-primary 
				bg-bg-base  
				shadow-sm stx-header-element-hover
				${!ready ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
			`}>
			{isDark ? (
				/* 月亮图标 (Dark Mode) */
				<Moon size={18} color="var(--color-text-base, #52525c)" strokeWidth={1.6} />
			) : (
				/* 太阳图标 (Light Mode) */
				<Sun size={18} color="var(--color-text-base, #52525c)" strokeWidth={1.6} />
			)}
		</div>
	);
}