"use client";

import Image from "next/image";
import { AnimatedSection } from '../AnimatedSection';

interface AboutProps {
  onScrollToContact: () => void;
}

export function About({ onScrollToContact }: AboutProps) {
  return (
    <section className="about section" id="about">
      <AnimatedSection>
        <h2 className="title">About me</h2>
      </AnimatedSection>
      
      <div className="about-container container grid">
        <AnimatedSection animation="slideInLeft" delay={0.1}>
          <div className="about-image-wrapper">
            <Image 
              src="/img/dammyhenry.png" 
              alt="Dammy Henry - Sr. Business Analyst & Data Engineer" 
              className="about-img" 
              width={350} 
              height={420} 
              priority
              quality={90}
              sizes="(max-width: 768px) 250px, 350px"
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 350 420'%3E%3Crect fill='%23333' width='350' height='420'/%3E%3C/svg%3E"
            />
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="slideInRight" delay={0.2}>
          <div className="about-content">
            <p className="about-text">
              I&apos;m Dammy Henry — a Senior Business Analyst and Data Engineer with 12+ years of experience across 
              financial services, healthcare, and enterprise technology. I bridge the gap between business needs and 
              data solutions: leading requirements, aligning stakeholders, and building the ETL pipelines, data 
              warehouses, and analytics infrastructure that turn strategy into measurable outcomes.
            </p>
            <p className="about-text">
              Across banking, healthcare, transit, and insurance I have led enterprise EDI integrations, driven 
              requirements analysis, and delivered $137K+ in documented cost savings across seven clients in a single 
              quarter. I also build iOS apps in Swift and design web experiences — combining analytical depth with a 
              builder&apos;s instinct.
            </p>
            
            <h4 className="what-i-do-title">What I do</h4>
            <ul className="what-i-do-list">
              <li>Implementation of EDI and Integrated Payables solutions</li>
              <li>Data analysis, dashboards, and reporting</li>
              <li>Process improvement and documentation</li>
              <li>Stakeholder management and cross-functional collaboration</li>
              <li>iOS App development with Swift</li>
            </ul>
            
            <div className="about-info">
              {[
                { icon: "award", title: "Experience", sub: "12+ Years" },
                { icon: "suitcase-alt", title: "Projects", sub: "60+" },
              ].map((item) => (
                <div key={item.title} className="about-box glass-card">
                  <i className={`uil uil-${item.icon} about-icon`}></i>
                  <h3 className="about-box-title">{item.title}</h3>
                  <span className="about-box-sub">{item.sub}</span>
                </div>
              ))}
            </div>
            
            <button 
              className="portfolio-btn" 
              onClick={onScrollToContact}
              aria-label="Contact me"
            >
              <i className="uil uil-navigator"></i>Contact me
            </button>
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
        .about {
          padding: 6rem 0;
        }
        
        .title {
          text-align: center;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          margin-bottom: 2rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .about-container {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 4rem;
          align-items: flex-start;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        @media (max-width: 1024px) {
          .about-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }
        }
        
        .about-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        
        .about-img {
          width: 100%;
          max-width: 350px;
          height: auto;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          transition: transform 0.3s ease;
          object-fit: cover;
        }
        
        .about-img:hover {
          transform: translateY(-10px);
        }
        
        .about-content {
          text-align: left;
        }
        
        @media (max-width: 1024px) {
          .about-content {
            text-align: center;
          }
        }
        
        .about-text {
          line-height: 1.8;
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }
        
        .what-i-do-title {
          margin: 1.5rem 0 0.75rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .what-i-do-list {
          padding-left: 1.25rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }
        
        .about-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin: 2rem 0;
        }
        
        @media (max-width: 1024px) {
          .about-info {
            max-width: 400px;
            margin: 2rem auto;
          }
        }
        
        @media (max-width: 480px) {
          .about-info {
            grid-template-columns: 1fr;
          }
        }
        
        .about-box {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          transition: transform var(--transition-base);
        }
        
        .about-box:hover {
          transform: translateY(-5px);
        }
        
        .about-icon {
          font-size: 2rem;
          color: var(--accent-solid);
          margin-bottom: 0.5rem;
        }
        
        .about-box-title {
          font-size: 1rem;
          margin: 0.5rem 0 0.25rem;
          color: var(--text-primary);
        }
        
        .about-box-sub {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .section {
          padding: 5rem 0 2rem;
          position: relative;
        }
        
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        @media (max-width: 768px) {
          .about {
            padding: 3rem 0;
          }
          
          .about-img {
            max-width: 250px;
          }
          
          .about-box {
            padding: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
