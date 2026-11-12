'use client';

import { useEffect, useRef } from 'react';
import { useSwaptoxWidget } from '@/components/stx-providers/swaptox-widget-provider';



export default function StxSwapCard() {
	const containerRef = useRef<HTMLDivElement>(null);
	const isMountedRef = useRef<boolean>(false); // 标记是否已经挂载过
	const { widget, isReady } = useSwaptoxWidget();

	// 挂载 SDK 的 UI 元素到 DOM 容器中
	useEffect(() => {
		const container = containerRef.current;
		
		// 如果容器不存在、SDK 未就绪、或者已经挂载过了，则直接返回
		if (!container || !isReady || !widget || isMountedRef.current) return;

		// 安全检查：如果容器内已经有元素了，先清空或跳过，防止重复 append
		if (container.children.length === 0 && widget.$el) {
			container.appendChild(widget.$el);
			isMountedRef.current = true; // 标记已挂载
		}
	}, [widget, isReady]);

	return (
		<div
			ref={containerRef} 
			className="w-full max-w-[420px] min-w-[320px] sticky top-[90px] 
					 max-[960px]:relative max-[960px]:top-0 
					 max-sm:w-full max-sm:min-w-full max-sm:rounded-none"
		/>
	);
}



