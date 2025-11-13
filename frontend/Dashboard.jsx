import React from 'react';
import HoverEffect from './HoverEffect';
import WebHover from './WebHover';

const Dashboard = () => {
	return (
		<div style={{ padding: '40px' }}>
			{/* Example with buttons */}
			<HoverEffect accentColor="#10b981" scaleAmount={1.1}>
				<button style={{
					padding: '16px 32px',
					background: 'linear-gradient(135deg, #10b981, #059669)',
					color: 'white',
					border: 'none',
					borderRadius: '12px',
					fontSize: '16px',
					fontWeight: '600',
					cursor: 'pointer'
				}}>
					Get Started
				</button>
			</HoverEffect>

			{/* Example with cards */}
			<WebHover webColor="#10b981" maxDistance={400}>
				<HoverEffect accentColor="#10b981" scaleAmount={1.06}>
					<div style={{
						padding: '24px',
						background: 'white',
						borderRadius: '16px',
						boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
						minWidth: '300px'
					}}>
						<h3>Recommended Job</h3>
						<p>Software Developer • Remote</p>
					</div>
				</HoverEffect>
			</WebHover>
		</div>
	);
};

export default Dashboard;
