import { useState } from 'react';
import { Search, MapPin, Building2, Wallet, ArrowRight } from 'lucide-react';

interface AnalysisFormProps {
    onSubmit: (data: any) => void;
}

export function AnalysisForm({ onSubmit }: AnalysisFormProps) {
    const [formData, setFormData] = useState({
        country: '',
        industry: '',
        companyType: 'startup',
        budget: '10k-50k'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.country || !formData.industry) return;
        onSubmit(formData);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-neutral-200)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-neutral-900)' }}>Configure Your Analysis</h2>
            <p style={{ textAlign: 'center', marginBottom: '2.5rem', color: 'var(--color-neutral-500)' }}>Tell us about your target market to generate a custom report.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-neutral-700)', fontSize: '0.875rem' }}>
                        Target Country
                    </label>
                    <div style={{ position: 'relative' }}>
                        <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neutral-400)' }} />
                        <input
                            type="text"
                            placeholder="e.g. United States, Germany, Brazil"
                            style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-300)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            required
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-600)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-neutral-300)'}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-neutral-700)', fontSize: '0.875rem' }}>
                        Industry / Niche
                    </label>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neutral-400)' }} />
                        <input
                            type="text"
                            placeholder="e.g. SaaS, Renewable Energy, E-commerce"
                            style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-300)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            required
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-600)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-neutral-300)'}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-neutral-700)', fontSize: '0.875rem' }}>
                            Company Type
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Building2 size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neutral-400)' }} />
                            <select
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-300)', fontSize: '1rem', appearance: 'none', background: 'white', outline: 'none', transition: 'border-color 0.2s', cursor: 'pointer' }}
                                value={formData.companyType}
                                onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-600)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-neutral-300)'}
                            >
                                <option value="startup">Startup</option>
                                <option value="sme">Small Business (SME)</option>
                                <option value="enterprise">Enterprise</option>
                                <option value="agency">Agency / Consultancy</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-neutral-700)', fontSize: '0.875rem' }}>
                            Budget Range
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Wallet size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-neutral-400)' }} />
                            <select
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-300)', fontSize: '1rem', appearance: 'none', background: 'white', outline: 'none', transition: 'border-color 0.2s', cursor: 'pointer' }}
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary-600)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-neutral-300)'}
                            >
                                <option value="<10k">&lt; $10k</option>
                                <option value="10k-50k">$10k - $50k</option>
                                <option value="50k-200k">$50k - $200k</option>
                                <option value="200k+">$200k+</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    style={{
                        marginTop: '1rem',
                        backgroundColor: 'var(--color-neutral-900)',
                        color: 'white',
                        padding: '1rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        borderRadius: 'var(--radius-md)',
                        transition: 'var(--transition-normal)',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-md)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'black';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-neutral-900)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Generate Report <ArrowRight size={18} />
                </button>
            </form>
        </div>
    );
}
