"use client";

import React from 'react';
import Link from 'next/link';

export default function GamesPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
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
        }
      `}</style>

      <div className="games-container">
        <div className="games-icon">🎮</div>
        <h1 className="games-title">Games</h1>
        <p className="games-subtitle">Coming Soon!</p>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
          Exciting games and interactive experiences are being developed. Stay tuned for updates!
        </p>
        <Link href="/" className="back-btn">
          <span>← Back to Home</span>
        </Link>
      </div>
    </>
  );
}
