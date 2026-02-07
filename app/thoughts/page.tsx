"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/theme-toggle';
import { signIn, signOut, useSession } from 'next-auth/react';

type Thought = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  user_name?: string;
  user_image?: string;
  like_count?: number;
  comment_count?: number;
  user_has_liked?: boolean;
};

type Comment = {
  id: number;
  user_id: number;
  thought_id: number;
  content: string;
  created_at: string;
  user_name?: string;
  user_image?: string;
};

export default function ThoughtsPage() {
  const { data: session, status } = useSession();
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [expandedThought, setExpandedThought] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [commentInput, setCommentInput] = useState<Record<number, string>>({});
  const [editingThought, setEditingThought] = useState<number | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    fetchThoughts();
  }, [session]);

  const fetchThoughts = async () => {
    try {
      const res = await fetch('/api/thoughts');
      const data = await res.json();
      setThoughts(data.thoughts || []);
    } catch (error) {
      console.error('Error fetching thoughts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (res.ok) {
        await signIn('credentials', {
          email: signupData.email,
          password: signupData.password,
          redirect: false,
        });
        setShowAuthModal(false);
        setSignupData({ name: '', email: '', password: '' });
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      });

      if (result?.ok) {
        setShowAuthModal(false);
        setLoginData({ email: '', password: '' });
        setAuthMessage('');
      } else {
        setAuthMessage('Incorrect email or password. Please try again or reset your password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthMessage('An error occurred during login. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/thoughts' });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      setAuthMessage(data.message || 'Check your email for reset instructions.');
      setForgotEmail('');
    } catch (error) {
      setAuthMessage('An error occurred. Please try again.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, password: newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setAuthMessage('Password reset successfully! You can now login.');
        setNewPassword('');
        setResetToken('');
        setTimeout(() => {
          setAuthMode('login');
          setAuthMessage('');
        }, 2000);
      } else {
        setAuthMessage(data.error || 'Failed to reset password.');
      }
    } catch (error) {
      setAuthMessage('An error occurred. Please try again.');
    }
  };

  // Check for reset token in URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('reset');
    if (token) {
      setResetToken(token);
      setAuthMode('reset');
      setShowAuthModal(true);
      // Clean up URL
      window.history.replaceState({}, '', '/thoughts');
    }
  }, []);

  const handleShare = async (thoughtId: number, thought: Thought, platform: string) => {
    const shareUrl = `${window.location.origin}/thoughts/${thoughtId}`;
    const shareText = `${thought.title} - by ${thought.user_name || 'Anonymous'}`;
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
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        setCopiedId(thoughtId);
        setTimeout(() => setCopiedId(null), 2000);
        break;
    }
    setShareMenuOpen(null);
  };

  const handlePostThought = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setShowAuthModal(true);
      return;
    }

    try {
      const res = await fetch('/api/thoughts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: postTitle, content: postContent }),
      });

      if (res.ok) {
        setPostTitle('');
        setPostContent('');
        fetchThoughts();
      } else {
        alert('Failed to post thought');
      }
    } catch (error) {
      console.error('Error posting thought:', error);
    }
  };

  const handleLike = async (thoughtId: number) => {
    try {
      await fetch(`/api/thoughts/${thoughtId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anonymous: !session }),
      });
      fetchThoughts();
    } catch (error) {
      console.error('Error liking thought:', error);
    }
  };

  const handleDeleteThought = async (thoughtId: number) => {
    if (!confirm('Are you sure you want to delete this thought?')) return;

    try {
      const res = await fetch(`/api/thoughts/${thoughtId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchThoughts();
      }
    } catch (error) {
      console.error('Error deleting thought:', error);
    }
  };

  const fetchComments = async (thoughtId: number) => {
    try {
      const res = await fetch(`/api/thoughts/${thoughtId}/comments`);
      const data = await res.json();
      setComments(prev => ({ ...prev, [thoughtId]: data.comments || [] }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleComment = async (thoughtId: number) => {
    const content = commentInput[thoughtId]?.trim();
    if (!content) return;

    try {
      const res = await fetch(`/api/thoughts/${thoughtId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, anonymous: !session }),
      });

      if (res.ok) {
        setCommentInput(prev => ({ ...prev, [thoughtId]: '' }));
        fetchComments(thoughtId);
        fetchThoughts();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const toggleComments = (thoughtId: number) => {
    if (expandedThought === thoughtId) {
      setExpandedThought(null);
    } else {
      setExpandedThought(thoughtId);
      if (!comments[thoughtId]) {
        fetchComments(thoughtId);
      }
    }
  };

  const isAdmin = session?.user?.email === 'dammy@dammyhenry.com';

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

        .thoughts-container { max-width: 800px; margin: 0 auto; position: relative; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .header-section { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .page-title { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .page-subtitle { color: rgba(255,255,255,0.7); margin-bottom: 1rem; line-height: 1.6; }
        .auth-button { background: var(--primary-color); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 50px; cursor: pointer; font-weight: 500; transition: all 0.3s; }
        .auth-button:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102,126,234,0.4); }
        .logout-button { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.9); padding: 0.6rem 1.2rem; border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; cursor: pointer; font-size: 0.9rem; transition: all 0.3s; }
        .logout-button:hover { background: rgba(255,255,255,0.15); }
        
        .share-box { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 20px; padding: 2rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.1); }
        .share-box textarea, .share-box input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 15px; padding: 1rem; color: white; font-family: 'Poppins', sans-serif; margin-bottom: 1rem; resize: vertical; }
        .share-box input { font-weight: 600; font-size: 1.1rem; }
        .share-box textarea::placeholder, .share-box input::placeholder { color: rgba(255,255,255,0.5); }
        .share-box button { background: var(--primary-color); color: white; padding: 0.75rem 2rem; border: none; border-radius: 50px; cursor: pointer; font-weight: 500; }
        .share-box button:hover { background: #764ba2; }
        .share-box button:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .thought-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 20px; padding: 2rem; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1); }
        .thought-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .thought-author { display: flex; align-items: center; gap: 0.75rem; }
        .thought-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; }
        .thought-meta { display: flex; flex-direction: column; }
        .thought-name { font-weight: 600; color: white; }
        .thought-date { font-size: 0.85rem; color: rgba(255,255,255,0.6); }
        .thought-actions-header { display: flex; gap: 0.5rem; }
        .action-btn-sm { background: rgba(255,255,255,0.1); border: none; padding: 0.4rem 0.8rem; border-radius: 10px; color: rgba(255,255,255,0.9); cursor: pointer; font-size: 0.85rem; transition: all 0.3s; }
        .action-btn-sm:hover { background: rgba(255,255,255,0.15); }
        .thought-title { font-size: 1.4rem; color: white; margin-bottom: 0.75rem; font-weight: 600; }
        .thought-content { color: rgba(255,255,255,0.8); line-height: 1.6; margin-bottom: 1rem; white-space: pre-wrap; }
        .thought-footer { display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }
        .action-btn { background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 10px; transition: all 0.3s; font-size: 0.95rem; }
        .action-btn:hover { background: rgba(255,255,255,0.05); color: white; }
        .action-btn.liked { color: #ff6b6b; }
        
        .share-dropdown { position: absolute; bottom: 100%; left: 0; margin-bottom: 0.5rem; background: rgba(30,30,40,0.95); backdrop-filter: blur(10px); border-radius: 12px; padding: 0.5rem; min-width: 140px; border: 1px solid rgba(255,255,255,0.15); z-index: 100; display: flex; flex-direction: column; gap: 0.25rem; }
        .share-dropdown button { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0.75rem; border-radius: 8px; background: transparent; border: none; color: white; cursor: pointer; font-size: 0.85rem; transition: background 0.2s; text-align: left; white-space: nowrap; }
        .share-dropdown button:hover { background: rgba(255,255,255,0.1); }
        
        .comments-section { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }
        .comment { background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 15px; margin-bottom: 0.75rem; }
        .comment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .comment-author { font-weight: 600; color: white; font-size: 0.9rem; }
        .comment-date { font-size: 0.8rem; color: rgba(255,255,255,0.5); }
        .comment-content { color: rgba(255,255,255,0.8); font-size: 0.95rem; line-height: 1.5; }
        .comment-input { display: flex; gap: 0.75rem; margin-top: 1rem; }
        .comment-input input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 25px; padding: 0.75rem 1rem; color: white; font-family: 'Poppins', sans-serif; }
        .comment-input input::placeholder { color: rgba(255,255,255,0.5); }
        .comment-input button { background: var(--primary-color); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 25px; cursor: pointer; }
        
        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .modal-content { background: rgba(30,60,114,0.95); backdrop-filter: blur(20px); border-radius: 25px; padding: 3rem; max-width: 450px; width: 100%; border: 1px solid rgba(255,255,255,0.1); }
        .modal-title { font-size: 2rem; color: white; margin-bottom: 0.5rem; text-align: center; }
        .modal-subtitle { color: rgba(255,255,255,0.7); text-align: center; margin-bottom: 2rem; }
        .auth-tabs { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .auth-tab { flex: 1; padding: 0.75rem; background: rgba(255,255,255,0.05); border: none; color: rgba(255,255,255,0.7); border-radius: 10px; cursor: pointer; transition: all 0.3s; }
        .auth-tab.active { background: var(--primary-color); color: white; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; color: rgba(255,255,255,0.8); margin-bottom: 0.5rem; font-size: 0.9rem; }
        .form-group input { width: 100%; padding: 0.875rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: white; font-family: 'Poppins', sans-serif; }
        .form-group input::placeholder { color: rgba(255,255,255,0.4); }
        .submit-btn { width: 100%; background: var(--primary-color); color: white; padding: 1rem; border: none; border-radius: 50px; cursor: pointer; font-weight: 600; font-size: 1rem; margin-top: 1rem; }
        .submit-btn:hover { background: #764ba2; }
        .divider { display: flex; align-items: center; margin: 1.5rem 0; color: rgba(255,255,255,0.5); }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
        .divider span { padding: 0 1rem; }
        .google-btn { width: 100%; background: white; color: #333; padding: 1rem; border: none; border-radius: 50px; cursor: pointer; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 0.75rem; }
        .google-btn:hover { background: #f0f0f0; }
        .close-modal { position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(255,255,255,0.1); border: none; color: white; font-size: 1.5rem; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .old-fashioned-toggle{position:fixed;top:2rem;right:2rem;z-index:100}.toggle-switch{background:none;border:none;cursor:pointer;padding:0;width:80px;height:60px;position:relative;outline:none}.toggle-lever{position:absolute;top:0;width:35px;height:50px;background:#d4af37;border-radius:4px;border:2px solid #8b7355;box-shadow:0 2px 4px rgba(0,0,0,0.3);transition:transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55),background-color 0.3s ease;z-index:2;left:0}.toggle-lever:hover{box-shadow:0 4px 8px rgba(0,0,0,0.4);transform:scale(1.05)}.toggle-switch.active .toggle-lever{transform:translateX(35px);background:#4a5568;border-color:#2d3748}.lever-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:16px;font-weight:bold;transition:opacity 0.3s ease}.light-text{opacity:1;color:#ffd700}.dark-text{opacity:0;color:#e2e8f0}.toggle-switch.active .light-text{opacity:0}.toggle-switch.active .dark-text{opacity:1}.toggle-base{position:absolute;top:20px;left:0;width:70px;height:20px;background:#8b7355;border-radius:10px;border:2px solid #654321;box-shadow:inset 0 2px 4px rgba(0,0,0,0.3)}.base-plate{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(90deg,#a08050 0%,#8b7355 50%,#a08050 100%);border-radius:8px}
        .thoughts-footer { text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); }
        .thoughts-footer a { color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.3s; }
        .thoughts-footer a:hover { color: white; }
        
        @media (max-width: 768px) {
          .thoughts-container { padding: 0 1rem; }
          .header-section { flex-direction: column; gap: 1rem; }
          .page-title { font-size: 2rem; }
          .share-box { padding: 1.5rem; }
          .thought-card { padding: 1.5rem; }
          .old-fashioned-toggle { position: fixed; top: 1rem; right: 1rem; transform: scale(0.8); }
        }
      `}</style>

      <div className="thoughts-container">
        <Link href="/#services" className="back-link">
          ← Back to Services
        </Link>
        
        <ThemeToggle />
        
        <div className="header-section">
          <div>
            <h1 className="page-title">
              {session ? `${session.user.name}, Welcome to Thoughts` : 'Thoughts'}
            </h1>
            <p className="page-subtitle">
              {session 
                ? 'Feel free to share your insights, ideas, and explorations on technology, business, and life. You can also like and comment on any thought that tickles your fancy.'
                : 'Insights, ideas, and explorations on technology, business, and life.'}
            </p>
          </div>
          <div>
            {session ? (
              <button onClick={() => signOut()} className="logout-button">
                Logout
              </button>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="auth-button">
                Login / Sign Up
              </button>
            )}
          </div>
        </div>

        <div className="share-box">
          <form onSubmit={handlePostThought}>
            <input
              type="text"
              placeholder="What's your thought about?"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              onClick={() => !session && setShowAuthModal(true)}
              required
            />
            <textarea
              placeholder={session ? "Share your thoughts..." : "Login to share your thoughts..."}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              onClick={() => !session && setShowAuthModal(true)}
              rows={4}
              required
            />
            <button type="submit" disabled={!session || !postTitle.trim() || !postContent.trim()}>
              {session ? 'Share Thought' : 'Login to Share'}
            </button>
          </form>
        </div>

        <div className="thoughts-feed">
          {loading ? (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>Loading thoughts...</p>
          ) : thoughts.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>No thoughts yet. Be the first to share!</p>
          ) : (
            thoughts.map((thought) => (
              <div key={thought.id} className="thought-card">
                <div className="thought-header">
                  <div className="thought-author">
                    <div className="thought-avatar">
                      {thought.user_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="thought-meta">
                      <div className="thought-name">{thought.user_name || 'Anonymous'}</div>
                      <div className="thought-date">
                        {new Date(thought.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  {session && (thought.user_id === session.user.id || isAdmin) && (
                    <div className="thought-actions-header">
                      <button 
                        className="action-btn-sm"
                        onClick={() => handleDeleteThought(thought.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                
                <h3 className="thought-title">{thought.title}</h3>
                <p className="thought-content">{thought.content}</p>
                
                <div className="thought-footer">
                  <button 
                    className={`action-btn ${thought.user_has_liked ? 'liked' : ''}`}
                    onClick={() => handleLike(thought.id)}
                  >
                    {thought.user_has_liked ? '❤️' : '🤍'} {thought.like_count || 0}
                  </button>
                  <button 
                    className="action-btn"
                    onClick={() => toggleComments(thought.id)}
                  >
                    💬 {thought.comment_count || 0}
                  </button>
                  <div style={{ position: 'relative' }}>
                    <button 
                      className="action-btn share-action-btn"
                      onClick={() => setShareMenuOpen(shareMenuOpen === thought.id ? null : thought.id)}
                    >
                      🔗 Share
                    </button>
                    {shareMenuOpen === thought.id && (
                      <div className="share-dropdown">
                        <button onClick={() => handleShare(thought.id, thought, 'twitter')}>𝕏 Twitter</button>
                        <button onClick={() => handleShare(thought.id, thought, 'facebook')}>f Facebook</button>
                        <button onClick={() => handleShare(thought.id, thought, 'linkedin')}>in LinkedIn</button>
                        <button onClick={() => handleShare(thought.id, thought, 'whatsapp')}>💬 WhatsApp</button>
                        <button onClick={() => handleShare(thought.id, thought, 'copy')}>
                          {copiedId === thought.id ? '✓ Copied!' : '📋 Copy Link'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {expandedThought === thought.id && (
                  <div className="comments-section">
                    {comments[thought.id]?.map((comment) => (
                      <div key={comment.id} className="comment">
                        <div className="comment-header">
                          <span className="comment-author">{comment.user_name || 'Anonymous'}</span>
                          <span className="comment-date">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="comment-content">{comment.content}</p>
                      </div>
                    ))}
                    
                    <div className="comment-input">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentInput[thought.id] || ''}
                        onChange={(e) => setCommentInput({ ...commentInput, [thought.id]: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleComment(thought.id)}
                      />
                      <button onClick={() => handleComment(thought.id)}>
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {showAuthModal && (
          <div className="modal" onClick={() => setShowAuthModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
              <button className="close-modal" onClick={() => setShowAuthModal(false)}>×</button>
              
              <h2 className="modal-title">Welcome</h2>
              <p className="modal-subtitle">Join the conversation</p>
              
              {authMode !== 'forgot' && authMode !== 'reset' && (
                <div className="auth-tabs">
                  <button 
                    className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                    onClick={() => { setAuthMode('login'); setAuthMessage(''); }}
                  >
                    Login
                  </button>
                  <button 
                    className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                    onClick={() => { setAuthMode('signup'); setAuthMessage(''); }}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {authMessage && (
                <div style={{ 
                  background: authMessage.toLowerCase().includes('incorrect') || authMessage.toLowerCase().includes('error') || authMessage.toLowerCase().includes('failed')
                    ? 'rgba(239,68,68,0.2)' 
                    : 'rgba(102,126,234,0.2)', 
                  padding: '1rem', 
                  borderRadius: '10px', 
                  marginBottom: '1rem',
                  color: authMessage.toLowerCase().includes('incorrect') || authMessage.toLowerCase().includes('error') || authMessage.toLowerCase().includes('failed')
                    ? '#f87171'
                    : 'rgba(255,255,255,0.9)',
                  textAlign: 'center',
                  border: authMessage.toLowerCase().includes('incorrect') || authMessage.toLowerCase().includes('error') || authMessage.toLowerCase().includes('failed')
                    ? '1px solid rgba(239,68,68,0.3)'
                    : '1px solid rgba(102,126,234,0.3)'
                }}>
                  {authMessage}
                </div>
              )}

              {authMode === 'forgot' ? (
                <form onSubmit={handleForgotPassword}>
                  <h3 style={{ color: 'white', marginBottom: '1rem', textAlign: 'center' }}>Reset Password</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                    Enter your email and we&apos;ll send you a link to reset your password.
                  </p>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">Send Reset Link</button>
                  <button 
                    type="button" 
                    onClick={() => { setAuthMode('login'); setAuthMessage(''); }}
                    style={{ 
                      width: '100%', 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'rgba(255,255,255,0.7)', 
                      marginTop: '1rem', 
                      cursor: 'pointer' 
                    }}
                  >
                    ← Back to Login
                  </button>
                </form>
              ) : authMode === 'reset' ? (
                <form onSubmit={handleResetPassword}>
                  <h3 style={{ color: 'white', marginBottom: '1rem', textAlign: 'center' }}>Set New Password</h3>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      placeholder="Min. 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <button type="submit" className="submit-btn">Reset Password</button>
                </form>
              ) : authMode === 'signup' ? (
                <form onSubmit={handleSignup}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Min. 6 characters"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      minLength={6}
                    />
                  </div>
                  <button type="submit" className="submit-btn">Create Account</button>
                </form>
              ) : (
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">Login</button>
                  <button 
                    type="button" 
                    onClick={() => { setAuthMode('forgot'); setAuthMessage(''); }}
                    style={{ 
                      width: '100%', 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'rgba(255,255,255,0.6)', 
                      marginTop: '1rem', 
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Forgot Password?
                  </button>
                </form>
              )}

              {(authMode === 'login' || authMode === 'signup') && (
                <>
              <div className="divider">
                <span>or</span>
              </div>

              <button className="google-btn" onClick={handleGoogleSignIn}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                  <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                  <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                  <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                </svg>
                Continue with Google
              </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="thoughts-footer">
          <p><Link href="/">← dammyhenry.com</Link></p>
        </div>
      </div>

      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
