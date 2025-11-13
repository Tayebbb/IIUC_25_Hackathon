import React from 'react';
import HoverEffect from './HoverEffect';
import WebHover from './WebHover';

const TestHoverEffects = () => {
	return (
		<div style={{
			padding: '100px',
			display: 'flex',
			flexDirection: 'column',
			gap: '80px',
			alignItems: 'center',
			background: '#f8fafc',
			minHeight: '100vh'
		}}>
			<h1 style={{ color: '#1e293b', marginBottom: '40px' }}>
				Hover Effect Tests
			</h1>

			{/* Test 1: Simple Button */}
			<HoverEffect accentColor="#10b981" scaleAmount={1.15}>
				<button style={{
					padding: '20px 40px',
					background: 'linear-gradient(135deg, #10b981, #059669)',
					color: 'white',
					border: 'none',
					borderRadius: '12px',
					fontSize: '18px',
					fontWeight: 'bold',
					cursor: 'pointer'
				}}>
					HOVER ME - Button Test
				</button>
			</HoverEffect>

			{/* Test 2: Card with HoverEffect */}
			<HoverEffect accentColor="#3b82f6" scaleAmount={1.08}>
				<div style={{
					padding: '32px',
					background: 'white',
					borderRadius: '16px',
					width: '350px',
					boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
				}}>
					<h3 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>
						Hover Card Test
					</h3>
					<p style={{ margin: 0, color: '#64748b' }}>
						This card should scale up, glow blue, and lift when you hover!
					</p>
				</div>
			</HoverEffect>

			{/* Test 3: WebHover Effect */}
			<WebHover webColor="#10b981" maxDistance={400}>
				<div style={{
					padding: '32px',
					background: '#1e293b',
					borderRadius: '16px',
					width: '350px',
					color: 'white'
				}}>
					<h3 style={{ margin: '0 0 12px 0' }}>
						Web Shooting Test
					</h3>
					<p style={{ margin: 0, opacity: 0.8 }}>
						Move your mouse around - a green web should shoot toward your cursor!
					</p>
				</div>
			</WebHover>

			{/* Test 4: Combined Effects */}
			<WebHover webColor="#ec4899">
				<HoverEffect accentColor="#ec4899" scaleAmount={1.12}>
					<button style={{
						padding: '24px 48px',
						background: 'linear-gradient(135deg, #ec4899, #db2777)',
						color: 'white',
						border: 'none',
						borderRadius: '16px',
						fontSize: '20px',
						fontWeight: 'bold',
						cursor: 'pointer'
					}}>
						🕷️ COMBINED EFFECT
					</button>
				</HoverEffect>
			</WebHover>
		</div>
	);
};

export default TestHoverEffects;
