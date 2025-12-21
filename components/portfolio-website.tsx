"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import ThemeToggle from './theme-toggle';

type SkillCategory = "analyst" | "edi" | "relations" | "frontend" | "design" | "backend";

type Skill = {
  n: string;
  p: number;
};

type WorkItem = {
  id: number;
  title: string;
  url: string;
  type: string;
};

type Service = {
  icon: string;
  title: string;
  items: string[];
};

const skills: Record<SkillCategory, Skill[]> = {
  analyst: [
    { n: "Financial Analysis", p: 95 },
    { n: "Trend Forecasting", p: 90 },
    { n: "Data Visualization", p: 88 },
    { n: "Power BI / DAX", p: 85 },
    { n: "Excel / Power Query", p: 92 },
  ],
  edi: [
    { n: "EDI X12", p: 90 },
    { n: "AS2 / SFTP", p: 85 },
    { n: "Partner Onboarding", p: 88 },
    { n: "Integrated Payables", p: 85 },
    { n: "Process Mapping", p: 90 },
  ],
  relations: [
    { n: "Stakeholder Management", p: 95 },
    { n: "Client Communication", p: 92 },
    { n: "Cross-functional Collaboration", p: 90 },
    { n: "Requirements Gathering", p: 88 },
    { n: "Training & Documentation", p: 85 },
  ],
  frontend: [
    { n: "HTML", p: 90 },
    { n: "CSS", p: 85 },
    { n: "JavaScript", p: 80 },
    { n: "React", p: 75 },
    { n: "TypeScript", p: 70 },
  ],
  design: [
    { n: "Figma", p: 85 },
    { n: "UI Design", p: 80 },
    { n: "UX Research", p: 75 },
  ],
  backend: [
    { n: "Python", p: 80 },
    { n: "PLpgSQL", p: 75 },
    { n: "SQL", p: 85 },
    { n: "Swift", p: 65 },
  ],
};

const works: WorkItem[] = [
  { id: 1, title: "dammyhenry.com", url: "https://dammyhenry.com", type: "Web Design" },
  { id: 2, title: "Vale CRM", url: "https://github.com/rudeboydamn/valecrm", type: "iOS App" },
  { id: 3, title: "Keystonevale.org", url: "https://keystonevale.org", type: "Brand Design" },
  { id: 4, title: "Keystone Vale CRM", url: "https://keystonevale.org/crm", type: "CRM System" },
];

const services: Service[] = [
  {
    icon: "analysis",
    title: "Business<br>Analysis",
    items: ["Requirements Gathering", "Process Documentation", "Stakeholder Management", "Gap Analysis", "Solution Design"],
  },
  {
    icon: "setting",
    title: "Implementation<br>& Integration",
    items: ["EDI (X12, onboarding, QA)", "Integrated Payables", "Process Mapping (Visio)", "Partner Onboarding", "Workflow Automation"],
  },
  {
    icon: "robot",
    title: "Automation<br>& RPA",
    items: ["RPA (UiPath)", "Scripting & Workflow", "Documentation & SOPs", "Process Improvement", "System Testing"],
  },
  {
    icon: "chart-line",
    title: "Data &<br>Analytics",
    items: ["SQL & Power BI (DAX, RLS)", "Excel (Power Query), ETL", "Reporting & Dashboarding", "Trend Forecasting", "Data Visualization"],
  },
  {
    icon: "web-grid",
    title: "Web<br>Designer",
    items: ["UI Development", "Web Page Development", "Interactive UX/UI", "Brand Positioning", "Product Mockups"],
  },
  {
    icon: "arrow",
    title: "UI/UX<br>Designer",
    items: ["Usability Testing", "User Research", "Interaction Design", "Responsive Design", "Style Guides"],
  },
];

