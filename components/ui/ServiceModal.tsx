"use client";

import { Service } from '@/lib/types';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  if (!service) return null;

  return (
    <div 
      className="modal" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content glass-card">
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <h3 id="modal-title" className="modal-title">
          {service.title.replace(/<br>/g, " ")}
        </h3>
        <p className="modal-description">
          I offer quality services to clients and companies.
        </p>
        <ul className="modal-list">
          {service.items.map((item: string) => (
            <li key={item} className="modal-item">
              <span className="checkmark">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          border-radius: var(--radius-2xl);
          padding: 3rem;
          max-width: 600px;
          width: 100%;
          position: relative;
          animation: scaleIn 0.3s ease;
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-size: 1.5rem;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
        }
        
        .modal-close:hover {
          background: var(--accent-gradient);
          color: white;
          transform: rotate(90deg);
        }
        
        .modal-title {
          margin-bottom: 1rem;
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .modal-description {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        .modal-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .modal-item {
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        
        .checkmark {
          position: absolute;
          left: 0;
          color: var(--color-success);
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .modal-content {
            margin: 1rem;
            padding: 1.5rem;
            max-width: calc(100vw - 2rem);
            max-height: calc(100vh - 2rem);
            overflow-y: auto;
          }
          
          .modal-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
