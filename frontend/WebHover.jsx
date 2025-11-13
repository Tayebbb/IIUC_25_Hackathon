import React, { useRef, useEffect, useState } from 'react';
import './WebHover.css';

const WebHover = ({
	children,
	webColor = '#10b981',
	maxDistance = 300,
	...otherProps
}) => {
	const containerRef = useRef(null);
	const webLineRef = useRef(null);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0, angle: 0, distance: 0 });
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (event) => {
		if (!containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const mouseX = event.clientX - rect.left - centerX;
		const mouseY = event.clientY - rect.top - centerY;

		const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
		const distance = Math.min(
			Math.sqrt(mouseX ** 2 + mouseY ** 2),
			maxDistance
		);

		setMousePos({ x: mouseX, y: mouseY, angle, distance });
	};

	return (
		<div
			ref={containerRef}
			className={`web-hover-container ${isHovered ? 'active' : ''}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => setIsHovered(false)}
			style={{ '--web-color': webColor }}
			{...otherProps}
		>
			<div
				ref={webLineRef}
				className="web-line"
				style={{
					transform: `rotate(${mousePos.angle}deg)`,
					width: `${mousePos.distance}px`,
					opacity: isHovered ? 1 : 0
				}}
			/>
			{children}
		</div>
	);
};

export default WebHover;
