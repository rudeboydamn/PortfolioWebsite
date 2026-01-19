"use client";

import React from 'react';
import Link from 'next/link';
import { blogs } from '../lib/blog-data';

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
        <Link href="/thoughts" className="back-link">
          ← Back to Thoughts
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
