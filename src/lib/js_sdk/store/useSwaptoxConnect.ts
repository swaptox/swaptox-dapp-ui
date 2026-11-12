'use client';

import { useEffect, useState } from 'react';

import { SwaptoxConnectInstance } from '@swaptox/connect-ui';

/* declare global {
    interface Window {
        $swaptoxConnect?: SwaptoxConnectInstance;
    }
} */


type SwaptoxConnect = SwaptoxConnectInstance;//Record<string, unknown>;

interface UseSwaptoxConnectOptions {
    onReady?: (connect: SwaptoxConnect) => void;
    onDestroy?: () => void;
}

export function useSwaptoxConnect(options?: UseSwaptoxConnectOptions) {
    const [connect, setConnect] = useState<SwaptoxConnect | null>(
        () => typeof window !== 'undefined'
            ? window.$swaptoxConnect ?? null
            : null
    );

    useEffect(() => {
        const handleReady = (event: Event) => {
            const customEvent = event as CustomEvent<SwaptoxConnect>;

            const instance = customEvent.detail
                ?? window.$swaptoxConnect;

            if (!instance) return;

            setConnect(instance);
            options?.onReady?.(instance);
        };

        const handleDestroy = () => {
            setConnect(null);
            options?.onDestroy?.();
        };

        // 先监听事件，避免检查和注册之间出现事件遗漏
        window.addEventListener('swaptox-connect-ready', handleReady);
        window.addEventListener('swaptox-connect-destroy', handleDestroy);

        // 再检查 SDK 是否已经加载
        if (window.$swaptoxConnect) {
            setConnect(window.$swaptoxConnect);
        }

        return () => {
            window.removeEventListener('swaptox-connect-ready', handleReady);
            window.removeEventListener('swaptox-connect-destroy', handleDestroy);
        };
    }, []);

    return {
        connect,
        isReady: !!connect,
    };
}