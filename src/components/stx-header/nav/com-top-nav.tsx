"use client";
import { useState } from "react";

//import ConCurrentSelected from './con-current-selected';
import ComDesktopNav from './com-desktop-nav';


import StxLeftNav from "@/components/stx-nav/stx-left-nav";


import './com-top-nav.css';




export default function ComTopNav() {
	const [navOpen, setNavOpen] = useState(false);
	
	
	return (
		<div style={{flex: '1'}} className="flex items-center">
			
			<StxLeftNav 
			    isOpen={navOpen} 
			    onClose={() => setNavOpen(false)} 
			/>			
			
			
			<div onClick={() => setNavOpen(true)} className="com-top-nav-menu-icon-size flex items-center justify-center com-top-nav-menu-icon-pointer">
				<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18984" width="16" height="16"><path d="M192 960h-128c-34.816 0-63.488-28.672-63.488-63.488 0-34.816 28.672-63.488 63.488-63.488h128c34.816 0 63.488 28.672 63.488 63.488 0 34.816-28.672 63.488-63.488 63.488z m0-385.024h-128c-34.816 0-63.488-28.672-63.488-63.488s28.672-63.488 63.488-63.488h128c34.816 0 63.488 28.672 63.488 63.488 0 35.84-28.672 63.488-63.488 63.488z m0-382.976h-128c-34.816 0-63.488-28.672-63.488-63.488s28.672-63.488 63.488-63.488h128c34.816 0 63.488 28.672 63.488 63.488s-28.672 63.488-63.488 63.488z m768.512 768H448c-34.816 0-63.488-28.672-63.488-63.488 0-34.816 28.672-63.488 63.488-63.488H960.512c35.84 0 63.488 28.672 63.488 63.488 0 34.816-28.672 63.488-63.488 63.488z m0-385.024H448c-34.816 0-63.488-28.672-63.488-63.488s28.672-63.488 63.488-63.488H960.512c35.84 0 63.488 28.672 63.488 63.488 0 35.84-28.672 63.488-63.488 63.488z m0-382.976H448c-34.816 0-63.488-28.672-63.488-63.488s28.672-63.488 63.488-63.488H960.512c35.84 0 63.488 28.672 63.488 63.488s-28.672 63.488-63.488 63.488z" p-id="18985" fill="#02b6a6"></path></svg>
			</div>
			

			<div className="flex items-center show-view-nav-89861">
				<ComDesktopNav />
			</div>
			
			
		</div>
	);
}


/* 			<div style={{flex: '1'}}>
				
			</div> */

