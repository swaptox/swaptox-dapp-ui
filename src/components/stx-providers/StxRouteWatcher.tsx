'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/lib/js_sdk/store/ui';



export default function StxRouteWatcher() {
  const pathname = usePathname();
  const setRouting = useUIStore((s) => s.setRouting);

  useEffect(() => {
   setRouting(true);
	
	const timer = setTimeout(() => {
      setRouting(false);
    }, 300); // ⚠️ 可调

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}