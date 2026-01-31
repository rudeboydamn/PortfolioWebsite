"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ThemeToggle from '../../../components/theme-toggle';

type Thought = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_name: string;
  user_image?: string;
  likes_count: number;
  comments_count: number;
};

export default function ThoughtPage() {
  const params = useParams();
  const [thought, setThought] = useState<Thought | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchThought = async () => {
      try {
        const res = await fetch(`/api/thoughts/${params.id}`);
        if (!res.ok) {
          throw new Error('Thought not found');
        }
        const data = await res.json();
        setThought(data.thought || data);
      } catch (err) {
        setError('Thought not found');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchThought();
    }
  }, [params.id]);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/thoughts/${params.id}` 
    : '';

  const shareText = thought ? `${thought.title} - by ${thought.user_name}` : '';

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodedText}&body=${encodedUrl}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'native':
        if (navigator.share) {
          await navigator.share({ title: thought?.title, text: shareText, url: shareUrl });
        }
        break;
    }
    setShowShareMenu(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}>
        Loading...
      </div>
    );
  }

  if (error || !thought) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        gap: '1rem',
      }}>
        <h1>Thought not found</h1>
        <Link href="/thoughts" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Back to Thoughts
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'rgba(255,255,255,0.9)',
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .thought-container { max-width: 800px; margin: 0 auto; }
        .back-link { 
          color: var(--skin-solid, #667eea); 
          text-decoration: none; 
          display: inline-flex; 
          align-items: center; 
          gap: 0.5rem; 
          margin-bottom: 2rem; 
          font-weight: 500;
          transition: opacity 0.3s;
        }
        .back-link:hover { opacity: 0.8; }
        
        .thought-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .thought-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        
        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.2rem;
        }
        
        .author-name { font-weight: 600; color: white; }
        .thought-date { font-size: 0.9rem; color: rgba(255,255,255,0.6); }
        
        .thought-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .thought-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.85);
          white-space: pre-wrap;
        }
        
        .thought-stats {
          display: flex;
          gap: 1.5rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          font-size: 0.95rem;
        }
        
        .share-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102,126,234,0.3);
        }
        
        .share-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: rgba(30,30,40,0.95);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 180px;
          border: 1px solid rgba(255,255,255,0.1);
          z-index: 100;
        }
        
        .share-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          transition: background 0.2s;
          font-size: 0.95rem;
        }
        .share-option:hover { background: rgba(255,255,255,0.1); }
        
        .share-icon { width: 20px; text-align: center; }
      `}</style>

      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <ThemeToggle />
      </div>

      <div className="thought-container">
        <Link href="/thoughts" className="back-link">
          ← Back to Thoughts
        </Link>

        <article className="thought-card">
          <div className="thought-header">
            <div className="author-info">
              {thought.user_image ? (
                <img 
                  src={thought.user_image} 
                  alt={thought.user_name}
                  style={{ width: 50, height: 50, borderRadius: '50%' }}
                />
              ) : (
                <div className="author-avatar">
                  {thought.user_name?.charAt(0).toUpperCase() || 'A'}
                </div>
              )}
              <div>
                <div className="author-name">{thought.user_name}</div>
                <div className="thought-date">{formatDate(thought.created_at)}</div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <button className="share-btn" onClick={() => setShowShareMenu(!showShareMenu)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
                </svg>
                Share
              </button>

              {showShareMenu && (
                <div className="share-menu">
                  <button className="share-option" onClick={() => handleShare('twitter')}>
                    <span className="share-icon">𝕏</span> Twitter / X
                  </button>
                  <button className="share-option" onClick={() => handleShare('facebook')}>
                    <span className="share-icon">f</span> Facebook
                  </button>
                  <button className="share-option" onClick={() => handleShare('linkedin')}>
                    <span className="share-icon">in</span> LinkedIn
                  </button>
                  <button className="share-option" onClick={() => handleShare('whatsapp')}>
                    <span className="share-icon">💬</span> WhatsApp
                  </button>
                  <button className="share-option" onClick={() => handleShare('email')}>
                    <span className="share-icon">✉️</span> Email
                  </button>
                  <button className="share-option" onClick={() => handleShare('copy')}>
                    <span className="share-icon">{copied ? '✓' : '🔗'}</span> 
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  {typeof window !== 'undefined' && 'share' in navigator && (
                    <button className="share-option" onClick={() => handleShare('native')}>
                      <span className="share-icon">📤</span> More...
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <h1 className="thought-title">{thought.title}</h1>
          <div className="thought-content">{thought.content}</div>

          <div className="thought-stats">
            <span>❤️ {thought.likes_count} likes</span>
            <span>💬 {thought.comments_count} comments</span>
          </div>
        </article>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/thoughts" style={{
            color: '#667eea',
            textDecoration: 'none',
            fontWeight: 500,
          }}>
            View all thoughts →
          </Link>
        </div>
      </div>

      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
