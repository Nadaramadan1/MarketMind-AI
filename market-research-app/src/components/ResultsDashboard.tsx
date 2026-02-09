import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, ArrowUpRight, Users, Target } from 'lucide-react';

interface ResultsDashboardProps {
    data: any; // Mock data
    onReset: () => void;
}

export function ResultsDashboard({ data, onReset }: ResultsDashboardProps) {
    // Mock data based on input or static
    const marketSize = "$42.8B";
    const cagr = "+12.5%";

    return (
        <div className="results-container" style={{ padding: '2rem 0 4rem', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-neutral-900)' }}>Market Analysis Report</h2>
                    <p style={{ color: 'var(--color-neutral-500)' }}>Generated for <strong style={{ color: 'var(--color-neutral-900)' }}>{data.industry}</strong> in <strong style={{ color: 'var(--color-neutral-900)' }}>{data.country}</strong></p>
                </div>
                <button
                    onClick={onReset}
                    style={{
                        padding: '0.75rem 1.5rem',
                        border: '1px solid var(--color-neutral-300)',
                        backgroundColor: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        color: 'var(--color-neutral-700)',
                        cursor: 'pointer',
                        transition: 'var(--transition-normal)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-neutral-50)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                    New Analysis
                </button>
            </div>

            {/* Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-neutral-200)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-neutral-500)' }}>
                        <Target size={20} />
                        <span style={{ fontWeight: '500' }}>Total Addressable Market</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-neutral-900)' }}>{marketSize}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-success-600)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <TrendingUp size={14} /> Growing steadily
                    </div>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-neutral-200)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-neutral-500)' }}>
                        <BarChart3 size={20} />
                        <span style={{ fontWeight: '500' }}>CAGR (2024-2030)</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-neutral-900)' }}>{cagr}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-success-600)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ArrowUpRight size={14} /> High growth potential
                    </div>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-neutral-200)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-neutral-500)' }}>
                        <Users size={20} />
                        <span style={{ fontWeight: '500' }}>Key Competitors</span>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-neutral-900)' }}>12</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500)', marginTop: '0.5rem' }}>
                        Dominating 65% of market share
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>

                {/* Market Trends / Competitors */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-neutral-200)', gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Top Competitors & Market Share</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {[
                            { name: 'TechGiant Corp', share: 35 },
                            { name: 'InnovateX', share: 22 },
                            { name: 'GlobalSolutions', share: 15 },
                            { name: 'Others', share: 28 }
                        ].map((comp, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                                    <span>{comp.name}</span>
                                    <span>{comp.share}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'var(--color-neutral-100)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{ width: `${comp.share}%`, height: '100%', background: i === 3 ? 'var(--color-neutral-300)' : 'var(--color-primary-600)', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SWOT Analysis */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', gridColumn: 'span 1' }}>
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-neutral-200)', borderLeft: '4px solid var(--color-success-500)' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={18} color="var(--color-success-600)" /> Opportunities
                        </h3>
                        <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-neutral-600)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Rising demand for AI-driven solutions in {data.industry}.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Untapped market segments in rural areas of {data.country}.</li>
                            <li>Potential for strategic partnerships with local providers.</li>
                        </ul>
                    </div>

                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-neutral-200)', borderLeft: '4px solid #f59e0b' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertTriangle size={18} color="#f59e0b" /> Risks
                        </h3>
                        <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-neutral-600)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Increasing regulatory scrutiny in {data.country}.</li>
                            <li style={{ marginBottom: '0.5rem' }}>High customer acquisition costs for {data.companyType}s.</li>
                            <li>Rapid technological obsolescence.</li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Recommendations */}
            <div style={{ background: 'var(--color-neutral-900)', color: 'white', padding: '2.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xl)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle size={24} color="var(--color-success-500)" /> Strategic Recommendations
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--color-primary-100)' }}>Market Entry</h4>
                        <p style={{ color: 'var(--color-neutral-300)', lineHeight: '1.6' }}>
                            Focus on a tiered pricing model to capture both SME and Enterprise segments. Leverage digital channels for initial traction.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--color-primary-100)' }}>Product Differentiation</h4>
                        <p style={{ color: 'var(--color-neutral-300)', lineHeight: '1.6' }}>
                            Invest in localized features specific to {data.country}'s compliance requirements to outperform global competitors.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--color-primary-100)' }}>Growth Strategy</h4>
                        <p style={{ color: 'var(--color-neutral-300)', lineHeight: '1.6' }}>
                            Formulate a partnership ecosystem with existing consulting firms to accelerate enterprise adoption.
                        </p>
                    </div>
                </div>
            </div>
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
