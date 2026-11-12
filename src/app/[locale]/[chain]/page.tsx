
import StxSwapCard from "@/components/stx-swap-card/stx-swap-card";

import './page.css';

export default async function Home({ params }: { 
	params: Promise<{ chain: string; locale: string }>;
}) {
	const { chain, locale } = await params;
	//console.log('page----------', chain, locale);
	

	
	return (
	<div className="swaps-body-910">
		<div className="neirong-xinxi-body">
      
			<div className="app-f2-swaps">
				<StxSwapCard></StxSwapCard>
			</div>   
            
			<div style={{flex:'1'}}>
				<swaptox-routes-choose></swaptox-routes-choose>
				
			</div>
			
			
			
			
			
		</div>
		<div className="view-placeholder-height"></div>
				<swaptox-transactions-record></swaptox-transactions-record>
	</div>	
		
	);
}
	
	
	
/* 	return (
	<div>
		<div className="swaps-body-910">
      
			<div className="app-f2-swaps">
				<StxSwapCard></StxSwapCard>
			</div>   
            
			<div style={{flex:'1'}}>
				<swaptox-routes-choose></swaptox-routes-choose>
				
			</div>
			
			
			
			
			
		</div>
		<div className="view-placeholder-height"></div>
				<swaptox-transactions-record></swaptox-transactions-record>
	</div>	
		
	); */
