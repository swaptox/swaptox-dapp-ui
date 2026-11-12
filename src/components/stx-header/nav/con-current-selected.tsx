
//<image style="width:16px;height:16px;position:relative;top:22px;left:-2px;" :src="item.img"></image>
//relativeposition: 'absolute',
				//top: '-2px',
				//right: '0px',ff0030
				
/* <span className="select-none" style={{
				position: 'relative',
				top: '-4px',
				right: '-1px',
				whiteSpace: 'nowrap',
				fontSize: '10px',
				color: '#ff0707',
			}}>New</span> */
				
				
export default function ConCurrentSelected() {
	
	const walletLogo = '/logo/wallet/metamask.svg';// Swap
	
	return (
		<div className="relative flex items-center" style={{gap: '2px'}}>
			
			
			{walletLogo && (
			    <img
			    	draggable="false"
			    	width="16" 
			    	height="16" 
			    	style={{maxWidth: '16px',minWidth: '16px'}}
			    	src={walletLogo}
			    	className="select-none"
			    />
			)}
			
			<div className="whitespace-nowrap text-base font-sans text-text-base select-none">兑换</div>
			<span className="select-none whitespace-nowrap" style={{
				position: 'absolute',
				zIndex: '10',
				top: '-2px',
				left: 'calc(100% + 2px)',
				whiteSpace: 'nowrap',
				fontSize: '10px',
				color: '#ff0707',
			}}>New</span>
		</div>
	);
}