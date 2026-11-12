
import { getRequestConfig } from 'next-intl/server';
import { supported, defaultLang, fileLangName } from '@/data/locale/config';
import { deepMerge } from '@/lib/js_sdk/index';

const cache = new Map();

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !supported.includes(locale)) {
		locale = defaultLang;
	}
	
	locale = fileLangName(locale);
	
	if (cache.has(locale)) {
		return {
			locale,
			messages: cache.get(locale)
		};
	}

	let messages;
	
	try {
		if (locale === defaultLang) {
			messages = (await import(`../data/locale/pack/${defaultLang}.json`)).default;
		} else {
			const [base, current] = await Promise.all([
				import(`../data/locale/pack/${defaultLang}.json`),
				import(`../data/locale/pack/${locale}.json`)
			]);

			messages = deepMerge(base.default, current.default);
		}
	} catch {
		messages = (await import(`../data/locale/pack/${defaultLang}.json`)).default;
	}

	cache.set(locale, messages);

	return {
		locale,
		messages
	};
});


