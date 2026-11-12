'use client';

import { useEffect } from 'react';
import { useChainStore } from '@/data/chain/store';

export default function StxOnChainSwitch() {
  useEffect(() => {
    const unsubscribe = useChainStore.subscribe(
		({chain}: any, prev: any) => {
		  if (chain === prev.chain) return;
        console.log('新的:', chain, `旧的：${prev.chain}`);

        // 👉 全局逻辑写这里
        // resetSwap()
        // reloadPools(chain)
      }
    );

    return () => unsubscribe();
  }, []);

  return null;
}