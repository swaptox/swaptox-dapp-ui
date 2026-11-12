type BuildUrlOptions = {
	pathname : string;              // 当前 pathname（usePathname）
	locale ?: string;               // 要切换的语言（可选）
	chain ?: string;                // 要切换的链（可选）
	searchParams ?: URLSearchParams; // useSearchParams()
	hash ?: string;                 // window.location.hash（可选）
};

const buildUrl = function ({
	pathname,
	locale,
	chain,
	searchParams,
	hash,
} : BuildUrlOptions) {
	const segments = pathname.split('/').filter(Boolean);

	// 👉 保证至少有两个位置
	if (segments.length < 2) {
		throw new Error('Invalid pathname: must include /[locale]/[chain]');
	}

	// 👉 替换 locale / chain（如果传入）
	if (locale) segments[0] = locale;
	if (chain) segments[1] = chain;

	const newPath = '/' + segments.join('/');

	const queryString = searchParams?.toString();
	const finalUrl = queryString ? `${newPath}?${queryString}` : newPath;

	return hash ? `${finalUrl}${hash}` : finalUrl;
}



export { buildUrl };