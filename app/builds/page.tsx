"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '../../components/theme-toggle';

type BuildCategory = {
  title: string;
  icon: string;
  description: string;
  status: 'available' | 'coming-soon';
  href?: string;
};

const builds: BuildCategory[] = [
  {
    title: "HelpMate",
    icon: "⚡",
    description: "Modern project management with HTMX - Issues, Cycles, Modules, Pages, Analytics & more",
    status: "available",
    href: "https://helpmate-tau.vercel.app",
  },
  {
    title: "Games",
    icon: "🎮",
    description: "Interactive games and entertainment experiences",
    status: "available",
    href: "/games",
  },
  {
    title: "SteadFast iOS App",
    icon: "🧘",
    description: "A fasting & meditation iOS app where users care for a blob companion that grows with their consistency. Built with Swift.",
    status: "available",
    href: "https://github.com/rudeboydamn/SteadFast",
  },
  {
    title: "3D Printer Builds",
    icon: "🖨️",
    description: "Custom 3D printing projects and designs",
    status: "coming-soon",
  },
  {
    title: "Data Dashboards",
    icon: "📊",
    description: "Interactive data visualization and reporting tools",
    status: "coming-soon",
  },
];

export default function BuildsPage() {
  const [showHelpmateWarning, setShowHelpmateWarning] = useState(false);

  const handleHelpmateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowHelpmateWarning(true);
  };

  const confirmRedirect = () => {
    window.location.href = "https://helpmate-tau.vercel.app";
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--background)', 
      color: 'rgba(255,255,255,0.9)', 
      fontFamily: "'Poppins', sans-serif", 
      padding: '2rem' 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary-color: #667eea;
          --text-color: rgba(255,255,255,0.9);
          --background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }

        [data-theme="dark"] {
          --primary-color: #60a5fa;
          --background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        .builds-container { max-width: 1000px; margin: 0 auto; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .page-title { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .page-subtitle { color: rgba(255,255,255,0.7); margin-bottom: 3rem; font-size: 1.1rem; }
        .builds-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .build-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 20px; padding: 2rem; border: 1px solid rgba(255,255,255,0.1); transition: transform 0.3s, box-shadow 0.3s; cursor: pointer; text-decoration: none; display: block; }
        .build-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .build-card.coming-soon { opacity: 0.7; cursor: default; }
        .build-card.coming-soon:hover { transform: none; }
        .build-icon { font-size: 3rem; margin-bottom: 1rem; }
        .build-icon-img { width: 64px; height: 64px; border-radius: 16px; object-fit: cover; margin-bottom: 1rem; }
        .build-title { font-size: 1.3rem; color: white; margin-bottom: 0.5rem; }
        .build-desc { color: rgba(255,255,255,0.7); font-size: 0.95rem; line-height: 1.6; }
        .build-status { display: inline-block; margin-top: 1rem; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .status-available { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .status-coming { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
        .old-fashioned-toggle{position:absolute;top:2rem;right:2rem;z-index:100}.toggle-switch{background:none;border:none;cursor:pointer;padding:0;width:80px;height:60px;position:relative;outline:none}.toggle-lever{position:absolute;top:0;width:35px;height:50px;background:#d4af37;border-radius:4px;border:2px solid #8b7355;box-shadow:0 2px 4px rgba(0,0,0,0.3);transition:transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55),background-color 0.3s ease;z-index:2;left:0}.toggle-lever:hover{box-shadow:0 4px 8px rgba(0,0,0,0.4);transform:scale(1.05)}.toggle-switch.active .toggle-lever{transform:translateX(35px);background:#4a5568;border-color:#2d3748}.lever-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:16px;font-weight:bold;transition:opacity 0.3s ease}.light-text{opacity:1;color:#ffd700}.dark-text{opacity:0;color:#e2e8f0}.toggle-switch.active .light-text{opacity:0}.toggle-switch.active .dark-text{opacity:1}.toggle-base{position:absolute;top:20px;left:0;width:70px;height:20px;background:#8b7355;border-radius:10px;border:2px solid #654321;box-shadow:inset 0 2px 4px rgba(0,0,0,0.3)}.base-plate{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(90deg,#a08050 0%,#8b7355 50%,#a08050 100%);border-radius:8px}
        .builds-footer { text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); }
        .builds-footer a { color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.3s; }
        .builds-footer a:hover { color: white; }
        @media (max-width: 768px) {
          .builds-container { padding: 0; }
          .page-title { font-size: 1.8rem; }
          .page-subtitle { font-size: 0.95rem; margin-bottom: 2rem; }
          .builds-grid { grid-template-columns: 1fr; gap: 1rem; }
          .build-card { padding: 1.5rem; }
          .build-icon { font-size: 2.5rem; }
          .build-title { font-size: 1.1rem; }
          .build-desc { font-size: 0.9rem; }
          .old-fashioned-toggle { top: 1rem; right: 1rem; transform: scale(0.8); }
        }
        @media (max-width: 480px) {
          .build-card { padding: 1.25rem; border-radius: 15px; }
          .page-title { font-size: 1.5rem; }
        }
      `}</style>
      
      <div className="builds-container">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
        
        <ThemeToggle />
        
        <h1 className="page-title">Builds</h1>
        <p className="page-subtitle">Projects, experiments, and creative builds</p>

        <div className="builds-grid">
          {builds.map((build) => (
            build.status === 'available' && build.href ? (
              build.title === 'HelpMate' ? (
                <a key={build.title} href={build.href} onClick={handleHelpmateClick} className="build-card">
                  <div className="build-icon">{build.icon}</div>
                  <h3 className="build-title">{build.title}</h3>
                  <p className="build-desc">{build.description}</p>
                  <span className="build-status status-available">Explore →</span>
                </a>
              ) : build.title === 'SteadFast iOS App' ? (
                <a key={build.title} href={build.href} target="_blank" rel="noopener noreferrer" className="build-card">
                  <Image src="/img/stead.jpg" alt="SteadFast App" width={64} height={64} className="build-icon-img" />
                  <h3 className="build-title">{build.title}</h3>
                  <p className="build-desc">{build.description}</p>
                  <span className="build-status status-available" style={{ fontSize: '0.75rem' }}>View on GitHub (Private Repo) →</span>
                </a>
              ) : (
                <Link key={build.title} href={build.href} className="build-card">
                  <div className="build-icon">{build.icon}</div>
                  <h3 className="build-title">{build.title}</h3>
                  <p className="build-desc">{build.description}</p>
                  <span className="build-status status-available">Explore →</span>
                </Link>
              )
            ) : (
              <div key={build.title} className={`build-card ${build.status === 'coming-soon' ? 'coming-soon' : ''}`}>
                <div className="build-icon">{build.icon}</div>
                <h3 className="build-title">{build.title}</h3>
                <p className="build-desc">{build.description}</p>
                <span className="build-status status-coming">Coming Soon</span>
              </div>
            )
          ))}
        </div>

        <div className="builds-footer">
          <p><Link href="/">← dammyhenry.com</Link></p>
        </div>

        {/* HelpMate Redirect Warning Modal */}
        {showHelpmateWarning && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              padding: '2.5rem',
              maxWidth: '450px',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>
                Leaving dammyhenry.com
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                You are about to be redirected to the HelpMate project app. Once you leave, there is no direct way to return to this site.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                Use your browser&apos;s back button or navigate to dammyhenry.com to return.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowHelpmateWarning(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    background: 'transparent',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.3s'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRedirect}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.3s'
                  }}
                >
                  Continue to HelpMate →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
