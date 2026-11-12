'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, CircleCheckBig } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { chainsList, chainsMap, defaultChain } from '@/data/chain/chains';
import ComModalBody from "../stx-lang-action/com/com-modal-body";
import { useChainStore } from '@/data/chain/store';
import { buildUrl, useUIReady, lockUI } from '@/lib/js_sdk/index';

import './stx-chain-action.css';

interface StxChainActionProps {
	initialChain: string;
}


export default function StxChainAction({ initialChain }: StxChainActionProps) {
	const elementRef = useRef<HTMLDivElement>(null);
	
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	
	const [mounted, setMounted] = useState(false);
	const [opneModal, setOpneModal] = useState(false);
	const setCurrentChain = useChainStore((s) => s.setChain);
	const currentChain = useChainStore((s) => s.chain);
	
	// 等待客户端挂载完成
	useEffect(() => setMounted(true), []);
	
	const viewChain = !mounted?initialChain:currentChain;
	const chainData = chainsMap[viewChain as keyof typeof chainsMap] ?? {
		name: '',
		logo: ''
	};
	
	const switchChain = function(nextChain: string) {
		const newUrl = buildUrl({
		    pathname,
		    chain: nextChain,
		    searchParams,
		    hash: window.location.hash,
		});
		document.cookie = `chain=${nextChain}; path=/; max-age=31536000; SameSite=Lax`;
		window?.$swaptoxWidget?.setChain(nextChain);
		window?.$swaptoxConnect?.updateConfig({ currentChain: nextChain });
		//router.replace(newUrl, { scroll: false });
		//router.replace(newUrl);
		/* console.log(newUrl);
		if (document?.startViewTransition) {
		  document?.startViewTransition(() => {
		    // 执行你的路由跳转
		    router.replace(newUrl, { scroll: false });
		  });
		} else {
		  router.replace(newUrl, { scroll: false });
		} */
		window.history.replaceState({SOME_STATE: true}, '', newUrl);
	}
	
	//获取当前链
	useEffect(() => {
		const segments = pathname.split('/').filter(Boolean);
		if (segments.length >= 2) {
		    const normalized = segments[1].toLowerCase();
		    if(normalized in chainsMap){
		    	setCurrentChain(normalized);
				return;
		    }
		}
		setCurrentChain(defaultChain);
	}, [pathname]);
	
	
	const handleClose = () => {
	    setOpneModal(false);
	};
	
	const onSelectChange = (nextChain: string) => {
		lockUI();
		switchChain(nextChain);
		setCurrentChain(nextChain);
	    handleClose();
	};
	
	
	const fixWidth = 520;//2列宽度
	const [modalRight, setModalRight] = useState(2);
	const [modalWidth, setModalWidth] = useState(fixWidth);
	/* const getMetrics = () => {
		if(window.innerWidth>(fixWidth+30)){
			setModalWidth(fixWidth);
			if (elementRef.current) {
				const rect = elementRef.current?.getBoundingClientRect();
				const elLeft = rect.right-modalWidth;
				const elRight = window.innerWidth-rect.right;
				if(elLeft>elRight){
					setModalRight(2);
				}else{
					setModalRight(window.innerWidth-rect.right-15);
				}
			}else{
				setModalRight(88);
			}
		}else{
			setModalWidth(window.innerWidth-30);
			if (elementRef.current) {
				const rect = elementRef.current?.getBoundingClientRect();
				setModalRight(window.innerWidth-rect.right-14);
			}else{
				setModalRight(88);
			}
		}
		setOpneModal((prev) => !prev);
	}; */
	
	
	
	const getMetrics = () => {
		if(window.innerWidth>960){
			setModalRight(2);
		}else{
			setModalRight(88);
		}
		if(window.innerWidth>(fixWidth+30)){
			setModalWidth(fixWidth);
		}else{
			setModalWidth(window.innerWidth-30);
		}
		setOpneModal((prev) => !prev);
	};
	
	
	
	const ready = useUIReady();
	const $t = useTranslations('Components');
	return (
		<div ref={elementRef}
			onClick={(e) => {
				e.stopPropagation(); 
				getMetrics();
			}}
			className={`stx-chain-action transition-opacity
				relative
				cursor-pointer 
				px-2 h-8 
				flex items-center justify-center gap-1 
				rounded-full 
				border border-border-primary 
				bg-bg-base 
				shadow-sm
				${opneModal?'stx-header-element-focus':'stx-header-element-hover'} 
				${!ready ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
			`}
		>
			
			{chainData.logo && (
			    <img
			    	draggable="false"
			    	alt={chainData.name}
			    	width="18" 
			    	height="18" 
			    	style={{maxWidth: '18px',minWidth: '18px'}}
			    	src={chainData.logo}
			    	className="select-none"
			    />
			)}
			
			
			<span className="stx-chain-hide-id1130 text-sm font-sans text-text-base select-none"
			>{chainData.name}</span>
			<ChevronDown 
				size={20} 
				color="var(--color-text-base, #52525c)" 
				strokeWidth={1.6} 
				className={`stx-chain-hide-id1130 ${opneModal ? 'rotate-180' : ''}`}
			/>


			<ComModalBody open={opneModal} onClose={handleClose} styles={{right: `-${modalRight}px`}}>
				<div style={{width: modalWidth+'px'}} className="p-4 chain-custom-p-w" onClick={(e) => {
					e.stopPropagation(); 
				}}>
				
					<div className="pb-4 chain-custom-pb-w">
						<span className="text-sm font-sans select-none" 
						style={{color:'#999'}}>{$t('switchNetwork')}</span>
					</div>
					
					<div style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: '10px',
					}}>
					
						{chainsList.map((obj) => {
							const isActive = currentChain === obj.chain;
							return (
								<button
									key={obj.chain}
									onClick={(e) => {
										e.stopPropagation();
										if (!isActive) {
											onSelectChange(obj.chain.toLowerCase());
										} else {
											handleClose();
										}
									}}
									
									className={`rounded-full border cursor-pointer
										relative px-4 py-3 text-sm text-left flex items-center flex-nowrap gap-2 
										transition-all duration-200 text-text-base
										${isActive?'border-border-select bg-bg-select':'border-transparent hover:bg-bg-select hover:border-border-select'}
									`}
								>
									
									{obj.logo && (
									    <img
									    	draggable="false"
									    	alt={obj.name}
									    	width="22" 
									    	height="22" 
									    	style={{maxWidth: '22px',minWidth: '22px'}}
									    	src={obj.logo}
									    	className="select-none"
									    />
									)}
									
									<span>{obj.name}</span>
									
									{isActive && (
									    <div className="stx-chain-icon-layout text-text-primary">
									        <CircleCheckBig size={18} strokeWidth={2.2} />
									    </div>
									)}
								</button>
							);
						})}
					
					</div>
				</div>
			</ComModalBody>

		</div>
	);
}