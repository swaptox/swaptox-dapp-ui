import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { getTranslations, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
//import { notFound } from 'next/navigation';
import { Suspense } from 'react';
//import Script from 'next/script';
import { cookies } from 'next/headers';
//import { redirect } from 'next/navigation';
//import { useEffect } from 'react';

import StxHeader from "@/components/stx-header/stx-header";
import StxFooter from "@/components/stx-footer/stx-footer";
//import StxProviders from "@/components/stx-providers/stx-providers";

import StxRouteWatcher from "@/components/stx-providers/StxRouteWatcher";
import StxUIProvider from "@/components/stx-providers/StxUIProvider";
import StxConnectProvider from '@/components/stx-providers/stx-connect-provider';
//import StxWidgetProvider from '@/components/stx-providers/stx-widget-provider';

import SwaptoxWidgetProvider from '@/components/stx-providers/swaptox-widget-provider';

import RefTracker from '@/components/stx-providers/RefTracker';

import { supported, defaultLang, languages } from '@/data/locale/config';
//import { defaultChain } from '@/data/chain/chains';
//import { chainsMap } from '@/data/chain/chains';
//import { useChainStore } from '@/data/chain/store';


import "../../globals.css";


// 配置正文字体
const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

// 配置等宽字体
const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-mono',
});




export async function generateMetadata({ params }: {
	params: Promise<{ locale: string; chain: string }>;
}) {
	const { locale, chain } = await params;
	const localeKey = locale.toLowerCase();
	const canonicalLocale = localeKey === 'zh-cn'
		? 'zh-Hans'
		: localeKey === 'zh-hk' || localeKey === 'zh-tw'
			? 'zh-Hant'
			: locale;
	const languageAlternates = Object.fromEntries(
		Object.entries(languages).map(([language, path]) => [
			language,
			`https://app.swaptox.com${path}/${chain}`,
		])
	);
	const t = await getTranslations({ locale, namespace: 'Metadata' });
	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		alternates: {
			canonical: `https://app.swaptox.com/${canonicalLocale}/${chain}`,
			languages: languageAlternates,
		},
		icons: {
			icon: "/favicon.ico",
		},
	};
}










export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
	params: Promise<{ locale: string; chain: string }>;
}) {
    
    const { locale, chain } = await params;
	const currLocale = supported.includes(locale as any)
		? locale
		: defaultLang;
	
	//console.log('==============',locale, chain);
	
	
	//if (chainObj.chain !== normalized) {
	    //redirect(`/${currLocale}/${chainObj.chain}`);
		//return <div />;
	//}
	
	
	



	
	

	//console.log('==============',locale, chain);
	
	
    const messages = await getMessages({ locale: currLocale });
	const cookieStore = await cookies();
	const theme = cookieStore.get('theme')?.value||'';
	
	

	/* useEffect(() => {
		//当前链
		const setChain = useChainStore((s) => s.setChain);
		const normalized = chain.toLowerCase();
		if(normalized in chainsMap){
			setChain(normalized);
		}else{
			console.error('==============数据错误',locale, chain, normalized);
		}	
	
	}, []); */
	//<StxWidgetProvider chain={chain} theme={theme} lang={currLocale} />
    return (
        <html
            lang={currLocale}
            className={`${theme === 'dark' ? 'dark' : ''} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased scrollbar-hide`}
            suppressHydrationWarning
        >
			<body className="min-h-full font-sans">
			
                <Suspense fallback={null}>
					<RefTracker />
					<StxUIProvider />
					<StxRouteWatcher />
					<StxConnectProvider chain={chain} theme={theme} lang={currLocale} />
					<SwaptoxWidgetProvider chain={chain} theme={theme} lang={currLocale} />
				</Suspense>
				
                <ThemeProvider
					attribute="class" 
					defaultTheme="light" 
					enableSystem={true}
					disableTransitionOnChange 
					enableColorScheme={false}
                >
                    <NextIntlClientProvider messages={messages} locale={currLocale}>
                        <StxHeader chain={chain} theme={theme} lang={currLocale} /> 
                        <main className="page-main-size page-width-body bg-bg-base">
                            {children}
                        </main>
                        <StxFooter />
                    </NextIntlClientProvider>
                </ThemeProvider>
				
                
				
            </body>
        </html>
    );
}

/* <Script
                    src="/mini-sdk/swaptox-mini-sdk.js" 
                    strategy="afterInteractive" 
                /> */
