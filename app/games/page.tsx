"use client";

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/theme-toggle';

export default function GamesPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary-color: #7e22ce;
          --text-color: #f1f5f9;
          --background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
        }

        .games-wrapper {
          font-family: 'Poppins', sans-serif;
          background: var(--background);
          color: rgba(255, 255, 255, 0.9);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .games-container {
          text-align: center;
          padding: 4rem 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .games-title {
          font-size: 4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #a78bfa, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 2rem;
        }

        .games-subtitle {
          font-size: 1.8rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 3rem;
        }

        .games-icon {
          font-size: 8rem;
          margin-bottom: 2rem;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .back-btn {
          background: linear-gradient(135deg, #a78bfa, #8b5cf6);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          margin-top: 2rem;
        }

        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
        }

        .old-fashioned-toggle{position:absolute;top:2rem;right:2rem;z-index:100}.toggle-switch{background:none;border:none;cursor:pointer;padding:0;width:80px;height:60px;position:relative;outline:none}.toggle-lever{position:absolute;top:0;width:35px;height:50px;background:#d4af37;border-radius:4px;border:2px solid #8b7355;box-shadow:0 2px 4px rgba(0,0,0,0.3);transition:transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55),background-color 0.3s ease;z-index:2;left:0}.toggle-lever:hover{box-shadow:0 4px 8px rgba(0,0,0,0.4);transform:scale(1.05)}.toggle-switch.active .toggle-lever{transform:translateX(35px);background:#4a5568;border-color:#2d3748}.lever-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:16px;font-weight:bold;transition:opacity 0.3s ease}.light-text{opacity:1;color:#ffd700}.dark-text{opacity:0;color:#e2e8f0}.toggle-switch.active .light-text{opacity:0}.toggle-switch.active .dark-text{opacity:1}.toggle-base{position:absolute;top:20px;left:0;width:70px;height:20px;background:#8b7355;border-radius:10px;border:2px solid #654321;box-shadow:inset 0 2px 4px rgba(0,0,0,0.3)}.base-plate{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(90deg,#a08050 0%,#8b7355 50%,#a08050 100%);border-radius:8px}
        .games-footer { text-align: center; margin-top: 2rem; }
        .games-footer a { color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.3s; font-size: 0.95rem; }
        .games-footer a:hover { color: white; }
        @media (max-width: 768px) {
          .games-title {
            font-size: 2.5rem;
          }

          .games-subtitle {
            font-size: 1.3rem;
          }

          .games-icon {
            font-size: 5rem;
          }
          .old-fashioned-toggle { top: 1rem; right: 1rem; transform: scale(0.8); }
        }
      `}</style>

      <div className="games-wrapper">
        <div className="games-container">
          <ThemeToggle />
          
          <div className="games-icon">🎮</div>
          <h1 className="games-title">Games</h1>
          <p className="games-subtitle">Coming Soon!</p>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
            Exciting games and interactive experiences are being developed. Stay tuned for updates!
          </p>
          <Link href="/" className="back-btn">
            <span>← Back to Home</span>
          </Link>
          <div className="games-footer">
            <p><Link href="/">← dammyhenry.com</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
