"use client";

import React from 'react';
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
    title: "Sidekick",
    icon: "🤖",
    description: "AI-powered knowledge generation with Wikipedia-style articles and collaborative research",
    status: "available",
    href: "/sidekick",
  },
  {
    title: "Games",
    icon: "🎮",
    description: "Interactive games and entertainment experiences",
    status: "available",
    href: "/games",
  },
  {
    title: "3D Printer Builds",
    icon: "🖨️",
    description: "Custom 3D printing projects and designs",
    status: "coming-soon",
  },
  {
    title: "CRM Logics",
    icon: "💼",
    description: "Customer relationship management solutions and automations",
    status: "coming-soon",
  },
  {
    title: "Automation Scripts",
    icon: "⚙️",
    description: "RPA and workflow automation tools",
    status: "coming-soon",
  },
  {
    title: "Data Dashboards",
    icon: "📊",
    description: "Interactive data visualization and reporting tools",
    status: "coming-soon",
  },
  {
    title: "Web Templates",
    icon: "🌐",
    description: "Reusable web design templates and components",
    status: "coming-soon",
  },
];

export default function BuildsPage() {
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
        .build-title { font-size: 1.3rem; color: white; margin-bottom: 0.5rem; }
        .build-desc { color: rgba(255,255,255,0.7); font-size: 0.95rem; line-height: 1.6; }
        .build-status { display: inline-block; margin-top: 1rem; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .status-available { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .status-coming { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
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
              <Link key={build.title} href={build.href} className="build-card">
                <div className="build-icon">{build.icon}</div>
                <h3 className="build-title">{build.title}</h3>
                <p className="build-desc">{build.description}</p>
                <span className="build-status status-available">Explore →</span>
              </Link>
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
      </div>
      
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
