'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/lib/js_sdk/store/ui';

export default function StxUIProvider() {
  const setMounted = useUIStore((s) => s.setMounted);

  useEffect(() => {
    setMounted(true);
  }, []);

  return null;
}