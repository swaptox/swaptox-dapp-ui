import type { Config } from "tailwindcss";


const config : Config = {
	// 必须配置 content，否则样式不会生效
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class", // 支持手动切换深色模式
	theme: {
		extend: {
			fontFamily: {
				// 关键：将你 layout.tsx 里的变量映射到 font-sans"var(--font-work-sans)", 
				//sans: ["Inter", "system-ui", "sans-serif"],
				//sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
				//mono: ['JetBrains Mono', 'monospace'],
				// 覆盖默认的 sans 字体栈
				sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
				mono: ['var(--font-mono)', 'monospace'],// 覆盖默认的 mono 字体栈
			},
			// 为 SwaptoX 预设一些 DeFi 风格的颜色
			colors: {
				bg: {
					base: 'var(--color-bg-base)',
					primary: 'var(--color-bg-primary)',
					modal: 'var(--color-bg-modal)',
					select: 'var(--color-bg-select)',
					theme: 'var(--color-bg-theme)',
					
					
					'dark-primary': 'var(--color-bg-dark-primary)'
				},
				text: {
					base: 'var(--color-text-base)',
					primary: 'var(--color-text-primary)',
					dark: 'var(--color-text-dark)',
				},
				border: {
					base: 'var(--color-border-base)',
					primary: 'var(--color-border-primary)',
					hover: 'var(--color-border-hover)',
					'divider-line': 'var(--color-border-divider-line)',
					modal: 'var(--color-border-modal)',
					select: 'var(--color-border-select)',
				},
			}
		},
	},
	plugins: [],
};

export default config;