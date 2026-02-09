import { useState, useMemo } from 'react';
import {
    Building2,
    Globe,
    Wallet,
    Printer,
    RefreshCcw,
    ChevronDown,
    ChevronRight,
    Menu,
    PieChart
} from 'lucide-react';
import { parseReportHtml } from '../utils/reportParser';

interface ExecutiveDashboardProps {
    htmlContent: string;
    onReset: () => void;
    meta: {
        country: string;
        industry: string;
        budget: string;
    };
}

export function ExecutiveDashboard({ htmlContent, onReset, meta }: ExecutiveDashboardProps) {
    const sections = useMemo(() => parseReportHtml(htmlContent), [htmlContent]);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
        sections.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
    );
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSection = (id: string) => {
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handlePrint = () => {
        window.print();
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div className="dashboard-wrapper">
            {/* --- PRINT ONLY CONTENT --- */}
            <div className="print-only">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>

            {/* --- INTERACTIVE DASHBOARD UI --- */}
            <div className="dashboard-ui">
                {/* Sidebar Navigation */}
                <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                    <div className="sidebar-header">
                        <div className="logo">
                            <PieChart size={24} />
                            <span>MarketMind</span>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(section.id)}
                            >
                                {section.title}
                            </button>
                        ))}
                    </nav>
                    <div className="sidebar-footer">
                        <button onClick={onReset} className="reset-btn">
                            <RefreshCcw size={16} /> New Analysis
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="main-content">
                    {/* Header / Hero */}
                    <header className="dashboard-header">
                        <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu size={24} />
                        </button>
                        <h1>Strategic Market Analysis <span className="sub-header">– Market Entry Report</span></h1>
                        <button className="print-btn" onClick={handlePrint}>
                            <Printer size={18} /> Save as PDF (Executive Report)
                        </button>
                    </header>

                    {/* Context Cards */}
                    <div className="context-grid">
                        <div className="context-card">
                            <Globe className="icon" size={20} />
                            <div className="info">
                                <span className="label">Target Market</span>
                                <span className="value">{meta.country}</span>
                            </div>
                        </div>
                        <div className="context-card">
                            <Building2 className="icon" size={20} />
                            <div className="info">
                                <span className="label">Industry</span>
                                <span className="value">{meta.industry}</span>
                            </div>
                        </div>
                        <div className="context-card">
                            <Wallet className="icon" size={20} />
                            <div className="info">
                                <span className="label">Budget Level</span>
                                <span className="value">{meta.budget}</span>
                            </div>
                        </div>
                    </div>

                    {/* Report Sections */}
                    <div className="sections-container">
                        {sections.map((section) => (
                            <div key={section.id} id={section.id} className="section-card">
                                <div
                                    className="section-header"
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <h2>{section.title}</h2>
                                    {expandedSections[section.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </div>

                                {expandedSections[section.id] && (
                                    <div
                                        className="section-content prose"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <style>{`
            :root {
                --sidebar-width: 260px;
                --header-height: 70px;
                --bg-color: #f8fafc;
                --card-bg: #ffffff;
                --text-primary: #0f172a;
                --text-secondary: #64748b;
                --accent-color: #2563eb;
                --border-color: #e2e8f0;
            }

            .dashboard-wrapper {
                min-height: 100vh;
                background-color: var(--bg-color);
                font-family: 'Inter', system-ui, sans-serif;
                color: var(--text-primary);
            }

            /* --- LAYOUT --- */
            .dashboard-ui {
                display: flex;
                min-height: 100vh;
            }

            .sidebar {
                width: var(--sidebar-width);
                background-color: white;
                border-right: 1px solid var(--border-color);
                display: flex;
                flex-direction: column;
                position: fixed;
                height: 100vh;
                top: 0;
                left: 0;
                z-index: 50;
                transition: transform 0.3s ease;
            }

            .sidebar.closed {
                transform: translateX(-100%);
            }

            .main-content {
                flex: 1;
                margin-left: var(--sidebar-width);
                padding: 2rem;
                transition: margin-left 0.3s ease;
            }

            .sidebar.closed + .main-content {
                margin-left: 0;
            }

            /* --- SIDEBAR COMPONENTS --- */
            .sidebar-header {
                height: var(--header-height);
                display: flex;
                align-items: center;
                padding: 0 1.5rem;
                border-bottom: 1px solid var(--border-color);
            }

            .logo {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-weight: 700;
                font-size: 1.25rem;
                color: var(--text-primary);
            }

            .sidebar-nav {
                flex: 1;
                padding: 1.5rem 0;
                overflow-y: auto;
            }

            .nav-item {
                display: block;
                width: 100%;
                text-align: left;
                padding: 0.75rem 1.5rem;
                background: none;
                border: none;
                font-size: 0.925rem;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.2s;
                border-left: 3px solid transparent;
            }

            .nav-item:hover {
                background-color: var(--bg-color);
                color: var(--text-primary);
            }

            .nav-item.active {
                background-color: #eff6ff;
                color: var(--accent-color);
                border-left-color: var(--accent-color);
                font-weight: 600;
            }
            
            .sidebar-footer {
                padding: 1.5rem;
                border-top: 1px solid var(--border-color);
            }

            .reset-btn {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 0.75rem;
                background-color: var(--bg-color);
                border: 1px solid var(--border-color);
                border-radius: 6px;
                color: var(--text-secondary);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .reset-btn:hover {
                background-color: var(--text-primary);
                color: white;
            }

            /* --- HEADER & HERO --- */
            .dashboard-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }

            .dashboard-header h1 {
                font-size: 1.5rem;
                font-weight: 700;
                margin: 0;
                display: flex;
                flex-direction: column;
            }

            .sub-header {
                font-size: 1rem;
                font-weight: 400;
                color: var(--text-secondary);
                margin-top: 0.25rem;
            }

            .menu-toggle {
                display: none; /* Only show on mobile */
                background: none;
                border: none;
                cursor: pointer;
            }

            .print-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1.25rem;
                background-color: var(--text-primary);
                color: white;
                border: none;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: background 0.2s;
            }

            .print-btn:hover {
                background-color: #334155;
            }

            /* --- CONTEXT CARDS --- */
            .context-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 3rem;
            }

            .context-card {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }

            .context-card .icon {
                padding: 0.5rem;
                background-color: #eff6ff;
                color: var(--accent-color);
                border-radius: 6px;
                box-sizing: content-box;
            }

            .context-card .info {
                display: flex;
                flex-direction: column;
            }

            .context-card .label {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: var(--text-secondary);
                margin-bottom: 0.25rem;
            }

            .context-card .value {
                font-size: 1.125rem;
                font-weight: 700;
                color: var(--text-primary);
            }

            /* --- CONTENT SECTIONS --- */
            .sections-container {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }

            .section-card {
                background: white;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                overflow: hidden;
            }

            .section-header {
                padding: 1.5rem 2rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                background-color: white;
                transition: background 0.2s;
            }

            .section-header:hover {
                background-color: var(--bg-color);
            }

            .section-header h2 {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
                color: var(--text-primary);
            }

            .section-content {
                padding: 0 2rem 2rem 2rem;
                border-top: 1px solid var(--border-color);
                animation: slideDown 0.3s ease-out;
            }

            /* --- TYPOGRAPHY (PROSE) --- */
            .prose h1, .prose h2, .prose h3 { margin-top: 0; display: none; /* Hide internal headers as they are duplicated in card header */ } 
            
            /* Re-enable h3 for sub-sections */
            .prose h3 { display: block; font-size: 1.125rem; margin-top: 1.5rem; margin-bottom: 0.75rem; color: var(--text-primary); }
            
            .prose p { margin-bottom: 1rem; line-height: 1.6; color: var(--text-secondary); }
            .prose ul, .prose ol { margin-bottom: 1rem; padding-left: 1.5rem; color: var(--text-secondary); }
            .prose li { margin-bottom: 0.5rem; }
            .prose strong { font-weight: 600; color: var(--text-primary); }
            
            .prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.875rem; }
            .prose th { background-color: var(--bg-color); padding: 0.75rem 1rem; text-align: left; font-weight: 600; color: var(--text-primary); border-bottom: 2px solid var(--border-color); }
            .prose td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); }

            .prose blockquote { border-left: 4px solid var(--accent-color); padding-left: 1rem; margin: 1.5rem 0; font-style: italic; background-color: #eff6ff; padding: 1rem; border-radius: 0 4px 4px 0; }

            /* --- PRINT MEDIA QUERY --- */
            .print-only {
                display: none;
            }

            @media print {
                .dashboard-ui {
                    display: none !important;
                }
                .print-only {
                    display: block !important;
                    font-family: 'Times New Roman', serif;
                    line-height: 1.5;
                    font-size: 12pt;
                    color: black;
                    background: white;
                }
                
                .print-only h1 { font-size: 24pt; font-weight: bold; margin-bottom: 24pt; text-align: center; }
                .print-only h2 { font-size: 18pt; font-weight: bold; margin-top: 24pt; margin-bottom: 12pt; border-bottom: 1px solid black; }
                .print-only p { margin-bottom: 12pt; text-align: justify; }
                .print-only table { width: 100%; border-collapse: collapse; margin-bottom: 18pt; }
                .print-only th, .print-only td { border: 1px solid black; padding: 6pt; }
                
                @page {
                    margin: 1in;
                }
            }

            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* Mobile Responsiveness */
            @media (max-width: 768px) {
                .sidebar { transform: translateX(-100%); width: 100%; }
                .sidebar.open { transform: translateX(0); }
                .main-content { margin-left: 0; }
                .menu-toggle { display: block; margin-right: 1rem; }
                .dashboard-header h1 { font-size: 1.25rem; }
            }
        `}</style>
        </div>
    );
}
