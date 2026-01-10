"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/theme-toggle';

type Project = {
  id: number;
  client: string;
  title: string;
  category: string;
  icon: string;
  challenge: string;
  approach: string[];
  impact: {
    metric: string;
    description: string;
  }[];
  technologies: string[];
};

const projects: Project[] = [
  {
    id: 1,
    client: "Gordon Food Services",
    title: "Multi-Party EDI 820 ACH Payment Integration",
    category: "Payment Solutions",
    icon: "🏦",
    challenge: "Gordon Food Services needed to implement a new EDI 820 ACH payment solution with embedded addenda transmitted through High Radius before reaching the end client—a multi-party integration requiring precise coordination and technical specifications.",
    approach: [
      "Initiated a comprehensive kickoff call to verify critical technical details including ISA header preferences, PGP encryption requirements, file turnaround times, and credit/debit handling protocols",
      "Proposed and established weekly staging project sync meetings to maintain visibility and momentum",
      "Documented and validated the client's preference to use their existing ISA header instructions",
      "Guided the team through end-to-end testing protocols, including null file testing with PGP encryption",
      "Created clear communication channels for work order direction and specifications"
    ],
    impact: [
      { metric: "On-Time Delivery", description: "Project delivered on time and to exact specifications" },
      { metric: "Zero Post-Production Fixes", description: "Weekly sync cadence caught and resolved all issues early in development" },
      { metric: "Streamlined Operations", description: "Established smooth operational workflow between Gordon Food Services, High Radius, and PNC" },
      { metric: "Faster Payment Processing", description: "Enabled accelerated payment processing for vendors" }
    ],
    technologies: ["EDI 820", "ACH", "PGP Encryption", "AS2/SFTP", "High Radius"]
  },
  {
    id: 2,
    client: "BDO USA",
    title: "Enterprise File Integration & Scope Redefinition",
    category: "Requirements Analysis",
    icon: "📋",
    challenge: "BDO USA submitted a request for testing services covering Positive Pay, ACH, Wires, and Acknowledgment files. What appeared straightforward required deeper analysis to uncover hidden complexities.",
    approach: [
      "Proactively reworked project documentation, creating a comprehensive synopsis reflecting all technical requirements",
      "Engaged cross-functional teams including MIS and EFX for transmission coordination",
      "Identified critical upstream dependency: BDO needed to confirm producer file nomenclature would integrate with their PeopleSoft ERP system",
      "Flagged that ACH integration would require separate file configurations for PPD versus CCD+/CTX formats, potentially requiring Snap Logic/DPS configuration changes",
      "Created a risk assessment highlighting how filename mismatches would trigger manual processes"
    ],
    impact: [
      { metric: "3-4 Weeks Saved", description: "Prevented testing phase delays by catching complexities early" },
      { metric: "15-20 Hours/Month", description: "Eliminated manual processing workarounds for BDO" },
      { metric: "$50,000 Annual Savings", description: "Implementation became template for similar PeopleSoft ERP integrations" },
      { metric: "Client Commendation", description: "Praised for thoroughness and proactive approach" }
    ],
    technologies: ["Positive Pay", "ACH (PPD/CCD+/CTX)", "Wire Transfers", "PeopleSoft ERP", "Snap Logic/DPS"]
  },
  {
    id: 3,
    client: "Diebold Nixdorf Inc",
    title: "Adaptive Scope Management & EDI Enhancement",
    category: "Agile Delivery",
    icon: "🔄",
    challenge: "Diebold Nixdorf initially engaged us to update their invalid CTX reporting functionality. During discovery, an additional need for inbound EDI 820 testing emerged.",
    approach: [
      "Actively listened during client conversations to uncover the additional EDI 820 testing requirement",
      "Evaluated technical overlap and resource availability rather than treating the new request as scope creep",
      "Restructured the project plan to accommodate both requests simultaneously",
      "Coordinated testing sequences to maximize efficiency and minimize client resources required"
    ],
    impact: [
      { metric: "3-4 Weeks Saved", description: "Eliminated need for second project kickoff" },
      { metric: "Comprehensive Solution", description: "Improved both reporting and payment processing capabilities" },
      { metric: "Strengthened Relationship", description: "Positioned as trusted advisor thinking beyond immediate requests" },
      { metric: "Reduced Admin Overhead", description: "Single engagement instead of separate implementations" }
    ],
    technologies: ["EDI 820", "CTX Reporting", "Inbound EDI Processing"]
  },
  {
    id: 4,
    client: "Metergy Solutions",
    title: "Mastercard RPPS Implementation & Knowledge Building",
    category: "Documentation & Training",
    icon: "📚",
    challenge: "Metergy Solutions requested adding Mastercard RPPS Items in CIE format to two RT55 (EDI 820) setups. This was a highly specialized configuration with virtually no documentation—only one person on the Electronic Commerce team had partial knowledge.",
    approach: [
      "Partnered closely with the one knowledgeable team member to extract tacit knowledge",
      "Implemented the solution incrementally, documenting each step as I progressed",
      "Created comprehensive technical documentation covering configuration steps, data mappings, testing protocols, and troubleshooting guidance",
      "Validated documentation by having another team member review for clarity and completeness",
      "Established this documentation as a reusable asset in the knowledge repository"
    ],
    impact: [
      { metric: "60% Efficiency Gain", description: "Reduced implementation time from 40+ hours to ~15 hours for similar requests" },
      { metric: "6 Subsequent Uses", description: "Documentation referenced for future client implementations" },
      { metric: "Risk Mitigation", description: "Eliminated single-point-of-failure knowledge dependency" },
      { metric: "Team Enablement", description: "Junior team members can now handle complex implementations" }
    ],
    technologies: ["Mastercard RPPS", "CIE Format", "RT55", "EDI 820"]
  },
  {
    id: 5,
    client: "Thoroughbred Funding / Norfolk Southern",
    title: "Creative Data Pathway Solution",
    category: "Problem Solving",
    icon: "🚂",
    challenge: "A critical issue affected high-value client Thoroughbred Funding and enterprise customer Norfolk Southern. The Pay Day Wire Report showed freight bill numbers on the PNC website, but this data was missing in High Radius. The standard solution would require modifying a map used by thousands of enterprise customers—a high-risk, 6+ month timeline approach.",
    approach: [
      "Engaged the Product Management Team to assess whether the EDI mapping change qualified for their development backlog",
      "Discovered standard solution would take 6+ months just to start, with unknown completion timeline",
      "Analyzed alternative data pathways and identified that since data originated from PME, we could leverage an existing freeform field",
      "Presented creative alternative: have all vendors populate the OBI field, which was already available and would pass freight bill data to High Radius",
      "Provided clear implementation guidance to make the transition seamless"
    ],
    impact: [
      { metric: "2 Weeks vs 6+ Months", description: "Issue resolved in fraction of standard timeline" },
      { metric: "$75,000 Saved", description: "Avoided enterprise-wide development costs" },
      { metric: "Zero Client Disruption", description: "Eliminated risk to thousands of other clients" },
      { metric: "Relationship Strengthened", description: "High satisfaction from both Norfolk Southern and Thoroughbred Funding" }
    ],
    technologies: ["EDI Mapping", "PME", "High Radius", "OBI Field Configuration", "Wire Reporting"]
  },
  {
    id: 6,
    client: "Trinity Health",
    title: "Enterprise-Wide Formatting Solution",
    category: "Technical Resolution",
    icon: "🏥",
    challenge: "Trinity Health, a major healthcare powerhouse, reported check numbers not populating correctly in their Integrated Receivables setup. Additionally, Wellmark ACH items had formatting issues related to a tilde (~) character appearing after the company ID in addenda records.",
    approach: [
      "Convened internal cross-functional meeting to diagnose data feed issues between EDI and lockbox",
      "Identified that Wellmark's tilde character in addenda was causing formatting errors",
      "Recognized asking Wellmark to modify their EDI file was not viable—they process thousands of transactions daily",
      "Positioned the project as production support rather than new feature to protect client from unnecessary costs",
      "Led technical team to develop a patch; when initial testing failed, reconvened for deeper root cause analysis",
      "Pivoted strategy to develop a global solution fixing not only Trinity Health's issue but preventing similar problems across all clients"
    ],
    impact: [
      { metric: "$12,000 Saved", description: "Client avoided feature development fees through production support classification" },
      { metric: "40+ Issues Prevented", description: "Global fix prevented similar formatting problems across entire client base" },
      { metric: "15% Accuracy Improvement", description: "Enhanced data accuracy in integrated receivables processing" },
      { metric: "Expanded Engagement", description: "Client praised persistence and strategic thinking" }
    ],
    technologies: ["Integrated Receivables", "EDI", "Lockbox", "ACH Addenda Processing"]
  },
  {
    id: 7,
    client: "Regal Beloit / Rexnord",
    title: "Rare EBPP Implementation & Enterprise Enhancement",
    category: "Specialized Implementation",
    icon: "⚙️",
    challenge: "Regal Beloit was consolidating direct transmission files, sunsetting two of three files and retaining only their EDI 820 file transmitting to Esker. They needed to add Payer Express transactions via EBPP—highly specialized work completed only 8 times previously at PNC Bank.",
    approach: [
      "Created EBPP AR9 with custom mapping, using EBPP AR8 as template while establishing new value translation table",
      "Set up Alpha receiver with RT 55 configuration to mirror existing receiver account",
      "Identified and resolved critical mismatch between effective dates and posted dates during initial testing",
      "When client testing revealed AMEX duplication and contactless 'tap pay' returning undefined payment type ZZZ, led comprehensive solution effort",
      "Coordinated patch to exclude AMEX from EBPP file and updated value translation table for contactless payments",
      "Ensured mapping and translation table updates were applied globally for all enterprise clients"
    ],
    impact: [
      { metric: "8-10 Hours/Month Saved", description: "Streamlined reconciliation process for Regal Beloit" },
      { metric: "100+ Hours Saved", description: "Global updates prevented future troubleshooting across client base" },
      { metric: "Reference Implementation", description: "Became template for all 4 subsequent EBPP deployments" },
      { metric: "Modern Payment Support", description: "Properly classified contactless payments for dozens of enterprise clients" }
    ],
    technologies: ["EBPP", "EDI 820", "Esker", "Payer Express", "RT 55", "Value Translation Tables"]
  }
];

