
import { cookies } from 'next/headers';

//import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';

export default async function RootNotFound() {
	
	
	const cookieStore = await cookies();
	const theme = cookieStore.get('theme')?.value||'';
	
	//const segment = useSelectedLayoutSegment();
	//const segments = useSelectedLayoutSegments();
	//console.log('开发环境===211--1100--rr00===', theme, segment, segments);
	
	return (
		<div title="404" style={{
			width: '100%', 
			height: 'calc(100vh - 150px)',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			<img 
				draggable="false"
				width="404" 
				height="404" 
				style={{maxWidth: '404px',minWidth: '404px', opacity: '0.6', filter: 'var(--not-found-icon-filter)'}}
				src="/404.svg"
				className="select-none pointer-events-none"
			/>
		</div>
	);
}

/*

git remote add origin https://github.com/swaptox/swaptox-dapp-ui.git
git branch -M main
git push -u origin main


*/
