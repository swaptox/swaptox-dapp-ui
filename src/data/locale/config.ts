

//用于浏览器支持语言列表(文件名称默认全部小写)
export const fileLangName = function(locale: string){
	const newLang = locale.toLowerCase();
	if(newLang === 'zh-cn'){
		return 'zh-hans';
	}else if(newLang === 'zh-hk' || newLang === 'zh-tw'){
		return 'zh-hant';
	}
	return newLang;
};


export const supported = [
	'en', 'ja', 'ko', 'zh-Hans', 'zh-Hant', 'th', 'pt-BR', 'id', 'vi',
	// Keep common Chinese browser and URL locale aliases working.
	'zh-CN', 'zh-HK', 'zh-TW'
];
export const defaultLang = 'en';

export const langsMap = {
	'en': true,
	'zh-CN': true,
	'zh-Hans': true,
	'zh-Hant': true,
	'zh-HK': true,
	'zh-TW': true,
	'ja': true,
	'ko': true,
	'th': true,
	'pt-BR': true,
	'id': true,
	'vi': true,
} as const;


//用于浏览器支持语言列表
export const languages = {
	'en-US': '/en',
	'zh-Hans': '/zh-Hans',
	'zh-Hant': '/zh-Hant',
	'ja-JP': '/ja',
	'ko-KR': '/ko',
	'th-TH': '/th',
	'pt-BR': '/pt-BR',
	'id-ID': '/id',
	'vi-VN': '/vi',
	'x-default': `/${defaultLang}`
};

//DAPP显示的语言列表
export const languagesView = [
	{
		'id': 'en',
		'value': 'English',
		'symbol': 'en-US',
	},
	{
		'id': 'ja',
		'value': '日本語',
		'symbol': 'ja-JP',
	},
	{
		'id': 'ko',
		'value': '한국어',
		'symbol': 'ko-KR',
	},
	{
		'id': 'zh-Hans',
		'value': '简体中文',
		'symbol': 'zh-Hans',
	},
	{
		'id': 'zh-Hant',
		'value': '繁體中文',
		'symbol': 'zh-Hant',
	},
	{
		'id': 'th',
		'value': 'ไทย',
		'symbol': 'th-TH',
	},
	{
		'id': 'pt-BR',
		'value': 'Português (Brasil)',
		'symbol': 'pt-BR',
	},
	{
		'id': 'id',
		'value': 'Bahasa Indonesia',
		'symbol': 'id-ID',
	},
	{
		'id': 'vi',
		'value': 'Tiếng Việt',
		'symbol': 'vi-VN',
	},
];


