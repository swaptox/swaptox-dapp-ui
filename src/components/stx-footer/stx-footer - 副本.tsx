

//import {contact} from '@/data/footer/contact';

const contact = [
	{
		name: 'Telegram',
		url: 'https://t.me/swaptox',
		logo: '/logo/social/telegram.svg',
	},

	{
		name: 'Twitter/X',
		url: 'https://x.com/swapto_x',
		logo: '/logo/social/x-logo.svg',
	},

	{
		name: 'Discord',
		url: 'https://discord.gg/MWXmBaFTQy',
		logo: '/logo/social/discord.svg',
	},

]






export default function StxFooter() {
  const currentYear = new Date().getFullYear();
  const options = contact || [];

  return (
    <footer className="hidden sm:block h-[88px] relative z-10 border-t border-zinc-200 dark:border-zinc-800 bg-[#02b6a6] dark:bg-zinc-950">
      <div className="max-w-[1360px] h-full mx-auto px-4 flex flex-row items-center justify-between">
        
        {/* 左侧：品牌与版权 */}
        <div className="flex flex-col justify-center">
          <div className="text-[22px] font-bold leading-tight text-slate-900 dark:text-slate-100 tracking-tight">
            SwaptoX
          </div>
          <div className="text-[12px] mt-1 text-slate-500 dark:text-zinc-500 whitespace-nowrap">
            Copyright © {currentYear}
          </div>
        </div>

        {/* 右侧：社交/联系链接 */}
        <nav className="flex flex-row items-center flex-wrap max-w-[480px] justify-end gap-y-2">
          {options.map((item, index) => (
            <div key={index} className="flex items-center">
              {/* 分隔符：逻辑类似 Vue 的 v-if="index > 0" */}
              {index > 0 && (
                <span className="mx-3 text-zinc-300 dark:text-zinc-700 text-xs select-none">
                  /
                </span>
              )}
              
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 group cursor-pointer"
              >
               
				
                <span className="text-sm text-slate-600 dark:text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:underline transition-colors select-none">
                  {item.name}
                </span>
              </a>
            </div>
          ))}
        </nav>

      </div>
    </footer>
  );
}