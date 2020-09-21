import React from 'react';
import { ScrollScene } from 'scrollscene';

export default function StickyHeaderWrapper({ children }) {
	const el = React.useRef(null);
	const startEl = React.useRef(null);
	const endEl = React.useRef(null);

	React.useEffect(() => {
		if (!el) {
			return;
		}
		const navigationNode = document.querySelector('#default-nav');
		const navHeight = navigationNode ? navigationNode.clientHeight : 70;
		const elementWidth = el.current.getBoundingClientRect().height - navHeight;

		const scrollScene = new ScrollScene({
			triggerElement: startEl.current,
			toggle: {
				element: el.current,
				className: 'stickyHeader',
				reverse: true,
			},
			offset: -navHeight,
			duration: elementWidth,
			triggerHook: 0,
		});
		// destroy on unmount
		return () => {
			scrollScene.destroy();
		};
	}, []);

	return (
		<div className="wrapper" ref={el}>
			<div ref={startEl} />
			{children}
			<div className="end-buffer-area" ref={endEl} />
		</div>
	);
}
