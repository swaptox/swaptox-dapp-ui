'use client';
import { useEffect, useState } from 'react';
import { isAddress } from 'viem';




export function useSwaptoxWidget() {
    const [widget, setWidget] = useState<any | null>(
        () => typeof window !== 'undefined' ? window.$swaptoxWidget ?? null : null
    );

    useEffect(() => {
        // 如果挂载时已经存在，直接赋值
        if (window.$swaptoxWidget && !widget) {
            setWidget(window.$swaptoxWidget);
        }

        const handleReady = (event: Event) => {
            const customEvent = event as CustomEvent<any>;
            const instance = customEvent.detail ?? window.$swaptoxWidget;
            if (instance) {
                setWidget(instance);
            }
        };

        window.addEventListener('swaptox-widget-ready', handleReady);
        return () => {
            window.removeEventListener('swaptox-widget-ready', handleReady);
        };
    }, [widget]);

    return {
        widget,
        isReady: !!widget,
    };
}






interface StxWidgetProps {
	chain: string;
	theme: string;
	lang: string;
}

export default function SwaptoxWidgetProvider({ chain, theme, lang }: StxWidgetProps) {

	const customTheme = theme==='dark'?'dark':'stxui';

	useEffect(() => {
		let disposed = false;
		let invite_ref:any = {};
	
		async function initWidget() {
			
			try {
			    const inviteRef = localStorage.getItem('invite_ref');
			    if (inviteRef&&isAddress(inviteRef)) {
			        invite_ref.referral = inviteRef;
			    }
			} catch (e) {}
			
			try {
				
				//const { createWidget } = (await import('@swaptox/widget')) as any;
				const { createWidget } = await import('@swaptox/widget');
	
				if (disposed) return;
	
				// 如果全局已经存在实例，则直接复用并同步更新最新的配置参数
				if (window?.$swaptoxWidget) {
					window.$swaptoxWidget.setChain?.(chain);
					window.$swaptoxWidget.setLang?.(lang);
					window.$swaptoxWidget.setTheme?.(customTheme);
					return;
				}
	
				// 创建全局唯一的 Widget 实例
				createWidget({
					...invite_ref,
					chain,
					lang,
					theme: customTheme,
					slippagLayout: 'bottom',
					swapButton: false,
					disabledHistoryIcon: true,
					disabledChooseRoute: true,
					smallScreenCardFull: true,
				});
				
				// 在其他地方挂载
				// const targetContainer = document.querySelector('.swap-container');
				// targetContainer.appendChild(window.$swaptoxWidget.$el);
	
			} catch (error) {
				if (!disposed) {
					console.error('[SwaptoX Widget] Initialization failed:', error);
				}
			}
		}
	
		initWidget();
	
		return () => {
			disposed = true;
		};
	}, []); // 仅在初次加载时初始化
	
	// 监听后续的 chain / theme / lang 属性变化，实时同步给全局实例
	useEffect(() => {
		if (window?.$swaptoxWidget) {
			window?.$swaptoxWidget?.setChain?.(chain);
			window?.$swaptoxWidget?.setLang?.(lang);
			window?.$swaptoxWidget?.setTheme?.(customTheme);
		}
	}, [chain, theme, lang]);

	return null;
}

