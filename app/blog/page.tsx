"use client";

import React from 'react';
import Link from 'next/link';

type BlogPost = {
  date: string;
  title: string;
  intro: string;
  url: string;
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

export default function BlogPage() {
  // Get the 5 most recent blogs (first 5 in the array since they're ordered by date descending)
  const recentBlogs = blogs.slice(0, 5);

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

        .blog-container { max-width: 1200px; margin: 0 auto; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .page-title { font-size: 3rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .page-subtitle { color: rgba(255,255,255,0.7); margin-bottom: 3rem; font-size: 1.2rem; }
        .section-title { font-size: 2rem; margin: 3rem 0 1.5rem; color: rgba(255,255,255,0.95); display: flex; align-items: center; gap: 0.75rem; }
        .recent-section { margin-bottom: 4rem; }
        .all-blogs-section { margin-top: 4rem; }
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; }
        .blog-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 20px; padding: 2rem; border: 1px solid rgba(255,255,255,0.1); transition: transform 0.3s, box-shadow 0.3s; text-decoration: none; display: block; }
        .blog-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .blog-date { font-size: 0.9rem; color: #667eea; margin-bottom: 0.5rem; font-weight: 500; }
        .blog-title { font-size: 1.2rem; color: white; margin-bottom: 0.75rem; line-height: 1.4; }
        .blog-intro { color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 1rem; font-size: 0.95rem; }
        .read-more { display: inline-flex; align-items: center; gap: 0.5rem; color: #667eea; text-decoration: none; font-weight: 500; transition: color 0.3s, transform 0.3s; }
        .read-more:hover { color: white; transform: translateX(5px); }
        .stats { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 15px; padding: 2rem; margin-top: 4rem; border: 1px solid rgba(255,255,255,0.1); text-align: center; }
        .stats-number { font-size: 2.5rem; font-weight: 700; color: #667eea; margin-bottom: 0.5rem; }
        .stats-label { color: rgba(255,255,255,0.7); font-size: 0.9rem; }
        .recent-highlight { background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); border: 1px solid rgba(102,126,234,0.2); }
        .recent-badge { background: #667eea; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; display: inline-block; margin-bottom: 1rem; }

        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr; }
          .page-title { font-size: 2.5rem; }
        }
      `}</style>

      <div className="blog-container">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>

        <h1 className="page-title">Blog</h1>
        <p className="page-subtitle">Insights, ideas, and explorations on technology, business, and life.</p>

        <section className="recent-section">
          <h2 className="section-title">📝 Recent Blog Posts</h2>
          <div className="blog-grid">
            {recentBlogs.map((blog, index) => (
              <Link key={index} href={blog.url} className={`blog-card ${index === 0 ? 'recent-highlight' : ''}`}>
                {index === 0 && <div className="recent-badge">Latest</div>}
                <p className="blog-date">{blog.date}</p>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-intro">{blog.intro}</p>
                <div className="read-more">
                  Read full article →
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="all-blogs-section">
          <h2 className="section-title">📚 All Articles</h2>
          <div className="blog-grid">
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
        </section>

        <div className="stats">
          <div className="stats-number">{blogs.length}</div>
          <div className="stats-label">Articles Published</div>
        </div>
      </div>

      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
