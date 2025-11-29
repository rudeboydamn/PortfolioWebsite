"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PortfolioWebsite: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const navItems = ["Home", "About", "Skills", "Work", "Thoughts", "Contact", "Games"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Direct email using mailto as fallback
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    // Try API first, fallback to mailto
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Fallback to mailto
        window.location.href = `mailto:dammy@dammyhenry.com?subject=${subject}&body=${body}`;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to mailto
      window.location.href = `mailto:dammy@dammyhenry.com?subject=${subject}&body=${body}`;
    }
  };
  
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.remove('gradient-theme');
    } else {
      document.body.classList.add('gradient-theme');
    }
  }, [isDarkTheme]);

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
          background: #0a0a0a;
          color: rgba(255, 255, 255, 0.9);
          min-height: 100vh;
          overflow-x: hidden;
          transition: background 0.5s ease;
        }
        
        body.gradient-theme {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
        }

        /* Home section styling */
        #home {
          background: #0a0a0a;
        }

        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 280px;
          height: 100vh;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border-right: 2px solid rgba(167, 139, 250, 0.3);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 3rem 2rem;
          z-index: 1000;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
        }

        .logo {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #a78bfa, #8b5cf6, #7c3aed);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 4rem;
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.6);
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .nav-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        .nav-item {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .nav-item::before {
          content: '→';
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .nav-item:hover {
          color: rgba(255, 255, 255, 1);
          background: rgba(167, 139, 250, 0.1);
          transform: translateX(5px);
        }
        
        .nav-item:hover::before {
          opacity: 1;
          transform: translateX(0);
        }
        
        .nav-item.active {
          color: rgba(255, 255, 255, 1);
          background: rgba(167, 139, 250, 0.2);
          border-left: 3px solid #a78bfa;
        }
        
        .nav-item.active::before {
          opacity: 1;
          transform: translateX(0);
        }

        .main-content {
          margin-left: 280px;
          min-height: 100vh;
        }

        .section {
          min-height: 100vh;
          padding: 4rem 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 25px;
          padding: 3rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .btn {
          background: linear-gradient(135deg, #a78bfa, #8b5cf6);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
        }

        .title {
          font-size: 3.5rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.8rem;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
        }

        .home-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 3rem;
        }
        
        .home-content {
          max-width: 900px;
        }
        
        .badge {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: rgba(167, 139, 250, 0.2);
          border: 2px solid rgba(167, 139, 250, 0.4);
          border-radius: 50px;
          color: #c4b5fd;
          font-weight: 600;
          margin-bottom: 2rem;
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(167, 139, 250, 0); }
        }
        
        .highlight {
          color: rgba(255, 255, 255, 1);
          font-weight: 700;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn-secondary {
          background: transparent;
          border: 2px solid rgba(167, 139, 250, 0.6);
          color: white;
        }
        
        .btn-secondary:hover {
          background: rgba(167, 139, 250, 0.1);
          border-color: #a78bfa;
        }
        
        .theme-toggle {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 2000;
          width: 70px;
          height: 35px;
          border-radius: 35px;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 3px;
          transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        .toggle-slider {
          width: 27px;
          height: 27px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a78bfa, #8b5cf6);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
        }
        
        .theme-toggle.active .toggle-slider {
          transform: translateX(35px);
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
        }

        .home-image {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 25px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          margin-top: 3rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .stat-card {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #a78bfa;
        }

        .stat-title {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 3rem;
        }

        .skill-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          transition: all 0.3s ease;
        }

        .skill-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }

        .skill-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .skill-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, #a78bfa, #8b5cf6);
          border-radius: 10px;
          transition: width 1s ease;
        }

        .work-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 3rem;
        }

        .work-card {
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .work-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(10px);
        }

        .work-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .work-company {
          font-size: 1.3rem;
          font-weight: 600;
          color: white;
        }

        .work-period {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .work-role {
          font-size: 1.1rem;
          color: #a78bfa;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .work-description {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-top: 3rem;
        }

        .contact-info-card {
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .contact-info-card:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .contact-icon {
          font-size: 2rem;
          color: #a78bfa;
          margin-bottom: 1rem;
        }

        .contact-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }

        .contact-value {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-input {
          width: 100%;
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 15px;
          color: white;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.12);
          border-color: #a78bfa;
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        textarea.form-input {
          resize: vertical;
          min-height: 150px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          color: rgba(255, 255, 255, 0.95);
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            flex-direction: row;
            justify-content: space-between;
            padding: 1rem 1.5rem;
            position: fixed;
            bottom: 0;
            top: auto;
            border-right: none;
            border-top: 2px solid rgba(167, 139, 250, 0.3);
          }

          .nav-items {
            flex-direction: row;
            gap: 0.5rem;
            overflow-x: auto;
          }
          
          .nav-item {
            font-size: 0.85rem;
            padding: 0.75rem 1rem;
            white-space: nowrap;
          }
          
          .nav-item::before {
            display: none;
          }
          
          .nav-item.active {
            border-left: none;
            border-bottom: 3px solid #a78bfa;
          }

          .logo {
            margin-bottom: 0;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .main-content {
            margin-left: 0;
            margin-bottom: 100px;
          }
          
          .theme-toggle {
            top: auto;
            bottom: 6rem;
            right: 1rem;
            width: 60px;
            height: 30px;
          }
          
          .toggle-slider {
            width: 24px;
            height: 24px;
          }
          
          .theme-toggle.active .toggle-slider {
            transform: translateX(30px);
          }

          .section {
            padding: 3rem 1.5rem;
          }

          .home-section {
            gap: 1.5rem;
          }
          
          .cta-buttons {
            flex-direction: column;
          }

          .about-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .title {
            font-size: 2.5rem;
            line-height: 1.2;
          }
          
          .badge {
            font-size: 0.9rem;
            padding: 0.6rem 1.2rem;
          }

          .subtitle {
            font-size: 1.5rem;
          }

          .glass-card {
            padding: 2rem;
          }
        }
      `}</style>

      {/* Theme Toggle */}
      <button 
        className={`theme-toggle ${!isDarkTheme ? 'active' : ''}`}
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        aria-label="Toggle theme"
      >
        <div className="toggle-slider"></div>
      </button>

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo">D</div>
        <nav className="nav-items">
          {navItems.map((item) => {
            if (item === "Games") {
              return (
                <Link
                  key={item}
                  href="/games"
                  className="nav-item"
                >
                  {item}
                </Link>
              );
            }
            return (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-item ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.toLowerCase());
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Home Section */}
        <section id="home" className="section">
          <div className="container">
            <div className="home-section">
              <div className="home-content">
                <h1 className="title">
                  Hi, I&apos;m <span className="highlight">Dammy Henry</span>
                </h1>
                <h2 className="subtitle">
                  Senior Business Analyst | EDI Expert
                </h2>
                <p className="description">
                  Transforming business operations through <strong>EDI implementations</strong>, process automation, and data-driven solutions. With over 10 years of experience as a Business Analyst, I specialize in bridging the gap between business needs and technical execution, delivering seamless digital transformation that drives measurable results.
                </p>
                <p className="description">
                  📍 Based in <strong>Harrisburg, PA</strong> | 📧 <strong>dammy@dammyhenry.com</strong>
                </p>
                <div className="cta-buttons">
                  <button className="btn" onClick={() => {
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <span>View My Experience 💼</span>
                  </button>
                  <button className="btn btn-secondary" onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <span>Let&apos;s Connect 🤝</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <div className="container">
            <h2 className="section-title">About me</h2>
            <div className="about-grid">
              <div>
                <Image
                  src="/dammyhenry.png"
                  alt="Dammy Henry"
                  width={400}
                  height={500}
                  className="home-image"
                />
              </div>
              <div>
                <p className="description">
                  Hi, I&apos;m Dammy Henry, based in Harrisburg, PA. I&apos;m a Financial Analyst with extensive experience in financial analysis, trend forecasting, and implementing Integrated Payables and EDI services. I use data-driven approaches to enhance financial operations, streamline processes, and deliver insights that drive strategic outcomes.
                </p>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">🎓</div>
                    <div className="stat-title">Experience</div>
                    <div className="stat-value">10+ Years</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">💼</div>
                    <div className="stat-title">Completed</div>
                    <div className="stat-value">60+ EDI Implementations</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-title">Specialization</div>
                    <div className="stat-value">Business Analysis</div>
                  </div>
                </div>
                <button className="btn" style={{ marginTop: '2rem' }} onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Contact me
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <div className="container">
            <h2 className="section-title">Core Competencies</h2>
            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-name">Financial Modeling</div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <div className="skill-name">EDI Implementations</div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <div className="skill-name">Pigment</div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <div className="skill-name">SQL</div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <div className="skill-name">Power BI</div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <div className="skill-name">Data Visualization</div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <div className="skill-name">RPA (UI Path)</div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <div className="skill-name">Excel Automation</div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="skill-card">
                <div className="skill-name">EDI Management</div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work/Experience Section */}
        <section id="work" className="section">
          <div className="container">
            <h2 className="section-title">Experience</h2>
            <div className="work-grid">
              <div className="work-card">
                <div className="work-header">
                  <div className="work-company">PNC Bank</div>
                  <div className="work-period">Apr 2024 - Present</div>
                </div>
                <div className="work-role">Sr. Implementation Analyst - Harrisburg, PA</div>
                <div className="work-description">
                  Developed and implemented new client systems through analysis and testing, enhancing system efficiency and increasing client satisfaction by 20%. Managed EDI projects and setups, including documentation, quality assurance, and workflow management.
                </div>
              </div>

              <div className="work-card">
                <div className="work-header">
                  <div className="work-company">PNC Bank</div>
                  <div className="work-period">Feb 2019 - Apr 2024</div>
                </div>
                <div className="work-role">Sr. Data Analyst - Harrisburg, PA</div>
                <div className="work-description">
                  Collected and prepared data from diverse sources, ensuring accuracy and consistency. Analyzed data using statistical techniques to identify patterns and trends, which informed strategic business decisions.
                </div>
              </div>

              <div className="work-card">
                <div className="work-header">
                  <div className="work-company">Alpha Medical Transit</div>
                  <div className="work-period">Nov 2017 - Feb 2019</div>
                </div>
                <div className="work-role">Business Analyst - Kalamazoo, MI</div>
                <div className="work-description">
                  Standardized and automated operational reports for fleet management using Excel and created contextual dashboards in Visio. Implemented row-level security in Power BI to control access to financial data.
                </div>
              </div>

              <div className="work-card">
                <div className="work-header">
                  <div className="work-company">Hill and Usher Insurance</div>
                  <div className="work-period">May 2017 - Nov 2017</div>
                </div>
                <div className="work-role">MBA Marketing Research Intern - Phoenix, AZ</div>
                <div className="work-description">
                  Collaborated with the sales team to craft and present marketing plans. Mined, queried, and analyzed company data using SQL to provide accurate, data-driven information to underwriters.
                </div>
              </div>

              <div className="work-card">
                <div className="work-header">
                  <div className="work-company">Tee and Dee Services</div>
                  <div className="work-period">Nov 2013 - Jan 2015</div>
                </div>
                <div className="work-role">Process Improvement Specialist - Akure, NG</div>
                <div className="work-description">
                  Led a team to identify and overhaul inefficient processes, using data analytics to create key artifacts that justified modernization efforts and tracked implementation progress.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Thoughts Section */}
        <section id="thoughts" className="section">
          <div className="container">
            <h2 className="section-title">Thoughts</h2>
            <p className="description" style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
              Insights on EDI implementation, business analysis, and digital transformation
            </p>
            <div className="work-grid">
              <div className="work-card" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/blog/ai-edi-integration/'}>
                <div className="work-header">
                  <div className="work-company">📝 Blog Post</div>
                  <div className="work-period">October 20, 2025</div>
                </div>
                <div className="work-role">The Future is Here: How AI is Revolutionizing EDI Integration</div>
                <div className="work-description">
                  Discover how AI-driven EDI boosts efficiency, accuracy, and business intelligence across modern supply chains. Learn about predictive insights, error prevention, and the future of intelligent EDI systems.
                </div>
              </div>

              <div className="work-card" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/blog/supply-chain-resilience-edi/'}>
                <div className="work-header">
                  <div className="work-company">📝 Blog Post</div>
                  <div className="work-period">October 26, 2025</div>
                </div>
                <div className="work-role">Strengthening Supply-Chain Resilience Through EDI Integration</div>
                <div className="work-description">
                  As global disruptions persist, companies use EDI to improve visibility, agility, and partner communication across the supply chain. Explore real-world applications and practical steps for implementation.
                </div>
              </div>

              <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                <div className="stat-icon" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎙️</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.95)' }}>Coming Soon</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}>
                  More blogs and podcasts on business analysis, EDI implementations, and process optimization are on the way. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container">
            <h2 className="section-title">Contact me</h2>
            <div className="contact-grid">
              <div>
                <div className="contact-info-card">
                  <div className="contact-icon">📧</div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">dammy@dammyhenry.com</div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-icon">👤</div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">linkedin.com/in/dammyhenry</div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-icon">📍</div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Harrisburg, PA</div>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Message"
                      className="form-input"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn" style={{ width: '100%' }}>
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PortfolioWebsite;
