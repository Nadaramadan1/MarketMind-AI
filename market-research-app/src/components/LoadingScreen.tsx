import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <div style={{ position: 'relative' }}>
                <Loader2 size={48} className="spin-animation" style={{ color: 'var(--color-primary-600)' }} />
            </div>
            <h3 style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-neutral-900)' }}>Analyzing Market Data</h3>
            <p style={{ marginTop: '0.5rem', color: 'var(--color-neutral-500)', fontSize: '1.125rem' }}>Scanning 50M+ data points to generate insights...</p>

            <div style={{ width: '240px', height: '4px', background: 'var(--color-neutral-200)', marginTop: '2rem', borderRadius: '2px', overflow: 'hidden' }}>
                <div className="progress-bar" style={{ width: '100%', height: '100%', background: 'var(--color-primary-600)', transformOrigin: '0% 50%' }}></div>
            </div>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); }
          100% { transform: scaleX(1); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        .progress-bar {
          animation: progress 2.5s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
