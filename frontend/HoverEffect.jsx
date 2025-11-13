import React, { useState } from 'react';
import './HoverEffect.css';

const HoverEffect = ({
	children,
	scaleAmount = 1.1,
	accentColor = '#10b981',
	className = '',
	...otherProps
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	return (
		<div
			className={`hover-effect-wrapper ${isHovered ? 'hovered' : ''} ${isPressed ? 'pressed' : ''} ${className}`}
			style={{
				'--accent-color': accentColor,
				'--scale-amount': scaleAmount
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false);
				setIsPressed(false);
			}}
			onMouseDown={() => setIsPressed(true)}
			onMouseUp={() => setIsPressed(false)}
			{...otherProps}
		>
			{children}
		</div>
	);
};

export default HoverEffect;
