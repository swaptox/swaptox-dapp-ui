
import './StxIconClose.css';

export default function StxIconClose({
	size = 'default',
	onClose,
	className = '',
}) {
	const handleClick = () => {
		onClose?.();
	};

	return (
		<div
			className={`stx-icon-close ${className}`.trim()}
			data-size={size}
			onClick={handleClick}
			role="button"
			tabIndex={0}
			aria-label="Close"
			onKeyDown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					handleClick();
				}
			}}
		>
			<svg className="stx-icon-close-icon" data-size={size} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12734"><path d="M605.23433 512.448271L1002.955803 114.355709c25.606159-25.725766 25.606159-67.144608 0-92.869353-25.612293-25.7319-67.144608-25.7319-92.755879 0L512.478451 419.572785 114.881696 21.486356c-25.612293-25.7319-67.144608-25.7319-92.756902 0-25.607182 25.725766-25.607182 67.143586 0 92.869353l397.602889 397.966821L22.124794 910.417138c-25.607182 25.7319-25.607182 67.144608 0 92.876508 12.742765 12.863394 29.530706 19.234266 46.437232 19.234266 16.787941 0 33.57486-6.370871 46.439277-19.234266l397.476125-397.967844L910.079295 1003.292624c12.743787 12.863394 29.650313 19.234266 46.438254 19.234265 16.781807 0 33.569748-6.370871 46.313536-19.234265 25.606159-25.7319 25.606159-67.144608 0-92.876509l-397.596755-397.967844z m0 0" p-id="12735"></path></svg>
		</div>
	);
}
