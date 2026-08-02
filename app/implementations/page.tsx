"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/theme-toggle';
import { implementationProjects as projects } from '../../lib/implementation-data';

export default function ImplementationsPage() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.category === filter);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--background)', 
      color: 'var(--text-color)', 
      fontFamily: "'Poppins', sans-serif", 
      padding: '2rem' 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary-color: #14b8a6;
          --primary-gradient: linear-gradient(135deg, #14b8a6, #0d9488);
          --text-color: rgba(255,255,255,0.9);
          --text-muted: rgba(255,255,255,0.65);
          --background: #0a0a0a;
          --glass-bg: rgba(128,128,128,0.06);
          --glass-border: rgba(128,128,128,0.12);
        }

        [data-theme="light"] {
          --primary-color: #0d9488;
          --primary-gradient: linear-gradient(135deg, #0d9488, #0f766e);
          --text-color: rgba(0,0,0,0.8);
          --text-muted: rgba(0,0,0,0.55);
          --background: #f8f8f8;
          --glass-bg: rgba(255,255,255,0.6);
          --glass-border: rgba(0,0,0,0.06);
        }

        [data-theme="dark"] {
          --primary-color: #14b8a6;
          --primary-gradient: linear-gradient(135deg, #14b8a6, #0d9488);
          --text-color: rgba(255,255,255,0.9);
          --text-muted: rgba(255,255,255,0.65);
          --background: #0a0a0a;
          --glass-bg: rgba(128,128,128,0.06);
          --glass-border: rgba(128,128,128,0.12);
        }

        body {
          background: var(--background);
          min-height: 100vh;
        }

        .implementations-container { 
          max-width: 1200px; 
          margin: 0 auto; 
        }

        .back-link { 
          color: rgba(255,255,255,0.8); 
          text-decoration: none; 
          display: inline-flex; 
          align-items: center; 
          gap: 0.5rem; 
          margin-bottom: 2rem; 
          transition: all 0.3s;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
        }
        .back-link:hover { 
          color: var(--text-color); 
          opacity: 1;
          transform: translateX(-5px);
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-title { 
          font-size: 2.5rem; 
          margin-bottom: 0.5rem; 
          color: var(--text-color);
          font-weight: 700;
        }

        .page-subtitle { 
          color: var(--text-muted); 
          margin-bottom: 2rem; 
          font-size: 1.1rem; 
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .filter-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
        }

        .filter-btn:hover {
          background: linear-gradient(135deg, #14b8a6, #0d9488);
          color: #ffffff !important;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #0d9488, #0f766e) !important;
          color: #ffffff !important;
          border-color: transparent !important;
        }

        .projects-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
          gap: 2rem; 
        }

        .project-card { 
          background: var(--glass-bg); 
          backdrop-filter: blur(15px); 
          border-radius: 24px; 
          padding: 2rem; 
          border: 1px solid var(--glass-border); 
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }

        .project-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
          border-color: rgba(128,128,128,0.2);
        }

        .project-card.expanded {
          grid-column: 1 / -1;
        }

        .project-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .project-icon { 
          min-width: 58px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-color);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          background: var(--glass-bg);
          padding: 0.75rem;
          border-radius: 16px;
          border: 1px solid var(--glass-border);
        }

        .project-meta {
          flex: 1;
        }

        .project-client { 
          font-size: 0.85rem; 
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }

        .project-title { 
          font-size: 1.2rem; 
          color: var(--text-color); 
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .project-category {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(128,128,128,0.12);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .project-challenge { 
          color: var(--text-muted); 
          font-size: 0.95rem; 
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .project-section {
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 0.9rem;
          color: var(--text-color);
          margin-bottom: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-title::before {
          content: '';
          width: 3px;
          height: 16px;
          background: var(--primary-gradient);
          border-radius: 2px;
        }

        .approach-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .approach-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .approach-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--primary-color);
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .impact-item {
          background: rgba(128,128,128,0.08);
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(128,128,128,0.12);
        }

        .impact-metric {
          font-size: 1rem;
          color: var(--text-color);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .impact-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          padding: 0.35rem 0.75rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .expand-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          margin-top: 1rem;
        }

        .expand-btn:hover {
          background: rgba(128,128,128,0.12);
          color: var(--text-color);
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 3rem;
          padding: 1.5rem;
          background: var(--glass-bg);
          border-radius: 20px;
          border: 1px solid var(--glass-border);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .old-fashioned-toggle{position:absolute;top:2rem;right:2rem;z-index:100}.toggle-switch{background:none;border:none;cursor:pointer;padding:0;width:80px;height:60px;position:relative;outline:none}.toggle-lever{position:absolute;top:0;width:35px;height:50px;background:#d4af37;border-radius:4px;border:2px solid #8b7355;box-shadow:0 2px 4px rgba(0,0,0,0.3);transition:transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55),background-color 0.3s ease;z-index:2;left:0}.toggle-lever:hover{box-shadow:0 4px 8px rgba(0,0,0,0.4);transform:scale(1.05)}.toggle-switch.active .toggle-lever{transform:translateX(35px);background:#4a5568;border-color:#2d3748}.lever-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:16px;font-weight:bold;transition:opacity 0.3s ease}.light-text{opacity:1;color:#ffd700}.dark-text{opacity:0;color:#e2e8f0}.toggle-switch.active .light-text{opacity:0}.toggle-switch.active .dark-text{opacity:1}.toggle-base{position:absolute;top:20px;left:0;width:70px;height:20px;background:#8b7355;border-radius:10px;border:2px solid #654321;box-shadow:inset 0 2px 4px rgba(0,0,0,0.3)}.base-plate{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(90deg,#a08050 0%,#8b7355 50%,#a08050 100%);border-radius:8px}
        /* Light theme overrides */
        [data-theme="light"] .project-card { background: rgba(255,255,255,0.6); }
        [data-theme="light"] .project-card:hover { box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
        [data-theme="light"] .stats-bar { background: rgba(255,255,255,0.5); }
        [data-theme="light"] .back-link { background: rgba(255,255,255,0.5); border: 1px solid rgba(0,0,0,0.06); }
        [data-theme="light"] .back-link:hover { background: rgba(0,0,0,0.04); }
        [data-theme="light"] .impact-item { background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.06); }
        [data-theme="light"] .filter-btn { background: rgba(255,255,255,0.5); border: 1px solid rgba(0,0,0,0.06); color: rgba(0,0,0,0.8) !important; }
        [data-theme="light"] .filter-btn:hover { background: linear-gradient(135deg, #14b8a6, #0d9488) !important; color: #ffffff !important; }
        [data-theme="light"] .filter-btn.active { background: linear-gradient(135deg, #0d9488, #0f766e) !important; color: #ffffff !important; border-color: transparent !important; }
        [data-theme="light"] .expand-btn { background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.06); color: rgba(0,0,0,0.7); }
        [data-theme="light"] .expand-btn:hover { background: rgba(0,0,0,0.08); color: rgba(0,0,0,0.9); }

        .impl-footer { text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(128,128,128,0.12); }
        .impl-footer a { color: var(--text-color); opacity: 0.6; text-decoration: none; transition: all 0.3s; }
        .impl-footer a:hover { opacity: 1; }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .impact-grid {
            grid-template-columns: 1fr;
          }

          .stats-bar {
            flex-direction: column;
            gap: 1.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .filter-container {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.4rem 1rem;
            font-size: 0.8rem;
          }
          .old-fashioned-toggle { top: 1rem; right: 1rem; transform: scale(0.8); }
        }
      `}</style>
      
      <div className="implementations-container">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
        
        <ThemeToggle />
        
        <div className="page-header">
          <h1 className="page-title">Enterprise Data Projects</h1>
          <p className="page-subtitle">
            Current architecture programs and earlier enterprise delivery work, together in one portfolio.
          </p>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">13</div>
            <div className="stat-label">Case Studies</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">19.7M</div>
            <div className="stat-label">Rows Reconciled</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1,500+</div>
            <div className="stat-label">Knowledge Assets</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">45</div>
            <div className="stat-label">Governed Views Verified</div>
          </div>
        </div>

        <div className="filter-container">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card ${expandedProject === project.id ? 'expanded' : ''}`}
              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            >
              <div className="project-header">
                <div className="project-icon">{project.icon}</div>
                <div className="project-meta">
                  <div className="project-client">{project.client}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
              </div>

              <p className="project-challenge">{project.challenge}</p>

              {expandedProject === project.id && (
                <>
                  <div className="project-section">
                    <h4 className="section-title">My Approach</h4>
                    <ul className="approach-list">
                      {project.approach.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-section">
                    <h4 className="section-title">Business Impact</h4>
                    <div className="impact-grid">
                      {project.impact.map((item, idx) => (
                        <div key={idx} className="impact-item">
                          <div className="impact-metric">{item.metric}</div>
                          <div className="impact-desc">{item.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="project-section">
                    <h4 className="section-title">Technologies & Systems</h4>
                    <div className="tech-tags">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button className="expand-btn" onClick={(e) => {
                e.stopPropagation();
                setExpandedProject(expandedProject === project.id ? null : project.id);
              }}>
                {expandedProject === project.id ? '← Collapse Details' : 'View Full Case Study →'}
              </button>
            </div>
          ))}
        </div>

        <div className="impl-footer">
          <p><Link href="/">← dammyhenry.com</Link></p>
        </div>
      </div>
      
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
