'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { isAddress } from 'viem';

export default function RefTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref&&isAddress(ref)) {
      // 缓存到本地 localStorage
      localStorage.setItem('invite_ref', ref);
      // 如果需要，也可以同步存入 cookie 方便后端读取
      document.cookie = `invite_ref=${ref}; path=/; max-age=86400 * 30`; 
    }
  }, [searchParams]);

  return null; // 这是一个纯逻辑组件，不渲染任何UI
}