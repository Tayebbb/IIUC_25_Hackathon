import React from 'react';
import WebHover from './WebHover';

const YourComponent = () => {
	return (
		<div style={{ padding: 40 }}>
			<WebHover webColor="#22c55e" maxDistance={200}>
				<button
					style={{
						padding: '16px 32px',
						borderRadius: 12,
						background: '#22c55e',
						color: 'white',
						border: 'none',
						cursor: 'pointer',
						fontSize: 16,
						fontWeight: 600
					}}
				>
					Shoot Web!
				</button>
			</WebHover>

			<WebHover webColor="#8b5cf6" maxDistance={250} webThickness={5}>
				<div
					style={{
						padding: 24,
						borderRadius: 16,
						background: 'white',
						boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
					}}
				>
					<h3>Interactive Card</h3>
					<p>Move your mouse around!</p>
				</div>
			</WebHover>
		</div>
	);
};

export default YourComponent;