export default function ImplementationsPage() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.category === filter);

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
          --primary-gradient: linear-gradient(135deg, #667eea, #764ba2);
          --text-color: rgba(255,255,255,0.9);
          --text-muted: rgba(255,255,255,0.7);
          --background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          --glass-bg: rgba(255,255,255,0.05);
          --glass-border: rgba(255,255,255,0.1);
        }

        [data-theme="dark"] {
          --primary-color: #60a5fa;
          --background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        body {
          background: var(--background);
          min-height: 100vh;
        }

        .implementations-container { 
          max-width: 1200px; 
          margin: 0 auto; 
        }

        .back-link { 
          color: rgba(255,255,255,0.8); 
          text-decoration: none; 
          display: inline-flex; 
          align-items: center; 
          gap: 0.5rem; 
          margin-bottom: 2rem; 
          transition: all 0.3s;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
        }
        .back-link:hover { 
          color: white; 
          background: rgba(255,255,255,0.1);
          transform: translateX(-5px);
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-title { 
          font-size: 2.5rem; 
          margin-bottom: 0.5rem; 
          background: var(--primary-gradient); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
        }

        .page-subtitle { 
          color: var(--text-muted); 
          margin-bottom: 2rem; 
          font-size: 1.1rem; 
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .filter-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
          font-family: 'Poppins', sans-serif;
        }

        .filter-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .filter-btn.active {
          background: var(--primary-gradient);
          color: white;
          border-color: transparent;
        }

        .projects-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
          gap: 2rem; 
        }

        .project-card { 
          background: var(--glass-bg); 
          backdrop-filter: blur(15px); 
          border-radius: 24px; 
          padding: 2rem; 
          border: 1px solid var(--glass-border); 
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }

        .project-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 25px 50px rgba(0,0,0,0.25);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .project-card.expanded {
          grid-column: 1 / -1;
        }

        .project-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .project-icon { 
          font-size: 2.5rem;
          background: var(--glass-bg);
          padding: 0.75rem;
          border-radius: 16px;
          border: 1px solid var(--glass-border);
        }

        .project-meta {
          flex: 1;
        }

        .project-client { 
          font-size: 0.85rem; 
          color: var(--primary-color);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.25rem;
        }

        .project-title { 
          font-size: 1.2rem; 
          color: white; 
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .project-category {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(102, 126, 234, 0.2);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--primary-color);
        }

        .project-challenge { 
          color: var(--text-muted); 
          font-size: 0.95rem; 
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .project-section {
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 0.9rem;
          color: white;
          margin-bottom: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-title::before {
          content: '';
          width: 3px;
          height: 16px;
          background: var(--primary-gradient);
          border-radius: 2px;
        }

        .approach-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .approach-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .approach-list li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--primary-color);
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .impact-item {
          background: rgba(102, 126, 234, 0.1);
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .impact-metric {
          font-size: 1rem;
          color: white;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .impact-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          padding: 0.35rem 0.75rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .expand-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.75rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          margin-top: 1rem;
        }

        .expand-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 3rem;
          padding: 1.5rem;
          background: var(--glass-bg);
          border-radius: 20px;
          border: 1px solid var(--glass-border);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .impact-grid {
            grid-template-columns: 1fr;
          }

          .stats-bar {
            flex-direction: column;
            gap: 1.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .filter-container {
            gap: 0.5rem;
          }

          .filter-btn {
            padding: 0.4rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
      
      <div className="implementations-container">
        <Link href="/#experience" className="back-link">
          ← Back to Experience
        </Link>
        
        <ThemeToggle />
        
        <div className="page-header">
          <h1 className="page-title">Business Implementation Projects</h1>
          <p className="page-subtitle">
            A portfolio of enterprise implementations showcasing complex integrations, 
            creative problem-solving, and measurable business impact across financial services and healthcare.
          </p>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">7</div>
            <div className="stat-label">Enterprise Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$137K+</div>
            <div className="stat-label">Cost Savings Delivered</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">60%</div>
            <div className="stat-label">Avg. Efficiency Gain</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">On-Time Delivery</div>
          </div>
        </div>

        <div className="filter-container">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card ${expandedProject === project.id ? 'expanded' : ''}`}
              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            >
              <div className="project-header">
                <div className="project-icon">{project.icon}</div>
                <div className="project-meta">
                  <div className="project-client">{project.client}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
              </div>

              <p className="project-challenge">{project.challenge}</p>

              {expandedProject === project.id && (
                <>
                  <div className="project-section">
                    <h4 className="section-title">My Approach</h4>
                    <ul className="approach-list">
                      {project.approach.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-section">
                    <h4 className="section-title">Business Impact</h4>
                    <div className="impact-grid">
                      {project.impact.map((item, idx) => (
                        <div key={idx} className="impact-item">
                          <div className="impact-metric">{item.metric}</div>
                          <div className="impact-desc">{item.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="project-section">
                    <h4 className="section-title">Technologies & Systems</h4>
                    <div className="tech-tags">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button className="expand-btn" onClick={(e) => {
                e.stopPropagation();
                setExpandedProject(expandedProject === project.id ? null : project.id);
              }}>
                {expandedProject === project.id ? '← Collapse Details' : 'View Full Case Study →'}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </div>
  );
}
