interface NavSubItem {
	id: string;
	label: string;
	href: string;
	tag?: string;
	icon?: React.ReactNode;
	img?: string;
}

interface NavItem {
	id: string;
	label: string;
	href?: string;
	icon?: React.ReactNode;
	img?: string;
	tag?: string;
	children?: NavSubItem[];
}


export const navItems: NavItem[] = [
	{ id: "home", label: "swap", href: "/", tag: "" },
	{ id: "referral", label: "referral", href: "/referral" },
	
	/* { 
		id: "trade", 
		label: "交易中心", 
		children: [
			{ id: "spot", label: "现货交易", href: "/trade/spot" },
			{ id: "futures", label: "合约交易", href: "/trade/futures", tag: "New" },
			{ id: "swap", label: "闪兑/兑换", href: "/trade/swap" },
		]
	},
	{ 
		id: "assets", 
		label: "资产管理", 
		children: [
			{ id: "overview", label: "资产总览", href: "/assets/overview" },
			{ id: "deposit", label: "充值", href: "/assets/deposit" },
			{ id: "withdraw", label: "提现", href: "/assets/withdraw" },
		]
	}, */
];
