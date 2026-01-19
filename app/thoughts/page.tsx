"use client";

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/theme-toggle';
import { blogs } from '../lib/blog-data';

type ContentSection = {
  title: string;
  icon: string;
  status: 'available' | 'coming-soon';
  href?: string;
  description: string;
};

const sideSections: ContentSection[] = [
  { 
    title: "Podcasts", 
    icon: "🎙️", 
    status: "coming-soon",
    description: "Discussions on data analytics, EDI integration, and career insights."
  },
  { 
    title: "YouTube Documentaries", 
    icon: "🎬", 
    status: "coming-soon",
    description: "Deep dives into technology, process improvement, and industry trends."
  },
];

export default function ThoughtsPage() {
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
        .thoughts-container { max-width: 1200px; margin: 0 auto; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .page-title { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .page-subtitle { color: rgba(255,255,255,0.7); margin-bottom: 3rem; }
        
        .content-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }

        .section-header {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: rgba(255,255,255,0.95);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .blog-card { 
          background: rgba(255,255,255,0.05); 
          backdrop-filter: blur(15px); 
          border-radius: 20px; 
          padding: 2rem; 
          margin-bottom: 1.5rem; 
          border: 1px solid rgba(255,255,255,0.1); 
          transition: transform 0.3s, box-shadow 0.3s; 
          text-decoration: none;
          display: block;
        }
        .blog-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .blog-date { font-size: 0.9rem; color: #667eea; margin-bottom: 0.5rem; font-weight: 500; }
        .blog-title { font-size: 1.3rem; color: white; margin-bottom: 0.75rem; line-height: 1.4; }
        .blog-intro { color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 1rem; }
        .read-more { display: inline-flex; align-items: center; gap: 0.5rem; color: #667eea; text-decoration: none; font-weight: 500; transition: color 0.3s, transform 0.3s; }
        .read-more:hover { color: white; transform: translateX(5px); }

        .side-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(15px);
          border-radius: 15px;
          padding: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 1.5rem;
        }
        .side-card.coming-soon { opacity: 0.8; }
        .side-icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .side-title { color: white; font-size: 1.1rem; margin-bottom: 0.5rem; }
        .side-desc { font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-bottom: 1rem; line-height: 1.5; }
        .side-status { font-size: 0.75rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; }

        @media (max-width: 900px) { 
          .content-layout { grid-template-columns: 1fr; } 
        }
      `}</style>

      <div className="thoughts-container">
        <Link href="/#services" className="back-link">
          ← Back to Services
        </Link>
        
        <ThemeToggle />
        
        <h1 className="page-title">Thoughts</h1>
        <p className="page-subtitle">Insights, ideas, and explorations on technology, business, and life.</p>

        <div className="content-layout">
          <div className="main-content">
            <h2 className="section-header">📝 Recent Blog Posts</h2>
            {blogs.map((blog, index) => (
              <Link key={index} href={blog.url} className="blog-card">
                <p className="blog-date">{blog.date}</p>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-intro">{blog.intro}</p>
                <div className="read-more">
                  Read full article →
                </div>
              </Link>
            ))}
          </div>

          <div className="side-content">
            <h2 className="section-header">Coming Soon</h2>
            {sideSections.map((section) => (
              <div key={section.title} className="side-card coming-soon">
                <div className="side-icon">{section.icon}</div>
                <h3 className="side-title">{section.title}</h3>
                <p className="side-desc">{section.description}</p>
                <span className="side-status">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
