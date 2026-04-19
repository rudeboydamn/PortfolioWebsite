"use client";

import Link from 'next/link';
import { NavItem } from '@/lib/types';

interface SidebarProps {
  sidebar: boolean;
  section: string;
  navItems: NavItem[];
  onToggleSidebar: () => void;
  onCloseSidebar: () => void;
  onScrollToSection: (id: string) => void;
}

export function Sidebar({ 
  sidebar, 
  section, 
  navItems, 
  onToggleSidebar, 
  onCloseSidebar, 
  onScrollToSection 
}: SidebarProps) {
  return (
    <>
      {/* Mobile Toggle Button */}
      <div 
        className="nav-toggle" 
        onClick={onToggleSidebar}
        onKeyDown={(e) => e.key === 'Enter' && onToggleSidebar()}
        aria-expanded={sidebar}
        aria-label="Toggle navigation menu"
        role="button"
        tabIndex={0}
      >
        <i className="uil uil-bars"></i>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebar ? 'open' : ''}`}>
        <div className="nav-logo">D</div>
        
        <nav className="nav-menu">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                {item.isLink ? (
                  <Link 
                    href={item.href!} 
                    className="nav-link"
                    onClick={onCloseSidebar}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${section === item.id ? "active" : ""}`}
                    onClick={(e) => { 
                      e.preventDefault(); 
                      onScrollToSection(item.id); 
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Close Button */}
        <button 
          className="nav-close" 
          onClick={onCloseSidebar}
          aria-label="Close navigation menu"
          style={{ 
            position: "absolute", 
            top: "1.5rem", 
            right: "1.5rem", 
            cursor: "pointer",
            display: sidebar ? "flex" : "none",
            width: "50px",
            height: "50px",
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            borderRadius: "15px",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            color: "var(--text-primary)",
            fontSize: "1.8rem"
          }}
        >
          <i className="uil uil-times"></i>
        </button>
      </aside>

      <style jsx>{`
        .nav-toggle {
          position: fixed;
          top: 2rem;
          right: 1.5rem;
          width: 60px;
          height: 60px;
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          color: var(--text-primary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          cursor: pointer;
          z-index: 1000;
          display: none;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
        }
        
        .nav-toggle:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-md);
        }
        
        .nav-toggle:focus-visible {
          outline: 2px solid var(--accent-solid);
          outline-offset: 2px;
        }
        
        .nav-toggle:active {
          transform: scale(0.95);
        }
        
        .nav-toggle i {
          font-size: 1.5rem;
        }
        
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 100px;
          background: transparent;
          z-index: 998;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .nav-logo {
          position: fixed;
          top: 2rem;
          left: 2rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          z-index: 999;
        }
        
        .nav-menu {
          position: fixed;
          transform: rotate(-90deg) translateX(-100%);
          transform-origin: left top;
          width: 100vh;
          top: 50px;
        }
        
        .nav-list {
          display: flex;
          flex-direction: row-reverse;
          margin: 0 auto;
          list-style: none;
          justify-content: center;
          padding: 0;
        }
        
        .nav-item {
          margin: 0;
        }
        
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          padding: 0 1.2rem;
          height: 80px;
          line-height: 80px;
          transition: all var(--transition-base);
          position: relative;
          font-weight: 500;
          text-transform: capitalize;
          font-size: 0.9rem;
          display: block;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 1.8rem;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--accent-solid);
          transition: width var(--transition-base);
          transform: translateX(-50%);
        }
        
        .nav-link:hover,
        .nav-link.active {
          color: var(--text-primary);
        }
        
        .nav-link:hover::before,
        .nav-link.active::before {
          width: 20px;
        }
        
        @media (max-width: 1024px) {
          .nav-toggle {
            display: flex;
          }
          
          .sidebar {
            width: 100%;
            background: var(--bg-primary);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            transform: translateX(-100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          
          .sidebar.open {
            transform: translateX(0);
          }
          
          .nav-menu {
            transform: none;
            position: relative;
            width: 100%;
            top: auto;
            height: auto;
            display: flex;
            justify-content: center;
          }
          
          .nav-list {
            flex-direction: column;
            align-items: center;
            padding: 2rem 0;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .nav-link {
            padding: 1.25rem 2rem;
            line-height: 1.5;
            height: auto;
            font-size: 1.25rem;
            display: block;
            text-align: center;
            border-radius: var(--radius-lg);
            transition: all var(--transition-base);
          }
          
          .nav-link:hover,
          .nav-link.active {
            background: var(--glass-bg);
            transform: scale(1.05);
          }
          
          .nav-link::before {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .nav-toggle {
            top: 1rem;
            right: 1rem;
            width: 55px;
            height: 55px;
          }
          
          .nav-logo {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            font-size: 1.5rem;
          }
          
          .nav-link {
            font-size: 1.1rem;
            padding: 1rem 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
