"use client";

import { useState } from 'react';
import { AnimatedSection } from '../AnimatedSection';
import { services } from '@/lib/data';
import type { Service } from '@/lib/types';

interface ServicesProps {
  onOpenService: (service: Service, index: number) => void;
}

export function Services({ onOpenService }: ServicesProps) {
  return (
    <section className="services section" id="services">
      <AnimatedSection>
        <h2 className="title">What I Offer</h2>
      </AnimatedSection>
      
      <div className="services-container container grid">
        {services.map((service, index) => (
          <AnimatedSection 
            key={service.title} 
            animation="fadeInUp" 
            delay={0.1 * index}
          >
            <div className="service-card glass-card">
              <i className={`uil uil-${service.icon} service-icon`}></i>
              <h3 
                className="service-title" 
                dangerouslySetInnerHTML={{ __html: service.title }}
              ></h3>
              <button 
                className="portfolio-btn service-btn" 
                onClick={() => onOpenService(service, index)}
                aria-label={`Learn more about ${service.title.replace(/<br>/g, ' ')}`}
              >
                View More
              </button>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <style jsx>{`
        .services {
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
        
        .services-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .service-card {
          padding: 2.5rem 2rem;
          border-radius: var(--radius-xl);
          text-align: center;
          transition: all var(--transition-base);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-xl);
        }
        
        .service-icon {
          font-size: 3rem;
          color: var(--accent-solid);
          margin-bottom: 1.5rem;
          transition: transform var(--transition-base);
        }
        
        .service-card:hover .service-icon {
          transform: scale(1.1);
        }
        
        .service-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          font-weight: 600;
          line-height: 1.4;
        }
        
        .service-btn {
          margin-top: auto;
        }
        
        @media (max-width: 768px) {
          .service-card {
            padding: 1.5rem;
          }
          
          .service-icon {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
