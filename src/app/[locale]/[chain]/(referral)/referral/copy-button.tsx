'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface CopyButtonProps {
	text: string;
	content: string;
}


export default function CopyButton({ text, content }: CopyButtonProps) {
	const [isCopy, setIsCopy] = useState(false);
	const $t = useTranslations('Components');

	const onCopy = () => {
		if (!navigator.clipboard) return;
		
		navigator.clipboard.writeText(content).then(() => {
			setIsCopy(true);
			setTimeout(() => {
				setIsCopy(false);
			}, 3000);
		});
	};

	return (
		<button
			className={`transition-opacity whitespace-nowrap
			h-8 px-4
			flex items-center justify-center 
			rounded-full 
			border border-border-primary 
			text-sm stx-theme-button
			shadow-sm select-none ${isCopy ? 'stx-theme-button-disabled' : 'cursor-pointer'}`}
			onClick={onCopy}
		>
			{isCopy ? `${$t('copied')}!` : text}
		</button>
	);
}

