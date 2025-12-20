"use client";

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/theme-toggle';

export default function SidekickPage() {
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
          --secondary-color: #764ba2;
          --text-color: rgba(255,255,255,0.9);
          --background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }

        [data-theme="dark"] {
          --primary-color: #60a5fa;
          --background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        .sidekick-container { max-width: 1200px; margin: 0 auto; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .page-title { font-size: 3rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea, #764ba2, #f093fb); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradientShift 3s ease-in-out infinite; text-align: center; }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .page-subtitle { color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1.2rem; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto; }
        
        .hero-buttons { display: flex; justify-content: center; gap: 1rem; margin-bottom: 4rem; flex-wrap: wrap; }
        .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 1rem 2rem; border-radius: 50px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; cursor: pointer; border: none; font-size: 1rem; }
        .btn-primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); }
        .btn-secondary { background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; }
        .btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4); }
        
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin-bottom: 4rem; }
        .feature-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 25px; padding: 2.5rem; border: 1px solid rgba(255,255,255,0.1); transition: all 0.4s ease; }
        .feature-card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px rgba(0,0,0,0.2); border-color: rgba(255,255,255,0.2); }
        
        .feature-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .feature-icon { width: 60px; height: 60px; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; }
        .feature-icon.purple { background: rgba(139, 92, 246, 0.2); color: #a78bfa; }
        .feature-icon.indigo { background: rgba(99, 102, 241, 0.2); color: #818cf8; }
        .feature-title { font-size: 1.5rem; font-weight: 700; color: white; }
        .feature-desc { color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 1.5rem; }
        
        .feature-list { list-style: none; padding: 0; margin: 0 0 1.5rem 0; }
        .feature-list li { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; color: rgba(255,255,255,0.8); }
        .check-icon { color: #10b981; font-size: 1.2rem; }
        
        .feature-btn { display: block; width: 100%; text-align: center; padding: 1rem; border-radius: 15px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; }
        .feature-btn.purple { background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; }
        .feature-btn.purple:hover { box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4); }
        .feature-btn.indigo { background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; }
        .feature-btn.indigo:hover { box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4); }
        
        .stats-section { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 25px; padding: 3rem; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 2rem; }
        .stats-title { font-size: 1.8rem; font-weight: 700; color: white; text-align: center; margin-bottom: 2rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; text-align: center; }
        .stat-value { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        .stat-value.purple { color: #a78bfa; }
        .stat-value.indigo { color: #818cf8; }
        .stat-value.pink { color: #f472b6; }
        .stat-label { color: rgba(255,255,255,0.7); font-size: 0.95rem; }
        
        @media (max-width: 768px) {
          .page-title { font-size: 2rem; }
          .page-subtitle { font-size: 1rem; }
          .features-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .hero-buttons { flex-direction: column; align-items: center; }
          .btn { width: 100%; max-width: 300px; justify-content: center; }
        }
      `}</style>
      
      <div className="sidekick-container">
        <Link href="/builds" className="back-link">
          ← Back to Builds
        </Link>
        
        <ThemeToggle />
        
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h1 className="page-title">Welcome to Sidekick</h1>
          <p className="page-subtitle">
            Generate Wikipedia-style articles through AI-powered research and multi-perspective synthesis
          </p>
          
          <div className="hero-buttons">
            <Link href="/sidekick/generate" className="btn btn-primary">
              <span>📝</span> Start with Sidekick
            </Link>
            <Link href="/sidekick/collaborate" className="btn btn-secondary">
              <span>💬</span> Try mySidekick
            </Link>
          </div>
        </div>

        <div className="features-grid">
          {/* Sidekick Card */}
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon purple">📄</div>
              <h2 className="feature-title">Sidekick</h2>
            </div>
            <p className="feature-desc">
              Automated article generation with multi-perspective research and comprehensive citations. 
              Perfect for creating detailed, Wikipedia-style content.
            </p>
            <ul className="feature-list">
              <li><span className="check-icon">✓</span> Automated research & synthesis</li>
              <li><span className="check-icon">✓</span> Multiple perspectives</li>
              <li><span className="check-icon">✓</span> Full citations & references</li>
            </ul>
            <Link href="/sidekick/generate" className="feature-btn purple">
              Generate Article →
            </Link>
          </div>

          {/* mySidekick Card */}
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon indigo">💭</div>
              <h2 className="feature-title">mySidekick</h2>
            </div>
            <p className="feature-desc">
              Collaborate with AI experts in real-time. Steer the discussion, ask questions, 
              and build knowledge together with dynamic mind maps.
            </p>
            <ul className="feature-list">
              <li><span className="check-icon">✓</span> Real-time collaboration</li>
              <li><span className="check-icon">✓</span> Interactive mind maps</li>
              <li><span className="check-icon">✓</span> Human-AI discourse</li>
            </ul>
            <Link href="/sidekick/collaborate" className="feature-btn indigo">
              Start Collaboration →
            </Link>
          </div>
        </div>

        <div className="stats-section">
          <h2 className="stats-title">Impact & Adoption</h2>
          <div className="stats-grid">
            <div>
              <div className="stat-value purple">70k+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div>
              <div className="stat-value indigo">78%</div>
              <div className="stat-label">Prefer Over RAG Chatbot</div>
            </div>
            <div>
              <div className="stat-value pink">Vale</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </div>
      
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
