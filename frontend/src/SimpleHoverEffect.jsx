import React, { useState } from 'react';

const SimpleHoverEffect = ({ children, accentColor = '#10b981' }) => {
	const [isHovered, setIsHovered] = useState(false);

	const wrapperStyle = {
		display: 'inline-block',
		transform: isHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)',
		transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
		cursor: 'pointer',
		boxShadow: isHovered 
			? `0 12px 40px rgba(0,0,0,0.15), 0 0 0 3px ${accentColor}55`
			: '0 4px 12px rgba(0,0,0,0.08)',
		filter: isHovered ? `brightness(1.05) drop-shadow(0 0 20px ${accentColor}66)` : 'none',
		borderRadius: 'inherit'
	};

	return (
		<div
			style={wrapperStyle}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
		</div>
	);
};

export default SimpleHoverEffect;
