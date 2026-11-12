'use client';

import { useEffect, useRef } from 'react';
import './com-modal-body.css';

interface Props {
	open: boolean;
	styles: object;
	onClose: () => void;
	children: React.ReactNode;
}

export default function ComModalBody({ open, styles, onClose, children }: Props) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// 处理全局动作的逻辑 (对应 Lit 的 _handleGlobalAction)
		const handleGlobalAction = (event: Event) => {
			if (!open || !modalRef.current) return;
			
			//console.log(event);

			if (event && (event.type === 'scroll'||event.type === 'click'||event.type === 'touchstart'||event.type==='mousedown')) {
			    // 获取事件冒泡路径 (兼容旧浏览器)
			    const path = event.composedPath ? event.composedPath() : [];
			    // 如果路径中包含了我们的 modalRef 容器，说明点击发生在内部，直接返回
			    if (path.includes(modalRef.current)) {
					//event.stopPropagation();
					
					if(event.type === 'scroll'){
						//event.stopPropagation();
					}
					
					
			        return;
			    }
			}
			
			// 如果点击了外部、滚动了、或者缩放了，触发关闭回调
			onClose();
		};

		if (open) {
			// 延迟 10ms 绑定，防止触发“打开”动作的那个点击事件立即触发“关闭”
			const timer = setTimeout(() => {
				const events = ['click', 'touchstart', 'mousedown', 'scroll', 'resize'];
				events.forEach(ev => window.addEventListener(ev, handleGlobalAction, true));
			}, 10);

			return () => {
				clearTimeout(timer);
				const events = ['click', 'touchstart', 'mousedown', 'scroll', 'resize'];
				events.forEach(ev => window.removeEventListener(ev, handleGlobalAction, true));
			};
		}
	}, [open, onClose]); // 当 open 状态变化时重新绑定/解绑

	return (
		<div 
			ref={modalRef} 
			className={`shadow-md border border-border-modal bg-bg-modal cursor-auto com-modal-body ${open ? 'com-modal-open' : 'com-modal-close'}`}
			style={styles}
		>
			{children}
		</div>
	);
}



