"use client";

import Link from 'next/link';
import { AnimatedSection } from '../AnimatedSection';

interface FooterProps {
  onScrollToServices: () => void;
  onScrollToContact: () => void;
}

export function Footer({ onScrollToServices, onScrollToContact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer glass-card">
      <div className="container">
        <AnimatedSection>
          <h2 className="footer-name">Dammy Henry</h2>
          <p className="footer-role">Data Engineer</p>
          
          <nav className="footer-links">
            <button 
              className="footer-link" 
              onClick={onScrollToServices}
              aria-label="Go to services section"
            >
              Services
            </button>
            <Link href="/builds" className="footer-link">
              Builds
            </Link>
            <Link href="/implementations" className="footer-link">
              Enterprise Projects
            </Link>
            <button 
              className="footer-link" 
              onClick={onScrollToContact}
              aria-label="Go to contact section"
            >
              Contact
            </button>
            <Link href="/thoughts" className="footer-link">
              Thoughts
            </Link>
          </nav>
          
          <p className="footer-copyright">
            &copy; {currentYear} Dammy Henry. All rights reserved.
          </p>
        </AnimatedSection>
      </div>

      <style jsx>{`
        .footer {
          border-radius: 30px 30px 0 0;
          padding: 3rem 0;
          text-align: center;
          margin-top: 3rem;
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          border-bottom: none;
        }
        
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .footer-name {
          color: var(--text-primary);
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .footer-role {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin: 1.5rem 0;
          flex-wrap: wrap;
        }
        
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: all var(--transition-base);
          padding: 0.5rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          background: transparent;
          border: none;
          font-size: 0.9rem;
          font-family: inherit;
        }
        
        .footer-link:hover {
          color: var(--text-primary);
          background: var(--glass-bg);
        }
        
        .footer-copyright {
          font-size: 0.85rem;
          margin-top: 1rem;
          color: var(--text-tertiary);
        }
        
        @media (max-width: 768px) {
          .footer {
            padding: 2rem 1rem;
            border-radius: 20px 20px 0 0;
          }
          
          .footer-links {
            gap: 0.5rem;
          }
          
          .footer-link {
            padding: 0.5rem 0.75rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </footer>
  );
}
