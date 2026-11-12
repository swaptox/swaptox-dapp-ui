'use client';

import { ThemeProvider } from 'next-themes';

export default function StxProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={true}
      // 关键：禁用 next-themes 自动生成的脚本，防止它在切换语言时重复插入
      disableTransitionOnChange 
      enableColorScheme={false}
    >
      {children}
    </ThemeProvider>
  );
}