import React, { useState } from 'react';

const SimpleWebEffect = ({ children, webColor = '#10b981' }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [mouseAngle, setMouseAngle] = useState(0);

	const handleMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
		setMouseAngle(angle);
	};

	const containerStyle = {
		position: 'relative',
		display: 'inline-block'
	};

	const webLineStyle = {
		position: 'absolute',
		left: '50%',
		top: '50%',
		width: isHovered ? '300px' : '0px',
		height: '12px',
		background: `linear-gradient(90deg, ${webColor}, transparent)`,
		transform: `rotate(${mouseAngle}deg)`,
		transformOrigin: 'left center',
		transition: 'width 0.4s ease-out',
		pointerEvents: 'none',
		zIndex: 9999,
		borderRadius: '6px',
		boxShadow: `0 0 30px ${webColor}, 0 0 60px ${webColor}, 0 0 90px ${webColor}`,
		opacity: isHovered ? 1 : 0
	};

	return (
		<div
			style={containerStyle}
			onMouseEnter={() => setIsHovered(true)}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div style={webLineStyle} />
			{children}
		</div>
	);
};

export default SimpleWebEffect;
