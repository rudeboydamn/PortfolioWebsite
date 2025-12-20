"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../../components/theme-toggle';

type Article = {
  id: string;
  topic: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  content?: string;
};

type GenerationSettings = {
  maxConvTurn: number;
  maxPerspective: number;
  searchTopK: number;
  maxSearchQueries: number;
};

export default function SidekickGeneratePage() {
  const [topic, setTopic] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState<GenerationSettings>({
    maxConvTurn: 3,
    maxPerspective: 3,
    searchTopK: 5,
    maxSearchQueries: 3,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([
    { id: '1', topic: 'Sample Article: Introduction to AI', status: 'completed', progress: 100, createdAt: '2025-01-15' },
    { id: '2', topic: 'Sample Article: Machine Learning Basics', status: 'completed', progress: 100, createdAt: '2025-01-14' },
  ]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    const newArticle: Article = {
      id: Date.now().toString(),
      topic,
      status: 'generating',
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCurrentArticle(newArticle);

    // Simulate generation progress
    let progress = 0;
    const stages = [
      'Researching topic from multiple perspectives...',
      'Generating comprehensive outline...',
      'Writing article sections...',
      'Polishing and adding citations...',
    ];

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        const completedArticle = { ...newArticle, status: 'completed' as const, progress: 100 };
        setArticles(prev => [completedArticle, ...prev]);
        setCurrentArticle(null);
        setIsGenerating(false);
        setTopic('');
      } else {
        setCurrentArticle(prev => prev ? { ...prev, progress: Math.min(progress, 99) } : null);
      }
    }, 800);
  };

  const getProgressStage = (progress: number): string => {
    if (progress < 25) return 'Researching topic from multiple perspectives...';
    if (progress < 50) return 'Generating comprehensive outline...';
    if (progress < 75) return 'Writing article sections...';
    return 'Polishing and adding citations...';
  };

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
          --primary-color: #8b5cf6;
          --text-color: rgba(255,255,255,0.9);
          --background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }

        [data-theme="dark"] {
          --primary-color: #a78bfa;
          --background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        .generate-container { max-width: 1000px; margin: 0 auto; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .page-title { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #8b5cf6, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .page-subtitle { color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1.1rem; }
        
        .card { background: rgba(255,255,255,0.05); backdrop-filter: blur(15px); border-radius: 25px; padding: 2rem; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 2rem; }
        .card-title { font-size: 1.5rem; font-weight: 600; color: white; margin-bottom: 1.5rem; }
        
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; color: rgba(255,255,255,0.9); font-weight: 500; margin-bottom: 0.5rem; font-size: 0.95rem; }
        .form-input { width: 100%; padding: 1rem 1.25rem; background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.1); border-radius: 15px; color: white; font-size: 1rem; transition: all 0.3s ease; font-family: inherit; }
        .form-input:focus { outline: none; border-color: #8b5cf6; background: rgba(255,255,255,0.1); }
        .form-input::placeholder { color: rgba(255,255,255,0.4); }
        
        .advanced-toggle { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.8); cursor: pointer; margin-bottom: 1rem; font-weight: 500; transition: color 0.3s; }
        .advanced-toggle:hover { color: white; }
        .advanced-content { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem; padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 15px; }
        .form-input-sm { padding: 0.75rem 1rem; }
        
        .btn-generate { width: 100%; padding: 1rem 2rem; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; border: none; border-radius: 15px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-family: inherit; }
        .btn-generate:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4); }
        .btn-generate:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        
        .progress-section { margin-bottom: 1rem; }
        .progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; color: rgba(255,255,255,0.8); font-size: 0.9rem; }
        .progress-bar-container { height: 8px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
        .progress-bar { height: 100%; background: linear-gradient(135deg, #8b5cf6, #7c3aed); border-radius: 10px; transition: width 0.5s ease; }
        
        .progress-steps { margin-top: 1rem; }
        .progress-step { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0; color: rgba(255,255,255,0.6); font-size: 0.9rem; }
        .progress-step.active { color: rgba(255,255,255,0.9); }
        .progress-step.completed { color: #10b981; }
        
        .articles-list { }
        .article-item { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background: rgba(255,255,255,0.03); border-radius: 15px; margin-bottom: 0.75rem; transition: all 0.3s ease; cursor: pointer; }
        .article-item:hover { background: rgba(255,255,255,0.08); }
        .article-info { flex: 1; }
        .article-topic { font-weight: 600; color: white; margin-bottom: 0.25rem; }
        .article-date { font-size: 0.85rem; color: rgba(255,255,255,0.5); }
        .article-status { padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
        .status-completed { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .status-generating { background: rgba(139, 92, 246, 0.2); color: #a78bfa; }
        .status-failed { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
        
        .empty-state { text-align: center; padding: 3rem; color: rgba(255,255,255,0.5); }
        
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        @media (max-width: 768px) {
          .page-title { font-size: 1.8rem; }
          .advanced-content { grid-template-columns: 1fr; }
          .article-item { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
      `}</style>
      
      <div className="generate-container">
        <Link href="/sidekick" className="back-link">
          ← Back to Sidekick
        </Link>
        
        <ThemeToggle />
        
        <h1 className="page-title">Sidekick Article Generator</h1>
        <p className="page-subtitle">Generate comprehensive, Wikipedia-style articles with citations</p>

        {/* Generation Form */}
        <div className="card">
          <h2 className="card-title">Start New Article</h2>
          
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label className="form-label">Article Topic *</label>
              <input 
                type="text"
                className="form-input"
                placeholder="e.g., Quantum Computing, Ancient Rome, Machine Learning"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                disabled={isGenerating}
              />
            </div>

            <div 
              className="advanced-toggle" 
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>{showAdvanced ? '▼' : '▶'}</span>
              <span>Advanced Options</span>
            </div>

            {showAdvanced && (
              <div className="advanced-content">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Max Conversation Turns</label>
                  <input 
                    type="number"
                    className="form-input form-input-sm"
                    value={settings.maxConvTurn}
                    onChange={(e) => setSettings({ ...settings, maxConvTurn: parseInt(e.target.value) || 3 })}
                    min={1}
                    max={10}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Max Perspectives</label>
                  <input 
                    type="number"
                    className="form-input form-input-sm"
                    value={settings.maxPerspective}
                    onChange={(e) => setSettings({ ...settings, maxPerspective: parseInt(e.target.value) || 3 })}
                    min={1}
                    max={10}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Search Results per Query</label>
                  <input 
                    type="number"
                    className="form-input form-input-sm"
                    value={settings.searchTopK}
                    onChange={(e) => setSettings({ ...settings, searchTopK: parseInt(e.target.value) || 5 })}
                    min={1}
                    max={20}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Max Search Queries</label>
                  <input 
                    type="number"
                    className="form-input form-input-sm"
                    value={settings.maxSearchQueries}
                    onChange={(e) => setSettings({ ...settings, maxSearchQueries: parseInt(e.target.value) || 3 })}
                    min={1}
                    max={10}
                  />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-generate"
              disabled={isGenerating || !topic.trim()}
            >
              {isGenerating ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>📝 Generate Article</>
              )}
            </button>
          </form>
        </div>

        {/* Progress Tracker */}
        {currentArticle && (
          <div className="card">
            <h3 className="card-title">Generating: {currentArticle.topic}</h3>
            
            <div className="progress-section">
              <div className="progress-header">
                <span>{getProgressStage(currentArticle.progress)}</span>
                <span>{Math.round(currentArticle.progress)}%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${currentArticle.progress}%` }}></div>
              </div>
            </div>

            <div className="progress-steps">
              <div className={`progress-step ${currentArticle.progress >= 25 ? 'completed' : currentArticle.progress > 0 ? 'active' : ''}`}>
                {currentArticle.progress >= 25 ? '✓' : '○'} Researching topic from multiple perspectives
              </div>
              <div className={`progress-step ${currentArticle.progress >= 50 ? 'completed' : currentArticle.progress >= 25 ? 'active' : ''}`}>
                {currentArticle.progress >= 50 ? '✓' : '○'} Generating comprehensive outline
              </div>
              <div className={`progress-step ${currentArticle.progress >= 75 ? 'completed' : currentArticle.progress >= 50 ? 'active' : ''}`}>
                {currentArticle.progress >= 75 ? '✓' : '○'} Writing article sections
              </div>
              <div className={`progress-step ${currentArticle.progress >= 100 ? 'completed' : currentArticle.progress >= 75 ? 'active' : ''}`}>
                {currentArticle.progress >= 100 ? '✓' : '○'} Polishing and adding citations
              </div>
            </div>
          </div>
        )}

        {/* Articles List */}
        <div className="card">
          <h2 className="card-title">Generated Articles</h2>
          
          <div className="articles-list">
            {articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} className="article-item">
                  <div className="article-info">
                    <div className="article-topic">{article.topic}</div>
                    <div className="article-date">{article.createdAt}</div>
                  </div>
                  <span className={`article-status status-${article.status}`}>
                    {article.status === 'completed' ? 'View Article' : article.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-state">
                No articles generated yet. Start by entering a topic above!
              </div>
            )}
          </div>
        </div>
      </div>
      
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
