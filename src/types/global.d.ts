export { };

declare global {
	namespace React {
		namespace JSX {
			interface IntrinsicElements {
				// 第一个自定义组件
				'swaptox-routes-choose' : React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
					// 如果有自定义属性可以在这里扩展
				};

				// 新增的第二个自定义组件
				'swaptox-transactions-record' : React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
					// 如果有自定义属性可以在这里扩展
				};
			}
		}
	}
}