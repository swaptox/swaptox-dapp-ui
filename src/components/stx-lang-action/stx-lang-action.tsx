'use client';

import { useLocale } from 'next-intl';
import { useState, useRef } from "react";
import { ChevronDown, Globe, CircleCheckBig } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { languagesView, fileLangName } from '@/data/locale/config';
import { buildUrl, useUIReady, lockUI } from '@/lib/js_sdk/index';


import ComModalBody from "./com/com-modal-body";

import './stx-lang-action.css';



interface StxLangActionProps {
	initialLang: string;
}



export default function StxLangAction({ initialLang }: StxLangActionProps) {
	const elementRef = useRef<HTMLDivElement>(null);
	
	const currentLocale = fileLangName(initialLang)||fileLangName(useLocale());
	//console.log(currentLocale, fileLangName(useLocale()), languagesView);
	
	const [opneModal, setOpneModal] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	
	const langText = languagesView.find(l => l.id.toLowerCase() === currentLocale?.toLowerCase())?.value || '';
	
	const handleClose = () => {
	    setOpneModal(false);
	};	
	
	
	const [modalRight, setModalRight] = useState(2);
	/* const getMetrics = () => {
		if(window.innerWidth>300){
			if (elementRef.current) {
				const rect = elementRef.current?.getBoundingClientRect();
				const elLeft = rect.right-260;
				const elRight = window.innerWidth-rect.right;
				if(elLeft>elRight){
					setModalRight(2);
				}else{
					setModalRight(window.innerWidth-rect.right-15);
				}
			}else{
				setModalRight(44);
			}
		}else{
			if (elementRef.current) {
				const rect = elementRef.current?.getBoundingClientRect();
				setModalRight(window.innerWidth-rect.right-15);
			}else{
				setModalRight(44);
			}
		}
		setOpneModal((prev) => !prev);
	}; */
	
	
	const getMetrics = () => {
		if(window.innerWidth>960){
			setModalRight(2);
		}else{
			setModalRight(44);
		}
		setOpneModal((prev) => !prev);
	};
	
	
	
	const onSelectChange = (nextLocale: string) => {
		lockUI();
		const newUrl = buildUrl({
			pathname,
			locale: nextLocale,
			searchParams,
			hash: window.location.hash,
		});
		document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
		window?.$swaptoxConnect?.setLang(nextLocale);
		window?.$swaptoxWidget?.setLang(nextLocale);
		//router.replace(newUrl);
	    handleClose();
		window.location.replace(newUrl);
		/* if (document.startViewTransition) {
		  document.startViewTransition(() => {
		    // 执行你的路由跳转
		    router.replace(newUrl);
		  });
		} else {
		  router.replace(newUrl);
		} */
	};
	
	const ready = useUIReady();
	return (
		<div ref={elementRef}
			onClick={(e) => {
				e.stopPropagation(); 
				getMetrics();
			}}
			className={`transition-opacity
				relative
				cursor-pointer 
				px-2 h-8 
				flex items-center justify-center gap-1 
				rounded-full 
				border border-border-primary 
				bg-bg-base 
				shadow-sm 
				stx-lang-action
				${opneModal?'stx-header-element-focus':'stx-header-element-hover'} 
				${!ready ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
			`}
		>
			<Globe size={18} color="var(--color-text-base, #52525c)" strokeWidth={1.6} />
			

			
			<span className="stx-langactive-hide-id1130 text-sm font-sans text-text-base select-none whitespace-nowrap"
			>{langText}</span>
			
			<ChevronDown 
				size={20} 
				color="var(--color-text-base, #52525c)" 
				strokeWidth={1.6} 
				className={`stx-langactive-hide-id1130 ${opneModal ? 'rotate-180' : ''}`}
			/>


			<ComModalBody open={opneModal} onClose={handleClose} styles={{right: `-${modalRight}px`}}>
				
				
				{languagesView.map((lang) => {
					// 判断是否是当前选中的语言
					const isActive = currentLocale.toLowerCase() === lang.id.toLowerCase();
					return (
						<button
							key={lang.id}
							onClick={(e) => {
								e.stopPropagation();
								if (!isActive) {
									onSelectChange(lang.id);
								} else {
									handleClose();
								}
							}}
							className="
								relative px-4 py-3 text-sm text-left flex items-center flex-nowrap gap-3 w-56
								transition-all duration-200 text-text-base
								hover:bg-gray-100/100 dark:hover:bg-blue-900/20
							"
						>
							<span>{lang.value}</span>
							<span style={{color: '#999'}}>{lang.symbol}</span>
							{isActive && (
							    <div className="stx-langactive-icon-layout text-text-primary">
							        <CircleCheckBig size={18} strokeWidth={2.2} />
							    </div>
							)}
						</button>
					);
				})}
				
				
			</ComModalBody>

		</div>
	);
}