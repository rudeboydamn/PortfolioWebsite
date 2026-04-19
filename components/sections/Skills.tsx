"use client";

import { useState } from 'react';
import { AnimatedSection } from '../AnimatedSection';
import { skills, skillCategories } from '@/lib/data';
import type { SkillCategory } from '@/lib/types';

export function Skills() {
  const [activeSkill, setActiveSkill] = useState<SkillCategory>("data");

  return (
    <section className="section" id="experience">
      <AnimatedSection>
        <h2 className="title">My Experience</h2>
      </AnimatedSection>
      
      <div className="skills-container container grid">
        <AnimatedSection animation="slideInLeft" delay={0.1}>
          <div className="skill-categories">
            {skillCategories.map((skill) => (
              <div
                key={skill.id}
                className={`skills-header glass-card ${activeSkill === skill.id ? "active" : ""}`}
                onClick={() => setActiveSkill(skill.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveSkill(skill.id)}
                aria-pressed={activeSkill === skill.id}
              >
                <i className={`uil uil-${skill.icon} skills-icon`}></i>
                <div className="skill-header-content">
                  <h3 className="skill-title">{skill.title}</h3>
                  <span className="skill-years">{skill.years}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="slideInRight" delay={0.2}>
          <div className="skills-content-wrapper">
            <div className="skills-content">
              {skills[activeSkill].map((skill) => (
                <div key={skill.n} className="skills-data">
                  <div className="skills-titles">
                    <h3 className="skill-name">{skill.n}</h3>
                    <span className="skill-percent">{skill.p}%</span>
                  </div>
                  <div className="skills-bar">
                    <div 
                      className="skills-per" 
                      style={{ width: `${skill.p}%` }}
                      role="progressbar"
                      aria-valuenow={skill.p}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.n} proficiency`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
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
        
        .skills-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        @media (max-width: 1024px) {
          .skills-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        
        .skill-categories {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .skills-header {
          display: flex;
          align-items: center;
          padding: 1.2rem;
          border-radius: var(--radius-lg);
          cursor: pointer;
          background: var(--glass-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--glass-border);
          transition: all var(--transition-base);
        }
        
        .skills-header:hover {
          transform: translateX(5px);
          background: var(--glass-bg);
        }
        
        .skills-header.active {
          background: linear-gradient(135deg, #333, #111) !important;
          transform: translateX(10px);
          box-shadow: var(--shadow-lg);
        }
        
        .skills-header.active .skills-icon {
          color: #ffffff !important;
        }
        
        .skills-header.active .skill-title,
        .skills-header.active .skill-years {
          color: #ffffff !important;
        }
        
        [data-theme="light"] .skills-header.active {
          background: linear-gradient(135deg, #333, #111) !important;
        }
        
        [data-theme="light"] .skills-header.active .skill-title,
        [data-theme="light"] .skills-header.active .skill-years,
        [data-theme="light"] .skills-header.active .skills-icon {
          color: #ffffff !important;
        }
        
        .skills-icon {
          font-size: 2rem;
          color: var(--accent-solid);
          margin-right: 1rem;
          transition: all var(--transition-base);
        }
        
        .skill-header-content {
          flex: 1;
        }
        
        .skill-title {
          margin: 0;
          font-size: 1rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .skill-years {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        
        .skills-content-wrapper {
          animation: slideIn 0.5s ease;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .skills-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .skills-data {
          padding: 0.75rem;
          border-radius: var(--radius-md);
          transition: background var(--transition-base);
        }
        
        .skills-data:hover {
          background: var(--glass-bg);
        }
        
        .skills-titles {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        
        .skill-name {
          font-size: 0.95rem;
          margin: 0;
          color: var(--text-primary);
        }
        
        .skill-percent {
          color: var(--accent-solid);
        }
        
        .skills-bar {
          height: 6px;
          background: var(--glass-bg);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        
        .skills-per {
          height: 100%;
          background: var(--accent-gradient);
          transition: width 1s ease;
          border-radius: var(--radius-full);
        }
        
        @media (max-width: 768px) {
          .skills-header {
            padding: 0.75rem 1rem;
          }
          
          .skills-header h3 {
            font-size: 0.9rem;
          }
          
          .skills-icon {
            font-size: 1.5rem;
            margin-right: 0.75rem;
          }
          
          .skills-data {
            padding: 0.5rem;
          }
          
          .skills-titles h3 {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
