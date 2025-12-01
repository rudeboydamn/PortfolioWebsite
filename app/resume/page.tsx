"use client";

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/theme-toggle';

export default function ResumePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--background)', 
      color: 'rgba(255,255,255,0.9)', 
      fontFamily: "'Poppins', sans-serif", 
      padding: '2rem' 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary-color: #667eea;
          --text-color: rgba(255,255,255,0.9);
          --background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        }

        [data-theme="dark"] {
          --primary-color: #60a5fa;
          --background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        .resume-container { max-width: 900px; margin: 0 auto; }
        .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; transition: color 0.3s; }
        .back-link:hover { color: white; }
        .resume-header { text-align: center; margin-bottom: 3rem; }
        .resume-title { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .resume-subtitle { font-size: 1.2rem; color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; }
        .section-title { font-size: 1.5rem; margin: 2.5rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid rgba(255,255,255,0.2); color: #667eea; }
        .job-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-radius: 15px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1); }
        .job-title { font-size: 1.2rem; color: white; margin-bottom: 0.25rem; }
        .job-date { font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 1rem; }
        .job-list { margin: 0; padding-left: 1.25rem; }
        .job-list li { margin-bottom: 0.5rem; line-height: 1.6; color: rgba(255,255,255,0.85); }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .skill-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-radius: 12px; padding: 1rem; border: 1px solid rgba(255,255,255,0.1); }
        .skill-card h4 { color: #667eea; margin-bottom: 0.5rem; font-size: 1rem; }
        .skill-card ul { margin: 0; padding-left: 1rem; }
        .skill-card li { margin-bottom: 0.25rem; font-size: 0.9rem; color: rgba(255,255,255,0.8); }
        .edu-item { background: rgba(255,255,255,0.05); border-radius: 10px; padding: 1rem; margin-bottom: 0.75rem; border: 1px solid rgba(255,255,255,0.1); }
        .cert-list { list-style: none; padding: 0; }
        .cert-list li { background: rgba(255,255,255,0.05); border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 0.5rem; border: 1px solid rgba(255,255,255,0.1); }
        .print-btn { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 500; transition: transform 0.3s, box-shadow 0.3s; }
        .print-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(102,126,234,0.4); }
        @media print { .back-link, .print-btn { display: none !important; } body { background: white !important; color: black !important; } }
      `}</style>
      
      <div className="resume-container">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
        
        <ThemeToggle />
        
        <header className="resume-header">
          <h1 className="resume-title">DAMMY HENRY, MBA</h1>
          <p className="resume-subtitle">Financial Analyst & Web Developer</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>Harrisburg, PA • dammy@dammyhenry.com • linkedin.com/in/dammyhenry</p>
          <button className="print-btn" onClick={() => window.print()} style={{ marginTop: '1rem' }}>
            Print Resume
          </button>
        </header>

        <section>
          <h2 className="section-title">Professional Summary</h2>
          <p style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.85)' }}>
            Financial Analyst with extensive experience in financial analysis, trend forecasting, and implementing 
            Integrated Payables and EDI services. Proven track record in influencing decisions and delivering detailed 
            insights to support strategic objectives. Adept at using data-driven approaches to enhance financial 
            operations and drive business success.
          </p>
        </section>

        <section>
          <h2 className="section-title">Work Experience</h2>
          
          <article className="job-card">
            <h3 className="job-title">PNC Bank — Sr. Implementation Analyst</h3>
            <p className="job-date">Apr 2024 – Present · Pittsburgh, PA</p>
            <ul className="job-list">
              <li>Developed and implemented new client systems through analysis and testing, enhancing system efficiency and increasing client satisfaction by 20%.</li>
              <li>Ensured the smooth flow of electronic data between business partners by handling inbound and outbound documents, conducting audits, and networking with partners.</li>
              <li>Solved complex project issues by leveraging technology, collaborating with service partners, and applying deductive reasoning.</li>
              <li>Managed and led EDI projects and setups including documentation, QA, implementation support, and workflow management.</li>
            </ul>
          </article>

          <article className="job-card">
            <h3 className="job-title">PNC Bank — Sr. Data Analyst</h3>
            <p className="job-date">Feb 2019 – Apr 2024 · Pittsburgh, PA</p>
            <ul className="job-list">
              <li>Collected and prepared data from diverse sources, ensuring accuracy and consistency, improving reliability of analyses.</li>
              <li>Analyzed data using statistical techniques to identify patterns and trends which informed strategic business decisions.</li>
              <li>Created dashboards and charts to communicate insights, increasing stakeholder engagement.</li>
              <li>Prepared comprehensive reports and presentations that summarized key insights, leading to actionable recommendations.</li>
              <li>Partnered cross-functionally to understand needs and provide relevant analysis supporting decisions.</li>
            </ul>
          </article>

          <article className="job-card">
            <h3 className="job-title">Alpha Medical Transit — Business Analyst</h3>
            <p className="job-date">Nov 2017 – Feb 2019 · Kalamazoo, MI</p>
            <ul className="job-list">
              <li>Standardized and automated operational reports for fleet management using Excel and created contextual dashboards in Visio.</li>
              <li>Built strong relationships with crucial internal and external stakeholders to align with company objectives.</li>
              <li>Implemented row-level security in Power BI and created DAX measures to enhance data security and reporting accuracy.</li>
              <li>Identified and documented system constraints and implications of proposed changes, minimizing risks.</li>
            </ul>
          </article>

          <article className="job-card">
            <h3 className="job-title">Hill and Usher Insurance and Surety — MBA Marketing Research Intern</h3>
            <p className="job-date">May 2017 – Nov 2017 · Phoenix, AZ</p>
            <ul className="job-list">
              <li>Crafted and presented a marketing plan for Employment Practices Liability Insurance Packages.</li>
              <li>Queried and analyzed company data (SQL) to provide accurate, data-driven information to underwriters and insurers.</li>
              <li>Marketed to and communicated with clients across North America, increasing engagement and reach.</li>
              <li>Standardized and automated lead intake processes and documentation.</li>
            </ul>
          </article>

          <article className="job-card">
            <h3 className="job-title">Tee and Dee Services — Process Improvement Specialist</h3>
            <p className="job-date">Nov 2013 – Jan 2015 · Akure, NG</p>
            <ul className="job-list">
              <li>Led a team to identify and overhaul inefficient processes, using data analytics to justify modernization and track progress.</li>
              <li>Created process flow diagrams in Microsoft Visio to map business processes and identify areas for improvement.</li>
              <li>Documented key business processes and rules for automation, reducing manual effort.</li>
              <li>Created SOPs and dashboards for executive reviews; updated policies using analytics to ensure compliance and efficiency.</li>
            </ul>
          </article>
        </section>

        <section>
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h4>Data & Analytics</h4>
              <ul>
                <li>SQL, Power BI (DAX, RLS)</li>
                <li>Excel (Power Query), ETL</li>
                <li>Reporting & Dashboarding</li>
              </ul>
            </div>
            <div className="skill-card">
              <h4>Implementation</h4>
              <ul>
                <li>EDI (X12, onboarding, QA)</li>
                <li>Integrated Payables</li>
                <li>Process Mapping (Visio)</li>
              </ul>
            </div>
            <div className="skill-card">
              <h4>Automation</h4>
              <ul>
                <li>RPA (UiPath)</li>
                <li>Scripting & Workflow</li>
                <li>Documentation & SOPs</li>
              </ul>
            </div>
            <div className="skill-card">
              <h4>Development</h4>
              <ul>
                <li>HTML, CSS, JavaScript</li>
                <li>React, TypeScript, Swift</li>
                <li>Python, PLpgSQL</li>
              </ul>
            </div>
            <div className="skill-card">
              <h4>Core Skills</h4>
              <ul>
                <li>Stakeholder Management</li>
                <li>Problem Solving</li>
                <li>Communication</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="section-title">Education</h2>
          <div className="edu-item">
            <strong>Harvard Business School Online</strong>, Boston, MA<br/>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Certification, Business Analytics</span>
          </div>
          <div className="edu-item">
            <strong>Grand Canyon University</strong>, Phoenix, AZ<br/>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>MBA, Business Analysis & Marketing</span>
          </div>
          <div className="edu-item">
            <strong>Federal University of Technology</strong>, Minna, NG<br/>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>B.Tech, Urban Planning and Data Science</span>
          </div>
        </section>

        <section>
          <h2 className="section-title">Certifications</h2>
          <ul className="cert-list">
            <li>Certified Associate in Project Management (PMI) — 2015</li>
            <li>AutoCAD 2D & 3D Design Certification — 2010</li>
            <li>Executive Member, Delta Mu Delta (International Honors Society in Business) — 2018</li>
            <li>RPA Starter Training — 2022</li>
            <li>UiPath Certified Robotic Process Automation (RPA) — 2023</li>
          </ul>
        </section>
      </div>
      
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
