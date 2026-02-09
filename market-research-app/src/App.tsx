import { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Landing } from './components/Landing';
import { AnalysisForm } from './components/AnalysisForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import './index.css';

type ViewState = 'landing' | 'input' | 'loading' | 'results' | 'error';

// --- API Interfaces ---
interface AnalysisRequest {
  country: string;
  industry: string;
  companyType: string;
  budget: string;
}

interface AnalysisResponse {
  marketSize: string;
  cagr: string;
  competitors: number;
  marketShare: { name: string; share: number }[];
  opportunities: string[];
  risks: string[];
  recommendations: { title: string; description: string }[];
}
// ----------------------

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [results, setResults] = useState<AnalysisResponse | string | null>(null);
  const [requestData, setRequestData] = useState<AnalysisRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStart = () => setView('input');

  const handleFormSubmit = async (formData: AnalysisRequest) => {
    setView('loading');
    setRequestData(formData);
    setErrorMessage(null);
    try {
      const response = await fetch('http://localhost:5000/api/start-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Optional: 'x-api-key': 'YOUR_SECRET_KEY'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data: AnalysisResponse | string;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      setResults(data);
      setView('results');
    } catch (error: any) {
      console.error('❌ Error calling n8n workflow:', error);
      setErrorMessage('There was an error processing your request. Please try again.');
      setView('error');
    }
  };

  const handleReset = () => {
    setResults(null);
    setRequestData(null);
    setErrorMessage(null);
    setView('input');
  };


  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1.25rem 2rem', borderBottom: '1px solid var(--color-neutral-200)', backgroundColor: 'white/80', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
            onClick={() => setView('landing')}
          >
            <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--color-primary-600)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <LayoutDashboard size={20} />
            </div>
            <span style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--color-neutral-900)' }}>MarketMind AI</span>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500)' }}>
            Research Assistant v1.0
          </div>
        </div>
      </header>

      <main style={{ flex: 1, width: '100%', maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 2rem' }}>
        {view === 'landing' && <Landing onStart={handleStart} />}
        {view === 'input' && <AnalysisForm onSubmit={handleFormSubmit} />}
        {view === 'loading' && <LoadingScreen />}
        {view === 'results' && results && (
          typeof results === 'string' ? (
            <ExecutiveDashboard
              htmlContent={results}
              onReset={handleReset}
              meta={{
                country: requestData?.country || 'Unknown',
                industry: requestData?.industry || 'Unknown',
                budget: requestData?.budget || 'Unknown'
              }}
            />
          ) : requestData ? (
            <ResultsDashboard data={{ ...results, industry: requestData.industry, country: requestData.country, companyType: requestData.companyType }} onReset={handleReset} />
          ) : null
        )}
        {view === 'error' && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ef4444' }}>Oops! Something went wrong.</h2>
            <p style={{ color: 'var(--color-neutral-600)', marginBottom: '2rem' }}>{errorMessage || 'An unexpected error occurred.'}</p>
            <button
              onClick={() => setView('input')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--color-primary-600)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </main>

      <footer style={{ padding: '2rem', borderTop: '1px solid var(--color-neutral-200)', textAlign: 'center', color: 'var(--color-neutral-500)', fontSize: '0.875rem', marginTop: 'auto' }}>
        © 2026 MarketMind AI. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
