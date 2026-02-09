import { ArrowRight, BarChart3, Globe, Zap } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export function Landing({ onStart }: LandingProps) {
    return (
        <div className="landing-container" style={{ padding: '6rem 0', textAlign: 'center' }}>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', background: 'var(--color-primary-50)', borderRadius: '50%', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Globe size={32} />
                </div>
                <div style={{ padding: '1.5rem', background: 'var(--color-primary-50)', borderRadius: '50%', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BarChart3 size={32} />
                </div>
                <div style={{ padding: '1.5rem', background: 'var(--color-primary-50)', borderRadius: '50%', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={32} />
                </div>
            </div>

            <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--color-neutral-900)', letterSpacing: '-0.025em', lineHeight: '1.1' }}>
                AI-Powered Market Research<br />
                <span style={{
                    background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Simpler, Faster, Smarter.
                </span>
            </h1>

            <p style={{ fontSize: '1.25rem', color: 'var(--color-neutral-500)', maxWidth: '700px', margin: '0 auto 3.5rem', lineHeight: '1.6' }}>
                Generate comprehensive market analysis, competitor insights, and strategic recommendations in seconds using advanced AI. No more hours of manual research.
            </p>

            <button
                onClick={onStart}
                style={{
                    backgroundColor: 'var(--color-primary-600)',
                    color: 'white',
                    padding: '1rem 2.5rem',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.2), 0 4px 6px -2px rgba(79, 70, 229, 0.1)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'var(--transition-normal)',
                    border: 'none',
                    cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-700)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-600)';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                Start Analysis <ArrowRight size={20} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '8rem', textAlign: 'left' }}>
                {[
                    { icon: <Globe size={24} />, title: 'Global Coverage', desc: 'Analyze markets across 190+ countries with localized insights.' },
                    { icon: <BarChart3 size={24} />, title: 'Deep Analytics', desc: 'Get precise data on market size, CAGR, and key trends.' },
                    { icon: <Zap size={24} />, title: 'Real-time Updates', desc: 'Access the latest market shifts and competitor moves instantly.' }
                ].map((feature, i) => (
                    <div key={i} style={{ padding: '2rem', background: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-neutral-200)', transition: 'var(--transition-normal)' }}>
                        <div style={{ color: 'var(--color-primary-600)', marginBottom: '1rem', padding: '0.75rem', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>{feature.icon}</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-neutral-800)' }}>{feature.title}</h3>
                        <p style={{ color: 'var(--color-neutral-500)', lineHeight: '1.6' }}>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
