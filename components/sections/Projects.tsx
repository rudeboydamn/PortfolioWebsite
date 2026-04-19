"use client";

import { useState } from 'react';
import Image from 'next/image';
import { AnimatedSection } from '../AnimatedSection';
import { implProjects, implCategories, steadfastImages, works } from '@/lib/data';

export function Projects() {
  const [expandedImpl, setExpandedImpl] = useState<number | null>(null);
  const [implFilter, setImplFilter] = useState<string>("all");

  const filteredImpl = implFilter === "all" 
    ? implProjects 
    : implProjects.filter(p => p.category === implFilter);

  return (
    <section className="impl-section section" id="implementations">
      <AnimatedSection>
        <h2 className="title">Key Implementation Projects</h2>
      </AnimatedSection>
      
      <div className="container">
        <AnimatedSection animation="fadeIn" delay={0.1}>
          <p className="section-intro">
            A portfolio of enterprise implementations showcasing complex integrations, 
            creative problem-solving, and measurable business impact across financial services and healthcare.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.2}>
          <div className="impl-stats-bar glass-card">
            {[
              { number: "7", label: "Enterprise Clients" },
              { number: "$137K+", label: "Cost Savings" },
              { number: "60%", label: "Efficiency Gain" },
              { number: "100%", label: "On-Time Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="impl-stat-item">
                <div className="impl-stat-number">{stat.number}</div>
                <div className="impl-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.3}>
          <div className="impl-filter-container">
            {implCategories.map(cat => (
              <button
                key={cat}
                className={`impl-filter-btn ${implFilter === cat ? "active" : ""}`}
                onClick={() => setImplFilter(cat)}
                aria-pressed={implFilter === cat}
              >
                {cat === "all" ? "All Projects" : cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="impl-projects-grid">
          {filteredImpl.map((project, index) => (
            <AnimatedSection 
              key={project.id} 
              animation="fadeInUp" 
              delay={0.1 * (index % 3)}
            >
              <div
                className={`impl-project-card glass-card ${expandedImpl === project.id ? "impl-expanded" : ""}`}
                onClick={() => setExpandedImpl(expandedImpl === project.id ? null : project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setExpandedImpl(expandedImpl === project.id ? null : project.id)}
              >
                <div className="impl-project-header">
                  <div className="impl-project-icon">{project.icon}</div>
                  <div className="impl-project-meta">
                    <div className="impl-project-client">{project.client}</div>
                    <h3 className="impl-project-title">{project.title}</h3>
                    <span className="impl-project-category">{project.category}</span>
                  </div>
                </div>
                <p className="impl-project-challenge">{project.challenge}</p>
                
                {expandedImpl === project.id && (
                  <>
                    <div className="impl-section-content">
                      <h4 className="impl-section-title">
                        <span className="impl-section-bar"></span>
                        My Approach
                      </h4>
                      <ul className="impl-approach-list">
                        {project.approach.map((item, idx) => (
                          <li key={idx}>
                            <span className="approach-arrow">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="impl-section-content">
                      <h4 className="impl-section-title">
                        <span className="impl-section-bar"></span>
                        Business Impact
                      </h4>
                      <div className="impl-impact-grid">
                        {project.impact.map((item, idx) => (
                          <div key={idx} className="impact-item">
                            <div className="impact-metric">{item.metric}</div>
                            <div className="impact-desc">{item.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="impl-section-title">
                        <span className="impl-section-bar"></span>
                        Technologies
                      </h4>
                      <div className="tech-tags">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                <button
                  className="impl-expand-btn"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setExpandedImpl(expandedImpl === project.id ? null : project.id); 
                  }}
                  aria-expanded={expandedImpl === project.id}
                >
                  {expandedImpl === project.id ? "← Collapse Details" : "View Full Case Study →"}
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* SteadFast iOS App Showcase */}
        <AnimatedSection animation="fadeIn" delay={0.4}>
          <h3 className="subsection-title">Featured Project</h3>
          <div className="steadfast-showcase glass-card">
            <div className="steadfast-header">
              <div>
                <h4 className="steadfast-title">SteadFast iOS App</h4>
                <span className="steadfast-subtitle">Fasting & Meditation with a Blob Companion</span>
              </div>
              <a 
                href="https://github.com/rudeboydamn/SteadFast" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="steadfast-github"
                aria-label="View SteadFast on GitHub"
              >
                <i className="uil uil-github"></i>
              </a>
            </div>
            <div className="steadfast-images">
              {steadfastImages.map((img, idx) => (
                <div key={idx} className="steadfast-image-wrapper">
                  <Image 
                    src={img} 
                    alt={`SteadFast App Screenshot ${idx + 1}`} 
                    width={140} 
                    height={280} 
                    className="steadfast-img"
                    loading={idx < 3 ? "eager" : "lazy"}
                    quality={85}
                    sizes="140px"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 280'%3E%3Crect fill='%23222' width='140' height='280'/%3E%3C/svg%3E"
                  />
                </div>
              ))}
            </div>
            <p className="steadfast-description">
              An iOS app where users track fasting windows and meditation sessions while caring for a virtual blob companion that grows with their consistency.
            </p>
          </div>
        </AnimatedSection>

        {/* Other Projects */}
        <AnimatedSection animation="fadeIn" delay={0.5}>
          <h3 className="subsection-title">Other Projects</h3>
          <div className="other-projects">
            {works.filter(w => w.id !== 1).map((work) => (
              <a 
                key={work.id} 
                href={work.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="work-card glass-card"
              >
                <div className="work-info">
                  <h4 className="work-title">{work.title}</h4>
                  <span className="work-type">{work.type}</span>
                </div>
                <i className="uil uil-external-link-alt work-link-icon"></i>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
        .impl-section {
          padding: 5rem 0 3rem;
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
        
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .section-intro {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        
        .impl-stats-bar {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2.5rem;
          padding: 1.5rem;
          flex-wrap: wrap;
        }
        
        .impl-stat-item {
          text-align: center;
        }
        
        .impl-stat-number {
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-weight: 700;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .impl-stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        
        .impl-filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        
        .impl-filter-btn {
          padding: 0.45rem 1.1rem;
          border-radius: 50px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-base);
          font-size: 0.85rem;
          font-family: inherit;
        }
        
        .impl-filter-btn:hover {
          background: var(--accent-gradient);
          color: white;
        }
        
        .impl-filter-btn.active {
          background: var(--accent-gradient);
          color: white;
          border-color: transparent;
        }
        
        .impl-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        @media (max-width: 768px) {
          .impl-projects-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .impl-project-card {
          padding: 1.75rem;
          cursor: pointer;
          transition: all var(--transition-base);
        }
        
        .impl-project-card:hover {
          border-color: rgba(100, 100, 100, 0.3);
          transform: translateY(-5px);
        }
        
        .impl-expanded {
          grid-column: 1 / -1;
        }
        
        .impl-project-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .impl-project-icon {
          font-size: 2rem;
          background: var(--glass-bg);
          padding: 0.6rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--glass-border);
        }
        
        .impl-project-meta {
          flex: 1;
        }
        
        .impl-project-client {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }
        
        .impl-project-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        
        .impl-project-category {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          background: var(--glass-bg);
          border-radius: 20px;
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }
        
        .impl-project-challenge {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        
        .impl-section-content {
          margin-bottom: 1.5rem;
        }
        
        .impl-section-title {
          font-size: 0.9rem;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .impl-section-bar {
          width: 3px;
          height: 16px;
          background: var(--accent-gradient);
          border-radius: 2px;
          display: inline-block;
        }
        
        .impl-approach-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .impl-approach-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.6;
        }
        
        .approach-arrow {
          position: absolute;
          left: 0;
          color: var(--text-tertiary);
        }
        
        .impl-impact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        
        @media (max-width: 480px) {
          .impl-impact-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .impact-item {
          background: var(--glass-bg);
          padding: 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }
        
        .impact-metric {
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        
        .impact-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        
        .tech-tag {
          padding: 0.25rem 0.6rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          font-size: 0.7rem;
          color: var(--text-secondary);
        }
        
        .impl-expand-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.6rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-base);
          font-family: inherit;
          font-size: 0.85rem;
          margin-top: 1rem;
        }
        
        .impl-expand-btn:hover {
          background: var(--accent-gradient);
          color: white;
          border-color: transparent;
        }
        
        .subsection-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin: 3rem 0 1.5rem;
          font-weight: 600;
        }
        
        .steadfast-showcase {
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .steadfast-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .steadfast-title {
          color: var(--text-primary);
          margin: 0;
          font-size: 1.1rem;
        }
        
        .steadfast-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        
        .steadfast-github {
          color: var(--text-tertiary);
          font-size: 1.2rem;
          transition: color var(--transition-base);
        }
        
        .steadfast-github:hover {
          color: var(--text-primary);
        }
        
        .steadfast-images {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
          scrollbar-color: var(--accent-solid) var(--glass-bg);
        }
        
        .steadfast-images::-webkit-scrollbar {
          height: 4px;
        }
        
        .steadfast-images::-webkit-scrollbar-track {
          background: var(--glass-bg);
          border-radius: 10px;
        }
        
        .steadfast-images::-webkit-scrollbar-thumb {
          background: var(--accent-solid);
          border-radius: 10px;
        }
        
        .steadfast-image-wrapper {
          flex-shrink: 0;
          scroll-snap-align: start;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }
        
        .steadfast-img {
          display: block;
          object-fit: cover;
          border-radius: var(--radius-lg);
        }
        
        .steadfast-description {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.75rem;
          line-height: 1.5;
        }
        
        .other-projects {
          display: grid;
          gap: 1rem;
        }
        
        .work-card {
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
          transition: all var(--transition-base);
        }
        
        .work-card:hover {
          background: var(--glass-bg);
          transform: translateX(5px);
        }
        
        .work-title {
          color: var(--text-primary);
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .work-type {
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        
        .work-link-icon {
          color: var(--accent-solid);
          font-size: 1.2rem;
        }
      `}</style>
    </section>
  );
}
