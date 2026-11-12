import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { supported, defaultLang } from '@/data/locale/config';
//import { defaultChain, chainsMap } from '@/data/chain/chains';
import { detectChain, isChain } from '@/data/chain/detectChain';





export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
	]
};



const intlMiddleware = createMiddleware({
	locales: supported,
	defaultLocale: defaultLang,
	localePrefix: 'always',
	localeDetection: false
});




// 预处理模糊匹配 Map: { "zh": "zh-CN" }
const baseLangsMap: Record<string, string> = {};
// 预处理 Map 提高性能
const langsMap: Record<string, string> = {};
for (let i = 0; i < supported.length; i++) {
	const myLang = supported[i];
	langsMap[myLang.toLowerCase()] = myLang;
	// 模糊匹配数据
	if (myLang.indexOf('-') != -1) {
		const base = myLang.split('-')[0];
		if(!baseLangsMap[base.toLowerCase()]){//避免优先级问题，存在则不覆盖
			baseLangsMap[base.toLowerCase()] = myLang;
		}
	}else{
		baseLangsMap[myLang.toLowerCase()] = myLang;
	}
}

//console.log('精准匹配语言', langsMap);
//console.log('模糊匹配语言', baseLangsMap);




function fuzzyMatchingLocale(lang : string) {
	return baseLangsMap[lang.toLowerCase()];
}

function isLocale(lang: string): boolean {
  return !!langsMap[lang.toLowerCase()];
}
function detectLocale(req : any, segments : any) {

	if (segments.length > 0) {
		if (isLocale(segments[0])) {
			return langsMap[segments[0].toLowerCase()]; //URL自带语言
		}
		let urlLang = segments[0];
		if (urlLang.indexOf('-') != -1) {
			const base = urlLang.split('-')[0];
			if (isLocale(base)) return langsMap[base.toLowerCase()];
			const fuzzy = fuzzyMatchingLocale(base);
			if (fuzzy) return fuzzy;
		}else{
			const fuzzy = fuzzyMatchingLocale(urlLang);
			if (fuzzy) return fuzzy;
		}
	}

	// 👉 1. cookie（用户选择）
	const cookieLocale = req?.cookies?.get('locale')?.value;
	if (cookieLocale && isLocale(cookieLocale)) {
		return langsMap[cookieLocale.toLowerCase()];
	}

	// 👉 2. 浏览器语言
	const acceptLang = req?.headers?.get('accept-language');

	if (acceptLang) {
		const langs = acceptLang
			.split(',')
			.map((l : string) => l.split(';')[0].toLowerCase());

		for (const lang of langs) {
			// 精确匹配
			if (isLocale(lang)) return langsMap[lang.toLowerCase()];

			// 模糊匹配（en-US → en）
			const base = lang.split('-')[0];
			if (isLocale(base)) return langsMap[base.toLowerCase()];

			const fuzzy = fuzzyMatchingLocale(base);
			if (fuzzy) return fuzzy;
		}
	}

	// 👉 3. fallback
	return defaultLang;
}



/* function isChain(chain : string) : chain is keyof typeof chainsMap {
	const newChain = chain.toLowerCase();
	return newChain in chainsMap;
}

function detectChain(req: any, segments: string[]) {
  // 👉 先找标准位置
  if (segments.length > 1 && isChain(segments[1])) {
    return segments[1].toLowerCase();
  }

  // 👉 用户省略 locale
  if (segments.length > 0 && isChain(segments[0])) {
    return segments[0].toLowerCase();
  }

  const cookieChain = req?.cookies?.get('chain')?.value;
  if (cookieChain && isChain(cookieChain)) {
    return cookieChain.toLowerCase();
  }

  return defaultChain;
}
 */




function resolveRoute(req : any, segments : string[]) {
	let locale = detectLocale(req, segments);
	let chain = detectChain(req?.cookies, segments);
	let rest : string[] = [];

	if (segments.length > 0) {
		const seg0 = segments[0];

		if (isLocale(seg0)) {
			
			locale = seg0;
			if (segments.length > 1 && isChain(segments[1])) {
			    chain = segments[1].toLowerCase();
			    rest = segments.slice(2);
			} else {
			    rest = segments.slice(1);
			}
			
		} else if (isChain(seg0)) {
			
			chain = seg0.toLowerCase();
			rest = segments.slice(1);

		} else {
			
			//第一位肯定不是chain，但第二位有可能是chain，第一位输错的情况
			if (segments.length > 1 && isChain(segments[1])) {
			    rest = segments.slice(2);
			} else {
			    rest = segments;
			}
			
		}
	}

	return { 'locale': langsMap[locale.toLowerCase()], chain, rest };
}


export default function proxy(req: any) {

	const url = req.nextUrl.clone();
	const segments = url.pathname.split('/').filter(Boolean);

	const { locale, chain, rest } = resolveRoute(req, segments);
	const newPath = `/${locale}/${chain}${rest.length ? '/' + rest.join('/') : ''}`;

	if (url.pathname === newPath) {//既然路径大小写敏感，如zh-CN不能等于zh-cn,就应该严格匹配
		return intlMiddleware(req);
	}

	url.pathname = newPath;
	return NextResponse.redirect(url);
}

//import { NextResponse } from 'next/server';

/* export default function proxy(req: any) {
    const url = req.nextUrl.clone();
    const segments = url.pathname.split('/').filter(Boolean);

    const { locale, chain, rest } = resolveRoute(req, segments);
    const newPath = `/${locale}/${chain}${rest.length ? '/' + rest.join('/') : ''}`;


    // 如果路径已经正确，直接运行 intlMiddleware
    if (url.pathname === newPath) {
		const response = intlMiddleware(req);
		
		// 👉 有跳转 / rewrite → 必须原样返回
		if (
		    response.headers.get('location') ||
		    response.headers.get('x-middleware-rewrite')
		) {
		    return response;
		}
		
		// 👉 没有控制流 → 你接管
		const requestHeaders = new Headers(req.headers);
		requestHeaders.set('x-pathname', newPath);
		
		return NextResponse.next({
		    request: {
				headers: requestHeaders,
		    },
		});
    }

    // 路径不匹配，重定向
    url.pathname = newPath;
    return NextResponse.redirect(url);
} */