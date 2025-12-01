"use client";

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/theme-toggle';

type BlogPost = {
  date: string;
  title: string;
  intro: string;
  url: string;
};

type ContentSection = {
  title: string;
  icon: string;
  status: 'available' | 'coming-soon';
  href?: string;
};

const blogs: BlogPost[] = [
  {
    date: 'November 30, 2025',
    title: 'Why Visibility Is the New Currency in Supply Chain Tech',
    intro: 'Data wins.',
    url: '/blog/why-visibility-is-the-new-currency',
  },
  {
    date: 'November 23, 2025',
    title: 'The New Era of Partner Onboarding',
    intro: 'Onboarding used to take weeks—now it can take hours.',
    url: '/blog/the-new-era-of-partner-onboarding',
  },
  {
    date: 'November 16, 2025',
    title: 'How Integrations Improve Customer Experience Without Anyone Noticing',
    intro: 'When integrations work, customers feel the difference.',
    url: '/blog/how-integrations-improve-customer-experience',
  },
  {
    date: 'November 9, 2025',
    title: 'Fun Fact: The 850 PO Is Older Than Most Tech We Use Today',
    intro: 'Yet it still works perfectly.',
    url: '/blog/fun-fact-the-850-po-is-older-than-most-tech',
  },
  {
    date: 'November 2, 2025',
    title: 'The Rise of iPaaS: Why Businesses Are Finally Letting Go of Legacy Middleware',
    intro: 'Cloud integration isn\'t the future—it\'s the present.',
    url: '/blog/the-rise-of-ipaas',
  },
  {
    date: 'October 26, 2025',
    title: 'Error Handling: The Most Underrated Skill in Integration',
    intro: 'Great integrations fail—great integrators fix them fast.',
    url: '/blog/error-handling-the-most-underrated-skill',
  },
  {
    date: 'October 19, 2025',
    title: 'How Automation Is Transforming Warehouse Integrations',
    intro: 'WMS integrations used to be slow and manual—now they\'re fast and dynamic.',
    url: '/blog/how-automation-is-transforming-warehouse-integrations',
  },
  {
    date: 'October 12, 2025',
    title: 'APIs vs. EDI: The Real Story Behind the Hype',
    intro: 'It\'s not a battle—it\'s a partnership.',
    url: '/blog/apis-vs-edi-the-real-story',
  },
  {
    date: 'October 5, 2025',
    title: 'AS2 Is Back: Why Secure B2B Transport Still Matters',
    intro: 'AS2 isn\'t flashy—but it\'s everywhere.',
    url: '/blog/as2-is-back-why-secure-b2b-transport-still-matters',
  },
  {
    date: 'September 28, 2025',
    title: 'The Hidden Power of EDI: Why It Still Runs Global Supply Chains',
    intro: 'Despite being decades old, EDI remains the backbone of commerce.',
    url: '/blog/the-hidden-power-of-edi',
  },
  {
    date: 'October 26, 2025',
    title: 'Strengthening Supply-Chain Resilience Through EDI Integration',
    intro: 'As global disruptions continue to challenge supply chains, companies are turning to EDI to enhance visibility, agility, and communication with partners.',
    url: '/blog/supply-chain-resilience-edi',
  },
  {
    date: 'October 20, 2025',
    title: 'The Future is Here: How AI is Revolutionizing EDI Integration',
    intro: 'Discover how Artificial Intelligence (AI) is transforming Electronic Data Interchange (EDI) systems, boosting efficiency, accuracy, and business intelligence.',
    url: '/blog/ai-edi-integration',
  },
];

const sections: ContentSection[] = [
  { title: "Blog Posts", icon: "📝", status: "available", href: "/blog" },
  { title: "Podcasts", icon: "🎙️", status: "coming-soon" },
  { title: "YouTube Documentaries", icon: "🎬", status: "coming-soon" },
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
        .thoughts-container { max-width: 1000px; margin: 0 auto; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .page-title { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .page-subtitle { color: rgba(255,255,255,0.7); margin-bottom: 2rem; }
        .sections-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 3rem; }
        .section-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 15px; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.1); text-align: center; transition: transform 0.3s; text-decoration: none; }
        .section-card:hover { transform: translateY(-3px); }
        .section-card.coming-soon { opacity: 0.6; cursor: default; }
        .section-card.coming-soon:hover { transform: none; }
        .section-icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .section-title { color: white; font-size: 1rem; margin-bottom: 0.25rem; }
        .section-status { font-size: 0.75rem; color: rgba(255,255,255,0.5); }
        .content-title { font-size: 1.5rem; margin: 2.5rem 0 1.5rem; color: rgba(255,255,255,0.95); display: flex; align-items: center; gap: 0.75rem; }
        .blog-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 20px; padding: 2rem; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1); transition: transform 0.3s, box-shadow 0.3s; }
        .blog-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .blog-date { font-size: 0.9rem; color: #667eea; margin-bottom: 0.5rem; font-weight: 500; }
        .blog-title { font-size: 1.3rem; color: white; margin-bottom: 0.75rem; line-height: 1.4; }
        .blog-intro { color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 1rem; }
        .read-more { display: inline-flex; align-items: center; gap: 0.5rem; color: #667eea; text-decoration: none; font-weight: 500; transition: color 0.3s, transform 0.3s; }
        .read-more:hover { color: white; transform: translateX(5px); }
        .coming-section { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 20px; padding: 3rem; text-align: center; border: 1px solid rgba(255,255,255,0.1); margin-top: 2rem; }
        .coming-icon { font-size: 3rem; margin-bottom: 1rem; }
        .coming-text { font-size: 1.2rem; color: rgba(255,255,255,0.7); }
        @media (max-width: 768px) { .sections-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="thoughts-container">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
        
        <ThemeToggle />
        
        <h1 className="page-title">Thoughts</h1>
        <p className="page-subtitle">Insights, ideas, and explorations on technology, business, and life.</p>

        <div className="sections-grid">
          {sections.map((section) => (
            section.status === 'available' && section.href ? (
              <Link key={section.title} href={section.href} className="section-card">
                <div className="section-icon">{section.icon}</div>
                <h3 className="section-title">{section.title}</h3>
                <span className="section-status">Explore →</span>
              </Link>
            ) : (
              <div key={section.title} className={`section-card ${section.status === 'coming-soon' ? 'coming-soon' : ''}`}>
                <div className="section-icon">{section.icon}</div>
                <h3 className="section-title">{section.title}</h3>
                <span className="section-status">Coming Soon</span>
              </div>
            )
          ))}
        </div>

        <h2 className="content-title">📝 Recent Blog Posts</h2>
        {blogs.map((blog, index) => (
          <article key={index} className="blog-card">
            <p className="blog-date">{blog.date}</p>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-intro">{blog.intro}</p>
            <Link href={blog.url} className="read-more">
              Read full article →
            </Link>
          </article>
        ))}

        <h2 className="content-title">🎙️ Podcasts</h2>
        <div className="coming-section">
          <div className="coming-icon">🎧</div>
          <p className="coming-text">Podcast episodes coming soon!</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Stay tuned for discussions on data analytics, EDI integration, and career insights.
          </p>
        </div>

        <h2 className="content-title">🎬 YouTube Documentaries</h2>
        <div className="coming-section">
          <div className="coming-icon">📺</div>
          <p className="coming-text">Video documentaries coming soon!</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Deep dives into technology, process improvement, and industry trends.
          </p>
        </div>
      </div>

      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
