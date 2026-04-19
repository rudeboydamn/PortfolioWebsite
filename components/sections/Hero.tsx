"use client";

import { AnimatedSection } from '../AnimatedSection';
import ThemeToggle from '../theme-toggle';

interface HeroProps {
  onScrollToAbout: () => void;
}

export function Hero({ onScrollToAbout }: HeroProps) {
  return (
    <section className="home" id="home">
      <ThemeToggle />
      <AnimatedSection animation="fadeInUp" className="home-data">
        <h1 className="home-title">Hi, I&apos;m Dammy</h1>
        <h3 className="home-subtitle">Data Engineer</h3>
        <button 
          className="portfolio-btn" 
          onClick={onScrollToAbout}
          aria-label="Learn more about me"
        >
          <i className="uil uil-user"></i>More About me
        </button>
      </AnimatedSection>
      <div 
        className="interactive-hero"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          e.currentTarget.style.setProperty('--mx', `${x}%`);
          e.currentTarget.style.setProperty('--my', `${y}%`);
        }}
        aria-hidden="true"
      ></div>

      <style jsx>{`
        .home {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        [data-theme="light"] .home {
          background: linear-gradient(135deg, #f0f0f0 0%, #ffffff 100%);
        }
        
        .home::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 50%, rgba(80,80,80,0.15) 0%, transparent 50%), 
                      radial-gradient(circle at 80% 20%, rgba(60,60,60,0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        [data-theme="light"] .home::before {
          background: radial-gradient(circle at 20% 50%, rgba(200,200,200,0.1) 0%, transparent 50%), 
                      radial-gradient(circle at 80% 20%, rgba(180,180,180,0.08) 0%, transparent 50%);
        }
        
        .home-data {
          max-width: 700px;
          padding: 3rem;
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: var(--radius-2xl);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          text-align: center;
          margin: 2rem;
          position: relative;
          z-index: 1;
        }
        
        .home-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff, #cccccc, #888888);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
        }
        
        [data-theme="light"] .home-title {
          background: linear-gradient(135deg, #000000, #444444);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .home-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          font-weight: 500;
          font-style: italic;
        }
        
        .interactive-hero {
          position: absolute;
          inset: 0;
          pointer-events: auto;
        }
        
        @media (max-width: 768px) {
          .home-data {
            margin: 1rem;
            padding: 1.5rem;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