const PortfolioWebsite: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const [section, setSection] = useState("home");
  const [activeSkill, setActiveSkill] = useState<SkillCategory>("analyst");
  const [modal, setModal] = useState<number | null>(null);
  const [focus, setFocus] = useState<Record<string, boolean>>({});
  const [headerClass, setHeaderClass] = useState("");
  const [activeService, setActiveService] = useState<Service | null>(null);

  // Header scroll effect
  useEffect(() => {
    let lastScroll = 0;
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        setHeaderClass("");
        lastScroll = currentScroll;
        return;
      }
      
      if (currentScroll > lastScroll && !headerClass.includes("scroll-down")) {
        setHeaderClass("scroll-down");
      } else if (currentScroll < lastScroll && headerClass.includes("scroll-down")) {
        setHeaderClass("scroll-up");
      }
      
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerClass]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollY = window.pageYOffset;
      sections.forEach((item: HTMLElement) => {
        const height = item.clientHeight;
        const top = item.offsetTop - 50;
        const id = item.getAttribute("id");
        if (id && scrollY > top && scrollY <= top + height) {
          setSection(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setSection(id);
    setSidebar(false);
  };

  const dynamicStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    :root{--skin:linear-gradient(135deg, #667eea 0%, #764ba2 100%);--skin-solid:#667eea;--title:rgba(255,255,255,0.95);--text:rgba(255,255,255,0.8);--body:linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);--glass:rgba(255,255,255,0.1);--glass-border:rgba(255,255,255,0.2);--shadow:rgba(0,0,0,0.3);--font:'Poppins',sans-serif}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:var(--font);background:var(--body);color:var(--text);min-height:100vh;overflow-x:hidden}
    body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 50%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120,219,255,0.3) 0%, transparent 50%);pointer-events:none;z-index:-1}
    .container{max-width:1200px;margin:0 auto;padding:0 1rem}.grid{display:grid}.flex{display:flex}
    .glass-card{background:rgba(255,255,255,0.05);backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);border:1px solid rgba(255,255,255,0.1);border-radius:20px;box-shadow:0 15px 35px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);transition:all 0.4s cubic-bezier(0.23,1,0.320,1)}
    .glass-card:hover{transform:translateY(-5px);box-shadow:0 25px 50px rgba(0,0,0,0.2)}
    .btn{display:inline-flex;align-items:center;gap:.5rem;background:var(--skin);color:var(--title);padding:.75rem 1.4rem;border:none;border-radius:50px;cursor:pointer;transition:all 0.3s ease;position:relative;overflow:hidden;font-weight:500;text-decoration:none;margin-right:0.5rem;margin-top:0.5rem}
    .btn:hover{transform:translateY(-3px);box-shadow:0 10px 25px rgba(102,126,234,0.4)}
    .btn i{font-size:1.1rem}
    .section{padding:5rem 0 2rem;position:relative}.title{text-align:center;font-size:2.5rem;margin-bottom:2rem;color:var(--title);font-weight:600}
    .old-fashioned-toggle{position:absolute;top:2rem;right:2rem;z-index:100}.toggle-switch{background:none;border:none;cursor:pointer;padding:0;width:80px;height:60px;position:relative;outline:none}.toggle-lever{position:absolute;top:0;width:35px;height:50px;background:#d4af37;border-radius:4px;border:2px solid #8b7355;box-shadow:0 2px 4px rgba(0,0,0,0.3);transition:transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55),background-color 0.3s ease;z-index:2;left:0}.toggle-lever:hover{box-shadow:0 4px 8px rgba(0,0,0,0.4);transform:scale(1.05)}.toggle-switch.active .toggle-lever{transform:translateX(35px);background:#4a5568;border-color:#2d3748}.lever-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:16px;font-weight:bold;transition:opacity 0.3s ease}.light-text{opacity:1;color:#ffd700}.dark-text{opacity:0;color:#e2e8f0}.toggle-switch.active .light-text{opacity:0}.toggle-switch.active .dark-text{opacity:1}.toggle-base{position:absolute;top:20px;left:0;width:70px;height:20px;background:#8b7355;border-radius:10px;border:2px solid #654321;box-shadow:inset 0 2px 4px rgba(0,0,0,0.3)}.base-plate{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(90deg,#a08050 0%,#8b7355 50%,#a08050 100%);border-radius:8px}
    [data-theme="dark"] body{background:#000000!important}[data-theme="dark"] .home{background:#000000!important}[data-theme="dark"] body::before{display:none}[data-theme="dark"] .home::before{display:none}
    .nav-menu{position:fixed;transform:rotate(-90deg) translateX(-100%);transform-origin:left top;width:100vh;top:50px}
    .nav-list{display:flex;flex-direction:row-reverse;margin:0 auto;list-style:none;justify-content:center}
    .nav-link{color:var(--text);text-decoration:none;padding:0 1.2rem;height:80px;line-height:80px;transition:all 0.3s ease;position:relative;font-weight:500;text-transform:capitalize;font-size:0.9rem}
    .nav-link::before{content:'';position:absolute;bottom:1.8rem;left:50%;width:0;height:2px;background:var(--skin-solid);transition:width 0.3s ease;transform:translateX(-50%)}
    .nav-link:hover,.nav-link.active{color:var(--title)}
    .nav-link:hover::before,.nav-link.active::before{width:20px}
    .sidebar{position:fixed;left:0;top:0;height:100vh;width:100px;background:transparent;z-index:998}
    .nav-logo{position:fixed;top:2rem;left:2rem;font-size:1.5rem;font-weight:700;color:var(--title);z-index:999}
    .nav-toggle{position:fixed;top:2rem;right:1.5rem;width:60px;height:60px;background:var(--glass);backdrop-filter:blur(15px);color:var(--title);border:1px solid var(--glass-border);border-radius:15px;cursor:pointer;z-index:1000;display:none;align-items:center;justify-content:center;transition:all 0.3s ease}
    .nav-toggle:hover{transform:scale(1.05);box-shadow:0 5px 15px rgba(0,0,0,0.2)}
    .nav-toggle:focus{outline:none;box-shadow:0 0 0 3px var(--skin-solid)}
    .nav-toggle:active{transform:scale(0.95)}
    .nav-toggle i{font-size:1.5rem}
    .main{margin-left:100px;min-height:100vh;position:relative}
    .home{background:linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
    .home::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 50%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%);pointer-events:none}
    .home-data{max-width:700px;padding:3rem;background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border-radius:30px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 40px rgba(0,0,0,0.2);animation:fadeInUp 1s ease;text-align:center;margin:2rem}
    @keyframes fadeInUp{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
    .home-title{font-size:3.5rem;color:var(--title);margin-bottom:.5rem;font-weight:700;background:linear-gradient(135deg, #667eea, #764ba2, #f093fb);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradientShift 3s ease-in-out infinite}
    @keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
    .home-subtitle{font-size:1.5rem;margin-bottom:1.5rem;color:var(--text);font-weight:500;font-style:italic}
    .about{padding:6rem 0}.about-container{grid-template-columns:350px 1fr;gap:4rem;align-items:flex-start;max-width:1400px;margin:0 auto}.about-img{width:100%;max-width:350px;height:auto;border-radius:25px;box-shadow:0 20px 40px rgba(0,0,0,0.2);transition:transform 0.3s ease;object-fit:cover}.about-img:hover{transform:translateY(-10px)}
    .about-info{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:2rem 0}
    .about-box{padding:1.5rem;border-radius:15px;text-align:center}
    .about-icon{font-size:2rem;color:var(--skin-solid);margin-bottom:.5rem}
    .skills-container{grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
    .skills-header{display:flex;align-items:center;padding:1.2rem;border-radius:15px;cursor:pointer;margin-bottom:1rem;transition:all 0.3s ease}
    .skills-header.active{background:var(--skin);transform:translateX(10px);box-shadow:0 10px 25px rgba(102,126,234,0.3)}
    .skills-icon{font-size:2rem;color:var(--skin-solid);margin-right:1rem;transition:all 0.3s ease}
    .skills-header.active .skills-icon{color:white}
    .skills-content{animation:slideIn 0.5s ease}
    @keyframes slideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    .skills-data{margin-bottom:1.5rem;padding:0.75rem;border-radius:10px;transition:all 0.3s ease}
    .skills-data:hover{background:rgba(255,255,255,0.05)}
    .skills-titles{display:flex;justify-content:space-between;margin-bottom:.75rem;font-weight:600}
    .skills-bar{height:6px;background:rgba(255,255,255,0.1);border-radius:10px;overflow:hidden}
    .skills-per{height:100%;background:var(--skin);transition:width 1s ease;border-radius:10px}
    .work-card{padding:1rem 1.5rem;border-radius:15px;display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;cursor:pointer;text-decoration:none}
    .work-card:hover{background:rgba(255,255,255,0.08)}
    .work-card h4{color:var(--title);margin:0;font-size:1rem}
    .work-card span{color:var(--text);font-size:0.85rem}
    .work-card i{color:var(--skin-solid);font-size:1.2rem}
    .services-container{grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}
    .service-card{padding:2.5rem 2rem;border-radius:25px;text-align:center;transition:all 0.4s ease}
    .service-icon{font-size:3rem;color:var(--skin-solid);margin-bottom:1.5rem}
    .modal{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);display:${modal !== null ? "flex" : "none"};align-items:center;justify-content:center;z-index:1000;padding:1rem}
    .modal-content{border-radius:25px;padding:3rem;max-width:600px;position:relative}
    .modal-close{position:absolute;top:1rem;right:1rem;background:rgba(255,255,255,0.1);border:none;color:var(--title);font-size:1.5rem;cursor:pointer;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center}
    .contact-container{grid-template-columns:1fr 1fr;gap:4rem}
    .contact-card{padding:1.5rem;border-radius:15px;text-align:center;margin-bottom:1rem}
    .input-container{position:relative;margin-bottom:1.5rem}
    .input{width:100%;padding:1rem 1.5rem;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:15px;color:var(--title);font-size:1rem;transition:all 0.3s ease}
    .input:focus{outline:none;border-color:var(--skin-solid);background:rgba(255,255,255,0.08)}
    .label{position:absolute;top:50%;left:1.5rem;transform:translateY(-50%);color:var(--text);pointer-events:none;transition:all 0.3s ease;padding:0 0.5rem}
    .input:focus + .label,.input:not(:placeholder-shown) + .label{top:0;font-size:.85rem;color:var(--skin-solid);transform:translateY(-50%);background:rgba(30,60,114,0.9)}
    textarea.input{min-height:120px;resize:vertical}
    .footer{border-radius:30px 30px 0 0;padding:3rem 0;text-align:center;margin-top:3rem}
    .footer-links{display:flex;justify-content:center;gap:1.5rem;margin:1.5rem 0;flex-wrap:wrap}
    .footer-link{color:var(--text);text-decoration:none;transition:all 0.3s ease;padding:0.5rem 1rem;border-radius:10px;cursor:pointer}
    .footer-link:hover{color:var(--title);background:rgba(255,255,255,0.1)}
    @media(max-width:1024px){
      .sidebar{transform:translateX(${sidebar ? "0" : "-100%"})}
      .nav-toggle{display:flex}
      .main{margin-left:0}
    }
    @media(max-width:768px){
      .main{margin-left:0}
      .sidebar{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100vh;
        background:rgba(30,60,114,0.98);
        backdrop-filter:blur(20px);
        -webkit-backdrop-filter:blur(20px);
        transform:translateX(${sidebar ? "0" : "-100%"});
        transition:transform 0.4s cubic-bezier(0.23,1,0.32,1);
        z-index:999;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
      }
      .nav-menu{
        transform:none;
        position:relative;
        width:100%;
        top:auto;
        height:auto;
        display:flex;
        justify-content:center;
      }
      .nav-list{
        flex-direction:column;
        align-items:center;
        padding:2rem 0;
        justify-content:center;
        gap:0.5rem;
      }
      .nav-link{
        padding:1.25rem 2rem;
        line-height:1.5;
        height:auto;
        font-size:1.25rem;
        display:block;
        text-align:center;
        border-radius:15px;
        transition:all 0.3s ease;
      }
      .nav-link:hover,.nav-link.active{
        background:rgba(255,255,255,0.1);
        transform:scale(1.05);
      }
      .nav-link::before{display:none}
      .nav-logo{
        position:absolute;
        top:2rem;
        left:2rem;
        font-size:2rem;
        font-weight:700;
        color:var(--title);
      }
      .nav-toggle{
        position:fixed;
        top:1rem;
        right:1rem;
        width:55px;
        height:55px;
        font-size:1.5rem;
        z-index:1001;
      }
      .nav-toggle i{font-size:1.5rem}
      .home{min-height:100vh;padding:1rem}
      .home-data{
        margin:1rem;
        padding:1.5rem;
        max-width:100%;
        border-radius:20px;
      }
      .home-title{font-size:2rem;line-height:1.2}
      .home-subtitle{font-size:1.1rem;margin-bottom:1rem}
      .section{padding:3rem 0 2rem}
      .title{font-size:1.8rem;margin-bottom:1.5rem}
      .about{padding:3rem 0}
      .about-container{
        grid-template-columns:1fr;
        text-align:center;
        gap:2rem;
        padding:0 1rem;
      }
      .about-img{
        max-width:250px;
        margin:0 auto;
      }
      .about-info{grid-template-columns:1fr;gap:1rem}
      .about-box{padding:1rem}
      .skills-container{
        grid-template-columns:1fr;
        gap:2rem;
        padding:0 1rem;
      }
      .skills-header{
        padding:1rem;
        justify-content:center;
      }
      .skills-header.active{transform:none}
      .services-container{
        grid-template-columns:1fr;
        gap:1.5rem;
        padding:0 1rem;
      }
      .service-card{padding:1.5rem}
      .contact-container{
        grid-template-columns:1fr;
        gap:2rem;
        padding:0 1rem;
      }
      .contact-card{padding:1rem}
      .input{padding:0.875rem 1rem;font-size:0.95rem}
      .btn{
        padding:0.75rem 1.25rem;
        font-size:0.9rem;
        width:100%;
        justify-content:center;
        margin:0.5rem 0;
      }
      .footer{padding:2rem 1rem;border-radius:20px 20px 0 0}
      .footer-links{gap:0.5rem}
      .footer-link{padding:0.5rem 0.75rem;font-size:0.9rem}
      .modal-content{
        margin:1rem;
        padding:1.5rem;
        max-width:calc(100vw - 2rem);
        max-height:calc(100vh - 2rem);
        overflow-y:auto;
      }
      .old-fashioned-toggle{
        top:1rem;
        right:5rem;
        transform:scale(0.8);
      }
      .work-card{
        flex-direction:column;
        align-items:flex-start;
        gap:0.5rem;
        text-align:left;
      }
    }
    @media(max-width:480px){
      .home-title{font-size:1.75rem}
      .home-subtitle{font-size:1rem}
      .home-data{padding:1.25rem}
      .title{font-size:1.5rem}
      .nav-link{font-size:1.1rem;padding:1rem 1.5rem}
      .about-img{max-width:200px}
      .skills-header h3{font-size:0.9rem}
      .service-card{padding:1.25rem}
      .service-icon{font-size:2rem}
      .contact-card{padding:0.875rem}
      .glass-card{border-radius:15px}
      .btn{padding:0.625rem 1rem;font-size:0.85rem}
    }
  `;

  return (
    <>
      <style>{dynamicStyles}</style>

      <div 
        className="nav-toggle" 
        onClick={() => setSidebar((prev) => !prev)} 
        aria-expanded={sidebar} 
        aria-label="Toggle navigation menu"
        role="button"
        tabIndex={0}
      >
        <i className="uil uil-bars"></i>
      </div>

      <aside className="sidebar">
        <div className="nav-logo">D</div>
        <nav className="nav-menu">
          <ul className="nav-list">
            {[
              { id: "home", label: "home" },
              { id: "about", label: "about" },
              { id: "experience", label: "experience" },
              { id: "services", label: "services" },
              { id: "thoughts", label: "thoughts", isLink: true, href: "/thoughts" },
              { id: "builds", label: "builds", isLink: true, href: "/builds" },
              { id: "contact", label: "contact" },
            ].map((item) => (
              <li key={item.id} className="nav-item">
                {item.isLink ? (
                  <Link href={item.href!} className="nav-link">{item.label}</Link>
                ) : (
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${section === item.id ? "active" : ""}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <button 
          className="nav-close" 
          onClick={() => setSidebar(false)} 
          aria-label="Close navigation menu"
          style={{ 
            position: "absolute", 
            top: "1.5rem", 
            right: "1.5rem", 
            cursor: "pointer", 
            display: sidebar ? "flex" : "none",
            width: "50px",
            height: "50px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "15px",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease"
          }}
        >
          <i className="uil uil-times" style={{ fontSize: "1.8rem", color: "var(--title)" }}></i>
        </button>
      </aside>

      <main className="main">
        <section className="home" id="home">
          <ThemeToggle />
          <div className="home-data">
            <h1 className="home-title">Hi, I&apos;m Dammy</h1>
            <h3 className="home-subtitle">Financial Analyst &amp; Web Developer</h3>
            <button className="btn" onClick={() => scrollToSection("about")}>
              <i className="uil uil-user"></i>More About me
            </button>
          </div>
          <div 
            className="interactive-hero"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.setProperty('--mx', `${x}%`);
              e.currentTarget.style.setProperty('--my', `${y}%`);
            }}
          ></div>
        </section>

        <section className="about section" id="about">
          <h2 className="title">About me</h2>
          <div className="about-container container grid">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
              <Image src="/img/d-icon.svg" alt="Dammy Henry" className="about-img" width={350} height={420} priority style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <div>
              <p style={{ lineHeight: "1.8", marginBottom: "1rem" }}>
                I&apos;m Dammy Henry, a Financial Analyst with extensive experience in financial analysis, trend forecasting, 
                and implementing Integrated Payables and EDI services. I use data-driven approaches to enhance financial 
                operations, streamline processes, and deliver insights that drive strategic outcomes.
              </p>
              <p style={{ lineHeight: "1.8", marginBottom: "1.5rem" }}>
                Over the years, I have worked across banking, healthcare transit, and insurance to lead implementations, 
                analyze complex datasets, and build stakeholder-aligned solutions. I enjoy solving ambiguous problems, 
                collaborating cross-functionally, and creating clarity with clean reporting and documentation.
              </p>
              <h4 style={{ marginBottom: "0.75rem", color: "var(--title)" }}>What I do</h4>
              <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.8" }}>
                <li>Implementation of EDI and Integrated Payables solutions</li>
                <li>Data analysis, dashboards, and reporting</li>
                <li>Process improvement and documentation</li>
                <li>Stakeholder management and cross-functional collaboration</li>
              </ul>
              <div className="about-info">
                {[
                  { icon: "award", title: "Experience", sub: "8+ Years" },
                  { icon: "suitcase-alt", title: "Projects", sub: "20+" },
                ].map((item) => (
                  <div key={item.title} className="about-box glass-card">
                    <i className={`uil uil-${item.icon} about-icon`}></i>
                    <h3 style={{ fontSize: "1rem", margin: "0.5rem 0 0.25rem" }}>{item.title}</h3>
                    <span>{item.sub}</span>
                  </div>
                ))}
              </div>
              <button className="btn" onClick={() => scrollToSection("contact")}>
                <i className="uil uil-navigator"></i>Contact me
              </button>
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <h2 className="title">My Experience</h2>
          <div className="skills-container container grid">
            <div>
              {[
                { id: "analyst" as SkillCategory, icon: "chart", title: "Sr. Business Analyst", years: "8+ years" },
                { id: "edi" as SkillCategory, icon: "exchange", title: "EDI Implementer", years: "2+ years" },
                { id: "relations" as SkillCategory, icon: "users-alt", title: "Client Relations", years: "10+ years" },
                { id: "frontend" as SkillCategory, icon: "brackets-curly", title: "Frontend Developer", years: "2 years" },
                { id: "design" as SkillCategory, icon: "swatchbook", title: "UI/UX Designer", years: "2 years" },
                { id: "backend" as SkillCategory, icon: "server-network", title: "Backend Developer", years: "2 years" },
              ].map((skill) => (
                <div
                  key={skill.id}
                  className={`skills-header glass-card ${activeSkill === skill.id ? "active" : ""}`}
                  onClick={() => setActiveSkill(skill.id)}
                >
                  <i className={`uil uil-${skill.icon} skills-icon`}></i>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1rem" }}>{skill.title}</h3>
                    <span style={{ fontSize: "0.85rem" }}>{skill.years}</span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="skills-content">
                {skills[activeSkill].map((skill) => (
                  <div key={skill.n} className="skills-data">
                    <div className="skills-titles">
                      <h3 style={{ fontSize: "0.95rem", margin: 0 }}>{skill.n}</h3>
                      <span>{skill.p}%</span>
                    </div>
                    <div className="skills-bar">
                      <div className="skills-per" style={{ width: `${skill.p}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <h4 style={{ marginTop: "2rem", marginBottom: "1rem", color: "var(--title)" }}>Recent Projects</h4>
              {works.map((work) => (
                <a key={work.id} href={work.url} target="_blank" rel="noopener noreferrer" className="work-card glass-card">
                  <div>
                    <h4>{work.title}</h4>
                    <span>{work.type}</span>
                  </div>
                  <i className="uil uil-external-link-alt"></i>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <h2 className="title">What I Offer</h2>
          <div className="services-container container grid">
            {services.map((service, index) => (
              <div key={service.title} className="service-card glass-card">
                <i className={`uil uil-${service.icon} service-icon`}></i>
                <h3 dangerouslySetInnerHTML={{ __html: service.title }} style={{ fontSize: "1.1rem" }}></h3>
                <button className="btn" onClick={() => {
                  setActiveService(service);
                  setModal(index);
                }} style={{ marginTop: "1rem" }}>
                  View More
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content glass-card">
            <button className="modal-close" onClick={() => {
              setModal(null);
              setActiveService(null);
            }}>&times;</button>
            {activeService && (
              <>
                <h3 style={{ marginBottom: "1rem" }}>{activeService.title.replace(/<br>/g, " ")}</h3>
                <p style={{ marginBottom: "1rem" }}>I offer quality services to clients and companies.</p>
                <ul style={{ paddingLeft: "1.25rem" }}>
                  {activeService.items.map((item: string) => (
                    <li key={item} style={{ marginBottom: ".5rem" }}>✓ {item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <section className="contact section" id="contact">
          <h2 className="title">Contact me</h2>
          <div className="contact-container container grid">
            <div>
              {[
                { icon: "envelope-edit", title: "Email", data: "dammy@dammyhenry.com", href: "mailto:dammy@dammyhenry.com" },
                { icon: "linkedin", title: "LinkedIn", data: "linkedin.com/in/dammyhenry", href: "https://www.linkedin.com/in/dammyhenry" },
                { icon: "github", title: "GitHub", data: "github.com/rudeboydamn", href: "https://github.com/rudeboydamn" },
              ].map((contact) => (
                <a key={contact.title} href={contact.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div className="contact-card glass-card">
                    <i className={`uil uil-${contact.icon}`} style={{ fontSize: "1.8rem", color: "var(--skin-solid)" }}></i>
                    <h3 style={{ color: "var(--title)", marginTop: "0.5rem", fontSize: "1rem" }}>{contact.title}</h3>
                    <span style={{ fontSize: "0.9rem" }}>{contact.data}</span>
                  </div>
                </a>
              ))}
            </div>
            <form className="glass-card" style={{ padding: "2rem", borderRadius: "25px" }}>
              {["fullName", "email", "message"].map((field) => (
                <div key={field} className="input-container">
                  {field === "message" ? (
                    <textarea className="input" placeholder=" " onFocus={() => setFocus({ ...focus, [field]: true })} onBlur={(e) => setFocus({ ...focus, [field]: e.target.value !== "" })}></textarea>
                  ) : (
                    <input type={field === "email" ? "email" : "text"} className="input" placeholder=" " onFocus={() => setFocus({ ...focus, [field]: true })} onBlur={(e) => setFocus({ ...focus, [field]: e.target.value !== "" })} />
                  )}
                  <label className="label">{field === "fullName" ? "Full Name" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                </div>
              ))}
              <button type="submit" className="btn"><i className="uil uil-navigator"></i>Send Message</button>
            </form>
          </div>
        </section>

        <footer className="footer glass-card">
          <div className="container">
            <h2 style={{ color: "var(--title)", fontSize: "1.5rem" }}>Dammy Henry</h2>
            <p style={{ fontSize: "0.95rem" }}>Financial Analyst &amp; Web Developer</p>
            <div className="footer-links">
              <a className="footer-link" onClick={() => scrollToSection("services")}>Services</a>
              <Link href="/builds" className="footer-link">Builds</Link>
              <a className="footer-link" onClick={() => scrollToSection("contact")}>Contact</a>
              <Link href="/resume" className="footer-link">Resume</Link>
              <Link href="/thoughts" className="footer-link">Thoughts</Link>
            </div>
            <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>&copy; {new Date().getFullYear()} Dammy Henry. All rights reserved.</p>
          </div>
        </footer>
      </main>

      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
    </>
  );
};

export default PortfolioWebsite;
