
import StxLogoName from "@/components/stx-logo-name/stx-logo-name";
import StxThemeAction from "@/components/stx-theme-action/stx-theme-action";
import StxLangAction from "@/components/stx-lang-action/stx-lang-action";
import StxChainAction from "@/components/stx-chain-action/stx-chain-action";




import ComTopNav from "./nav/com-top-nav";
import ComWallet from "./com/com-wallet";

import './stx-header.css';

interface StxHeaderProps {
	chain: string;
	theme: string;
	lang: string;
}


export default function StxHeader({ chain, theme, lang }: StxHeaderProps) {
	
	
	
	return (
		<header className="h-[60px] border-b border-border-divider-line sticky top-0 z-50 bg-bg-primary">
			<div style={{padding: '0 15px 0 10px'}} className="page-width-body h-[100%] flex items-center justify-between">
			
				<div className="flex-1 flex items-center gap-2">
					<StxLogoName />
					<ComTopNav />
				</div>

				<div className="flex items-center stxhead-gap-3">
					<ComWallet />
					<StxChainAction initialChain={chain} />
					<StxLangAction initialLang={lang} />
					<StxThemeAction initialTheme={theme} />
				</div>
			
			</div>
			
			
			
			
			
		</header>
	);
}