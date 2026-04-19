"use client";

import { useState, FormEvent } from 'react';
import { AnimatedSection } from '../AnimatedSection';
import { ContactStatus } from '@/lib/types';

const contactInfo = [
  { icon: "envelope-edit", title: "Email", data: "dammy@dammyhenry.com", href: "mailto:dammy@dammyhenry.com" },
  { icon: "linkedin", title: "LinkedIn", data: "linkedin.com/in/dammyhenry", href: "https://www.linkedin.com/in/dammyhenry" },
  { icon: "github", title: "GitHub", data: "github.com/rudeboydamn", href: "https://github.com/rudeboydamn" },
];

export function Contact() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<ContactStatus>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setContactStatus("sending");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: contactName, 
          email: contactEmail, 
          message: contactMessage 
        }),
      });
      
      if (res.ok) {
        setContactStatus("sent");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
        setTimeout(() => setContactStatus("idle"), 5000);
      } else {
        setContactStatus("error");
        setTimeout(() => setContactStatus("idle"), 4000);
      }
    } catch {
      setContactStatus("error");
      setTimeout(() => setContactStatus("idle"), 4000);
    }
  };

  return (
    <section className="contact section" id="contact">
      <AnimatedSection>
        <h2 className="title">Contact me</h2>
      </AnimatedSection>
      
      <div className="contact-container container grid">
        <AnimatedSection animation="slideInLeft" delay={0.1}>
          <div className="contact-info">
            {contactInfo.map((contact) => (
              <a 
                key={contact.title} 
                href={contact.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-link"
              >
                <div className="contact-card glass-card">
                  <i className={`uil uil-${contact.icon} contact-icon`}></i>
                  <h3 className="contact-title">{contact.title}</h3>
                  <span className="contact-data">{contact.data}</span>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="slideInRight" delay={0.2}>
          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            {contactStatus === "sent" && (
              <div className="contact-banner success" role="alert">
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {contactStatus === "error" && (
              <div className="contact-banner error" role="alert">
                Something went wrong. Please try again or email me directly.
              </div>
            )}
            
            <div className="input-container">
              <input 
                type="text" 
                className="input" 
                placeholder=" " 
                value={contactName} 
                onChange={(e) => setContactName(e.target.value)} 
                required 
                aria-label="Full Name"
              />
              <label className="label">Full Name</label>
            </div>
            
            <div className="input-container">
              <input 
                type="email" 
                className="input" 
                placeholder=" " 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)} 
                required 
                aria-label="Email"
              />
              <label className="label">Email</label>
            </div>
            
            <div className="input-container">
              <textarea 
                className="input textarea" 
                placeholder=" " 
                value={contactMessage} 
                onChange={(e) => setContactMessage(e.target.value)} 
                required
                aria-label="Message"
                rows={4}
              ></textarea>
              <label className="label">Message</label>
            </div>
            
            <button 
              type="submit" 
              className="portfolio-btn submit-btn" 
              disabled={contactStatus === "sending"}
            >
              <i className="uil uil-navigator"></i>
              {contactStatus === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </AnimatedSection>
      </div>

      <style jsx>{`
        .contact {
          padding: 5rem 0;
        }
        
        .section {
          padding: 5rem 0 2rem;
          position: relative;
        }
        
        .title {
          text-align: center;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          margin-bottom: 2rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        @media (max-width: 1024px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .contact-link {
          text-decoration: none;
        }
        
        .contact-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
          transition: all var(--transition-base);
        }
        
        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .contact-icon {
          font-size: 1.8rem;
          color: var(--accent-solid);
          margin-bottom: 0.5rem;
        }
        
        .contact-title {
          color: var(--text-primary);
          margin-top: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .contact-data {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .contact-form {
          padding: 2rem;
          border-radius: var(--radius-xl);
        }
        
        .contact-banner {
          padding: 1rem 1.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
          font-weight: 500;
          margin-bottom: 1.5rem;
          animation: fadeInUp 0.4s ease;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .contact-banner.success {
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #22c55e;
        }
        
        .contact-banner.error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }
        
        .input-container {
          position: relative;
          margin-bottom: 1.5rem;
        }
        
        .input {
          width: 100%;
          padding: 1rem 1.5rem;
          background: var(--glass-bg);
          border: 2px solid var(--glass-border);
          border-radius: var(--radius-lg);
          color: var(--text-primary);
          font-size: 1rem;
          transition: all var(--transition-base);
          font-family: inherit;
        }
        
        .input:focus {
          outline: none;
          border-color: var(--accent-solid);
          background: rgba(255, 255, 255, 0.08);
        }
        
        .input:focus + .label,
        .input:not(:placeholder-shown) + .label {
          top: 0;
          font-size: 0.85rem;
          color: var(--accent-solid);
          transform: translateY(-50%);
          background: var(--bg-primary);
          padding: 0 0.5rem;
        }
        
        .label {
          position: absolute;
          top: 50%;
          left: 1.5rem;
          transform: translateY(-50%);
          color: var(--text-secondary);
          pointer-events: none;
          transition: all var(--transition-base);
        }
        
        .textarea {
          min-height: 120px;
          resize: vertical;
        }
        
        .textarea + .label {
          top: 1.5rem;
        }
        
        .textarea:focus + .label,
        .textarea:not(:placeholder-shown) + .label {
          top: 0;
        }
        
        .submit-btn {
          width: 100%;
          justify-content: center;
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .contact-card {
            padding: 1rem;
          }
          
          .contact-form {
            padding: 1.5rem;
          }
          
          .input {
            padding: 0.875rem 1rem;
          }
        }
      `}</style>
    </section>
  );
}
