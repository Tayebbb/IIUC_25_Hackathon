import React from 'react';
import SimpleHoverEffect from './SimpleHoverEffect';
import SimpleWebEffect from './SimpleWebEffect';

const TestHoverEffects = () => {
	return (
		<div style={{
			padding: '100px',
			display: 'flex',
			flexDirection: 'column',
			gap: '100px',
			alignItems: 'center',
			background: 'linear-gradient(135deg, #1e293b, #334155)',
			minHeight: '100vh'
		}}>
			<h1 style={{ 
				color: 'white', 
				fontSize: '48px',
				textShadow: '0 4px 20px rgba(0,0,0,0.5)'
			}}>
				🎯 HOVER EFFECT TESTS
			</h1>

			{/* Test 1: GREEN BUTTON */}
			<div>
				<p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
					Test 1: Hover the button below
				</p>
				<SimpleHoverEffect accentColor="#10b981">
					<button style={{
						padding: '24px 48px',
						background: 'linear-gradient(135deg, #10b981, #059669)',
						color: 'white',
						border: 'none',
						borderRadius: '12px',
						fontSize: '20px',
						fontWeight: 'bold',
						cursor: 'pointer'
					}}>
						HOVER ME NOW
					</button>
				</SimpleHoverEffect>
			</div>

			{/* Test 2: BLUE CARD */}
			<div>
				<p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
					Test 2: Hover the card below
				</p>
				<SimpleHoverEffect accentColor="#3b82f6">
					<div style={{
						padding: '40px',
						background: 'white',
						borderRadius: '16px',
						width: '400px',
						boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
					}}>
						<h2 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '28px' }}>
							HOVER THIS CARD
						</h2>
						<p style={{ margin: 0, color: '#64748b', fontSize: '16px' }}>
							You should see it scale up, glow blue, and lift dramatically!
						</p>
					</div>
				</SimpleHoverEffect>
			</div>

			{/* Test 3: WEB SHOOTING */}
			<div>
				<p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
					Test 3: Move your mouse around this element
				</p>
				<SimpleWebEffect webColor="#10b981">
					<div style={{
						padding: '40px',
						background: '#1e293b',
						borderRadius: '16px',
						width: '400px',
						border: '2px solid #10b981',
						color: 'white'
					}}>
						<h2 style={{ margin: '0 0 16px 0', fontSize: '28px' }}>
							🕷️ WEB SHOOTER
						</h2>
						<p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
							A green web line should shoot toward your cursor!
						</p>
					</div>
				</SimpleWebEffect>
			</div>

			{/* Test 4: COMBINED */}
			<div>
				<p style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
					Test 4: Combined effect
				</p>
				<SimpleWebEffect webColor="#ec4899">
					<SimpleHoverEffect accentColor="#ec4899">
						<button style={{
							padding: '32px 64px',
							background: 'linear-gradient(135deg, #ec4899, #db2777)',
							color: 'white',
							border: 'none',
							borderRadius: '16px',
							fontSize: '24px',
							fontWeight: 'bold',
							cursor: 'pointer'
						}}>
							🚀 ULTIMATE HOVER
						</button>
					</SimpleHoverEffect>
				</SimpleWebEffect>
			</div>

			{/* Visual Confirmation Test */}
			<div style={{
				padding: '40px',
				background: 'rgba(255,255,255,0.1)',
				borderRadius: '16px',
				color: 'white',
				textAlign: 'center'
			}}>
				<h3 style={{ marginBottom: '16px' }}>Can you see this text clearly?</h3>
				<p style={{ marginBottom: '16px' }}>If YES ✅ - hover effects should work</p>
				<p>If NO ❌ - there's a rendering issue</p>
			</div>
		</div>
	);
};

export default TestHoverEffects;
