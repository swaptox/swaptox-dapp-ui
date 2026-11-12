
import {contact, navigation} from '@/data/footer/contact';




export default function StxFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="
			relative z-10
			border-t border-zinc-200
			dark:border-zinc-800
			bg-white dark:bg-[#090d0d]
		">

			{/* 顶部装饰线 */}
			<div className="
				absolute top-0 left-0 right-0 h-[1px]
				bg-gradient-to-r from-transparent
				via-[#02b6a6]/50 to-transparent max-[520px]:hidden
			"/>

			<div className="
				max-w-[1200px] mx-auto
				px-5 sm:px-4
			">

				{/* 主体 */}
				<div className="
					min-h-[100px]
					py-7
					flex flex-col md:flex-row
					items-center justify-between
					gap-5 md:gap-3
				">

					{/* 品牌 */}
					<div className="
						flex flex-col items-center md:items-start
						shrink-0
					">
						<div className="
							text-[21px] font-bold
							tracking-tight
							text-zinc-900 dark:text-zinc-100 select-none
						">
							Swapto<span className="text-[#02b6a6]">X</span>
						</div>

						<div className="
							mt-1.5 text-[11px]
							text-zinc-400 dark:text-zinc-600
							whitespace-nowrap select-none
						">
							© {currentYear} SwaptoX. All rights reserved.
						</div>
					</div>


					{/* 导航链接 */}
					<nav className="
						flex flex-wrap
						items-center justify-center
						gap-x-6 gap-y-3
					">
						{navigation.map((item) => (
							<a
								key={item.name}
								href={item.url}
								target={
									item.url.startsWith("http")
										? "_blank"
										: undefined
								}
								rel={
									item.url.startsWith("http")
										? "noopener noreferrer"
										: undefined
								}
								className=" select-none
									text-[12px] font-medium
									text-zinc-500 dark:text-zinc-500
									hover:text-[#02b6a6]  dark:hover:text-[#02b6a6]
									transition-colors duration-200
									whitespace-nowrap
								"
							>
								{item.name}
							</a>
						))}
					</nav>


					{/* 社交链接 */}
					<div className="
						flex items-center gap-4
						shrink-0
					">
						{contact.map((item) => (
							<a
								key={item.name}
								href={item.url}
								target="_blank"
								rel="noopener noreferrer"
								title={item.name}
								aria-label={item.name}
								className="
									group
									w-[34px] h-[34px]
									rounded-xl
									flex items-center justify-center
									border border-zinc-200
									dark:border-zinc-800
									bg-zinc-50 dark:bg-zinc-900/60
									hover:border-[#02b6a6]/50
									hover:bg-[#02b6a6]/10
									
									
									dark:hover:border-[#02b6a6]/50
									dark:hover:bg-[#02b6a640]
									
									transition-all duration-200
								"
							>
								<img
									src={item.logo}
									alt=""
									className="
										w-[15px] h-[15px]
										object-contain
										opacity-50
										group-hover:opacity-100
										transition-opacity filter-[invert(100%)] dark:filter-[invert(0%)]
									"
								/>
							</a>
						))}
					</div>

				</div>

			</div>
		</footer>
	);
}
