"use client";

import React from 'react';
import Link from 'next/link';

type BlogPost = {
  date: string;
  title: string;
  intro: string;
  content: string[];
  url?: string;
};

const blogs: BlogPost[] = [
  {
    date: 'October 20, 2025',
    title: 'The Future is Here: How AI is Revolutionizing EDI Integration',
    intro: 'Discover how Artificial Intelligence (AI) is transforming Electronic Data Interchange (EDI) systems, boosting efficiency, accuracy, and business intelligence.',
    content: [
      'In today\'s fast-paced digital economy, inefficiency is no longer an option. For decades, Electronic Data Interchange (EDI) has powered seamless B2B communication—automating invoices, purchase orders, and shipping details. But as global supply chains grow more complex, traditional EDI needs a new layer of intelligence. Enter Artificial Intelligence (AI)—the driving force behind the next evolution of EDI integration.',
      'Classic EDI automates. AI-enhanced EDI optimizes. Instead of merely transferring data, AI-enabled EDI systems can now analyze, predict, and act. Picture an EDI platform that anticipates supplier delays, detects missing data, or learns optimal delivery schedules—all autonomously.',
      'Key benefits include error prevention through AI identifying and correcting inconsistencies before transmission, predictive insights by analyzing transaction patterns, faster partner onboarding with machine learning automation, and data intelligence with NLP converting unstructured data into structured EDI formats automatically.',
      'AI isn\'t replacing EDI—it\'s redefining it. The companies merging automation with intelligence will be the ones leading in accuracy, agility, and growth.',
    ],
    url: '/blog/ai-edi-integration/',
  },
  {
    date: 'October 26, 2025',
    title: 'Strengthening Supply-Chain Resilience Through EDI Integration',
    intro: 'As global disruptions continue to challenge supply chains, companies are turning to EDI to enhance visibility, agility, and communication with partners.',
    content: [
      'Ongoing port delays, raw material shortages, and geopolitical tensions have exposed just how fragile global supply chains remain. Recent insights from Gartner emphasize that advanced visibility and scenario planning are now essential for resilience. Yet, according to the World Economic Forum, over 40% of organizations still lack visibility into first-tier suppliers.',
      'To address this, companies are modernizing Electronic Data Interchange (EDI)—shifting it from a back-office transaction tool to a strategic enabler of agility and communication.',
      'Modern EDI platforms streamline supplier integration and enable real-time visibility across networks. Next-gen EDI solutions now integrate APIs for instant updates—critical for tracking shipments and responding to disruptions. With structured EDI data, businesses can forecast supplier delays or demand shifts.',
      'Resilience isn\'t built during calm—it\'s proven during disruption. By leveraging EDI as a communication and visibility backbone, organizations can respond faster, collaborate better, and make smarter decisions when challenges arise.',
    ],
    url: '/blog/supply-chain-resilience-edi/',
  },
];

export default function ThoughtsPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', 
      color: 'rgba(255,255,255,0.9)', 
      fontFamily: "'Poppins', sans-serif", 
      padding: '2rem' 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .thoughts-container { max-width: 900px; margin: 0 auto; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .page-title { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .section-title { font-size: 1.8rem; margin: 2rem 0 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.95); }
        .blog-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 20px; padding: 2rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); transition: transform 0.3s, box-shadow 0.3s; }
        .blog-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .blog-date { font-size: 0.9rem; color: #667eea; margin-bottom: 0.5rem; font-weight: 500; }
        .blog-title { font-size: 1.4rem; color: white; margin-bottom: 0.75rem; line-height: 1.4; }
        .blog-intro { font-style: italic; color: rgba(255,255,255,0.8); margin-bottom: 1rem; line-height: 1.6; }
        .blog-content { color: rgba(255,255,255,0.85); line-height: 1.8; }
        .blog-content p { margin-bottom: 1rem; }
        .read-more { display: inline-flex; align-items: center; gap: 0.5rem; color: #667eea; text-decoration: none; font-weight: 500; margin-top: 1rem; transition: color 0.3s, transform 0.3s; }
        .read-more:hover { color: white; transform: translateX(5px); }
        .podcasts-section { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 20px; padding: 3rem; text-align: center; border: 1px solid rgba(255,255,255,0.1); }
        .coming-soon { font-size: 1.5rem; color: rgba(255,255,255,0.7); }
        .emoji { font-size: 3rem; margin-bottom: 1rem; }
      `}</style>
      
      <div className="thoughts-container">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
        
        <h1 className="page-title">Thoughts</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
          Insights on EDI, data integration, supply chain technology, and more.
        </p>

        <section>
          <h2 className="section-title">📝 Blog Posts</h2>
          {blogs.map((blog, index) => (
            <article key={index} className="blog-card">
              <p className="blog-date">{blog.date}</p>
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-intro">{blog.intro}</p>
              <div className="blog-content">
                {blog.content.slice(0, 2).map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
              {blog.url && (
                <Link href={blog.url} className="read-more">
                  Read full article →
                </Link>
              )}
            </article>
          ))}
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2 className="section-title">🎙️ Podcasts</h2>
          <div className="podcasts-section">
            <div className="emoji">🎧</div>
            <p className="coming-soon">Coming Soon!</p>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '1rem' }}>
              Stay tuned for upcoming podcast episodes on data analytics, EDI integration, and career insights.
            </p>
          </div>
        </section>
      </div>
      
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
