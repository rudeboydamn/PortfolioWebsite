"use client";

import { useTheme } from '../app/providers';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`theme-toggle ${className}`}>
      <button
        className={`toggle-btn ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span className="toggle-icon" aria-hidden="true">
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
        <span className="toggle-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
      </button>

      <style jsx>{`
        .theme-toggle {
          position: relative;
          z-index: 100;
        }
        
        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 50px;
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .toggle-btn:hover {
          background: var(--accent-gradient);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }
        
        .toggle-btn:focus-visible {
          outline: 2px solid var(--accent-solid);
          outline-offset: 2px;
        }
        
        .toggle-icon {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }
        
        .toggle-btn:hover .toggle-icon {
          transform: rotate(20deg);
        }
        
        .toggle-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        @media (max-width: 768px) {
          .toggle-btn {
            padding: 0.5rem;
          }
          
          .toggle-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
