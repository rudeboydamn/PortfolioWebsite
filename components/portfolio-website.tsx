"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useTheme } from '../app/providers';

type SkillCategory = "architecture" | "delivery" | "leadership";

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
  architecture: [
    { n: "Enterprise Data Architecture", p: 96 },
    { n: "Azure Synapse / Fabric / PostgreSQL", p: 92 },
    { n: "Data Warehousing & Semantic Models", p: 95 },
    { n: "Governance, Lineage & Data Contracts", p: 94 },
    { n: "Platform Reliability & Recovery", p: 90 },
  ],
  delivery: [
    { n: "ETL & Pipeline Modernization", p: 94 },
    { n: "Power BI / DAX / TMDL", p: 96 },
    { n: "SQL / Python / Power Query M", p: 93 },
    { n: "Cloud Migration & Cutover", p: 91 },
    { n: "Data Product Operating Models", p: 90 },
  ],
  leadership: [
    { n: "Portfolio & Delivery Leadership", p: 95 },
    { n: "Executive Stakeholder Alignment", p: 96 },
    { n: "Team Enablement & Mentoring", p: 92 },
    { n: "Vendor & Transition Management", p: 91 },
    { n: "Roadmaps, Standards & Runbooks", p: 94 },
  ],
};

const works: WorkItem[] = [
  { id: 1, title: "Azure PostgreSQL Modernization", url: "/builds", type: "Cloud platform cutover" },
  { id: 2, title: "EIM Knowledge", url: "/builds", type: "Enterprise knowledge system" },
  { id: 3, title: "EMIL", url: "/builds", type: "Executive market intelligence" },
  { id: 4, title: "HelpMate", url: "https://helpmate-tau.vercel.app", type: "Project operations product" },
];

const services: Service[] = [
  {
    icon: "sitemap",
    title: "Data<br>Architecture",
    items: ["Current and target-state architecture", "Data contracts and source strategy", "Warehouse and lakehouse evaluation", "Semantic layer design", "Governance and lineage"],
  },
  {
    icon: "server-network",
    title: "Platform<br>Modernization",
    items: ["Cloud migration and cutover", "ETL and pipeline modernization", "Reliability and recovery planning", "Platform transition leadership", "Technical debt reduction"],
  },
  {
    icon: "chart-growth",
    title: "Analytics<br>Strategy",
    items: ["Executive decision products", "Power BI semantic models", "KPI and metric governance", "Self-service operating models", "Portfolio rationalization"],
  },
  {
    icon: "users-alt",
    title: "Delivery<br>Leadership",
    items: ["Roadmaps and prioritization", "Cross-functional team leadership", "Vendor and partner management", "Risk, dependency and scope control", "Executive communication"],
  },
  {
    icon: "book-open",
    title: "Operational<br>Readiness",
    items: ["Knowledge transfer programs", "Recovery runbooks", "Support and ownership models", "Data quality controls", "Team enablement"],
  },
  {
    icon: "compass",
    title: "Technology<br>Advisory",
    items: ["Platform and vendor assessment", "Build, buy or modernize decisions", "Pilot design", "Cost and delivery tradeoffs", "Architecture reviews"],
  },
];



const PortfolioWebsite: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const [section, setSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const [activeSkill, setActiveSkill] = useState<SkillCategory>("architecture");
  const [modal, setModal] = useState<number | null>(null);
  const [focus, setFocus] = useState<Record<string, boolean>>({});
  const [headerClass, setHeaderClass] = useState("");
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage }),
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

  const dynamicStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    :root{--skin:linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);--skin-solid:#14b8a6;--title:rgba(255,255,255,0.95);--text:rgba(255,255,255,0.8);--body:linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);--glass:rgba(255,255,255,0.05);--glass-border:rgba(255,255,255,0.1);--shadow:rgba(0,0,0,0.5);--font:'Poppins',sans-serif}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:var(--font);background:var(--body);color:var(--text);min-height:100vh;overflow-x:hidden}
    body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 50%, rgba(80,80,80,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(60,60,60,0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(100,100,100,0.08) 0%, transparent 50%);pointer-events:none;z-index:-1}
    .container{max-width:1200px;margin:0 auto;padding:0 1rem}.grid{display:grid}.flex{display:flex}
    .glass-card{background:rgba(255,255,255,0.05);backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);border:1px solid rgba(255,255,255,0.1);border-radius:20px;box-shadow:0 15px 35px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);transition:all 0.4s cubic-bezier(0.23,1,0.320,1)}
    .glass-card:hover{transform:translateY(-5px);box-shadow:0 25px 50px rgba(0,0,0,0.2)}
    .btn{display:inline-flex;align-items:center;gap:.5rem;background:var(--skin);color:#ffffff;padding:.75rem 1.4rem;border:none;border-radius:50px;cursor:pointer;transition:all 0.3s ease;position:relative;overflow:hidden;font-weight:500;text-decoration:none;margin-right:0.5rem;margin-top:0.5rem}
    .btn:hover{transform:translateY(-3px);box-shadow:0 10px 25px rgba(20,184,166,0.35)}
    .btn i{font-size:1.1rem}
    .section{padding:5rem 0 2rem;position:relative}.title{text-align:center;font-size:2.5rem;margin-bottom:2rem;color:var(--title);font-weight:600}
    .old-fashioned-toggle{position:absolute;top:2rem;right:2rem;z-index:100}.toggle-switch{background:none;border:none;cursor:pointer;padding:0;width:80px;height:60px;position:relative;outline:none}.toggle-lever{position:absolute;top:0;width:35px;height:50px;background:#d4af37;border-radius:4px;border:2px solid #8b7355;box-shadow:0 2px 4px rgba(0,0,0,0.3);transition:transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55),background-color 0.3s ease;z-index:2;left:0}.toggle-lever:hover{box-shadow:0 4px 8px rgba(0,0,0,0.4);transform:scale(1.05)}.toggle-switch.active .toggle-lever{transform:translateX(35px);background:#4a5568;border-color:#2d3748}.lever-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:16px;font-weight:bold;transition:opacity 0.3s ease}.light-text{opacity:1;color:#ffd700}.dark-text{opacity:0;color:#e2e8f0}.toggle-switch.active .light-text{opacity:0}.toggle-switch.active .dark-text{opacity:1}.toggle-base{position:absolute;top:20px;left:0;width:70px;height:20px;background:#8b7355;border-radius:10px;border:2px solid #654321;box-shadow:inset 0 2px 4px rgba(0,0,0,0.3)}.base-plate{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(90deg,#a08050 0%,#8b7355 50%,#a08050 100%);border-radius:8px}
    html{scroll-behavior:smooth}
    /* Light Theme */
    [data-theme="light"] { --skin:linear-gradient(135deg, #0d9488 0%, #0f766e 100%);--skin-solid:#0d9488;--title:rgba(0,0,0,0.95);--text:rgba(0,0,0,0.75);--body:#f8f8f8;--glass:rgba(0,0,0,0.03);--glass-border:rgba(0,0,0,0.08);--shadow:rgba(0,0,0,0.08);--label-bg:#f8f8f8 }
    [data-theme="light"] body{background:var(--body);color:var(--text)}
    [data-theme="light"] body::before{background:none}
    [data-theme="light"] .home{background:#f8f8f8}
    [data-theme="light"] .home::before{background:radial-gradient(circle at 30% 40%, rgba(0,0,0,0.02) 0%, transparent 60%)}
    [data-theme="light"] .home-data{background:rgba(255,255,255,0.7);border:1px solid rgba(0,0,0,0.06);box-shadow:0 20px 60px rgba(0,0,0,0.06)}
    [data-theme="light"] .glass-card{background:rgba(255,255,255,0.6);border:1px solid rgba(0,0,0,0.06);box-shadow:0 8px 30px rgba(0,0,0,0.06);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}
    [data-theme="light"] .glass-card:hover{box-shadow:0 16px 40px rgba(0,0,0,0.1)}
    [data-theme="light"] .nav-link{color:rgba(0,0,0,0.6)}
    [data-theme="light"] .nav-link:hover,[data-theme="light"] .nav-link.active{color:rgba(0,0,0,0.95)}
    [data-theme="light"] .home-title{background:linear-gradient(135deg, #111111, #0d9488);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    [data-theme="light"] .home-subtitle{color:rgba(0,0,0,0.55)}
    [data-theme="light"] .work-card,[data-theme="light"] .service-card,[data-theme="light"] .about-box,[data-theme="light"] .contact-card{background:rgba(255,255,255,0.6)}
    [data-theme="light"] .skills-header{background:rgba(255,255,255,0.5)}
    [data-theme="light"] .skills-header.active{background:var(--skin);color:#ffffff !important}
    [data-theme="light"] .skills-header.active h3,[data-theme="light"] .skills-header.active span{color:#ffffff !important}
    [data-theme="light"] .skills-bar{background:rgba(0,0,0,0.08)}
    [data-theme="light"] .skills-data:hover{background:rgba(0,0,0,0.03)}
    [data-theme="light"] .input,[data-theme="light"] .share-box textarea,[data-theme="light"] .share-box input{background:rgba(255,255,255,0.8);border:1px solid rgba(0,0,0,0.1);color:rgba(0,0,0,0.9)}
    [data-theme="light"] .input:focus{border-color:var(--skin-solid);background:white}
    [data-theme="light"] .btn{color:white;box-shadow:0 4px 12px rgba(13,148,136,0.2)}
    [data-theme="light"] .btn:hover{box-shadow:0 8px 20px rgba(20,184,166,0.3)}
    [data-theme="light"] .nav-toggle{background:rgba(255,255,255,0.8);border:1px solid rgba(0,0,0,0.08);color:rgba(0,0,0,0.8)}
    [data-theme="light"] .sidebar{background:rgba(255,255,255,0.98)!important}
    [data-theme="light"] .nav-close{background:rgba(0,0,0,0.05)!important;border:1px solid rgba(0,0,0,0.1)!important}
    [data-theme="light"] .nav-close i{color:rgba(0,0,0,0.8)!important}
    [data-theme="light"] .footer{background:rgba(255,255,255,0.6)}
    [data-theme="light"] .footer-link:hover{background:rgba(0,0,0,0.05)}
    [data-theme="light"] .modal{background:rgba(0,0,0,0.4)}
    [data-theme="light"] .modal-content{background:rgba(255,255,255,0.95)!important;border:1px solid rgba(0,0,0,0.08)}
    [data-theme="light"] .modal-close{background:rgba(0,0,0,0.05);color:rgba(0,0,0,0.8)}
    [data-theme="light"] .impl-stats-bar{background:rgba(255,255,255,0.5);border:1px solid rgba(0,0,0,0.06)}
    [data-theme="light"] .impl-stat-number{background:linear-gradient(135deg, #0d9488, #0f766e);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    [data-theme="light"] .impl-filter-btn{background:rgba(255,255,255,0.5);border:1px solid rgba(0,0,0,0.08);color:rgba(0,0,0,0.6)}
    [data-theme="light"] .impl-filter-btn:hover{background:rgba(0,0,0,0.04);color:rgba(0,0,0,0.9)}
    [data-theme="light"] .impl-filter-btn.active{background:linear-gradient(135deg, #0d9488, #0f766e) !important;color:#ffffff !important;border-color:transparent !important}
    [data-theme="light"] .impl-expand-btn{background:rgba(0,0,0,0.03);border:1px solid rgba(0,0,0,0.08);color:rgba(0,0,0,0.6)}
    [data-theme="light"] .impl-expand-btn:hover{background:rgba(0,0,0,0.06);color:rgba(0,0,0,0.9)}
    [data-theme="light"] .impl-project-icon{background:rgba(0,0,0,0.03);border:1px solid rgba(0,0,0,0.06)}
    [data-theme="light"] .steadfast-showcase{background:rgba(255,255,255,0.5)!important;border-color:rgba(0,0,0,0.08)!important}
    [data-theme="light"] .steadfast-images::-webkit-scrollbar-track{background:rgba(0,0,0,0.04)}
    [data-theme="light"] .steadfast-images::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.15)}
    [data-theme="light"] .contact-banner.success{background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.2);color:#16a34a}
    [data-theme="light"] .contact-banner.error{background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);color:#dc2626}
    
    /* Dark Theme */
    [data-theme="dark"] { --skin:linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);--skin-solid:#14b8a6;--title:rgba(255,255,255,0.95);--text:rgba(255,255,255,0.75);--body:#0a0a0a;--glass:rgba(255,255,255,0.04);--glass-border:rgba(255,255,255,0.08);--shadow:rgba(0,0,0,0.5);--label-bg:#0d0d0d }
    [data-theme="dark"] body{background:var(--body);color:var(--text)}
    [data-theme="dark"] body::before{display:none}
    [data-theme="dark"] .home{background:#0a0a0a}
    [data-theme="dark"] .home::before{display:none}
    [data-theme="dark"] .sidebar{background:rgba(10,10,10,0.98)!important}
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
    .main{margin-left:100px;min-height:100vh;position:relative;overflow-x:hidden}
    .home{background:linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
    .home::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 50%, rgba(80,80,80,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(60,60,60,0.1) 0%, transparent 50%);pointer-events:none}
    .home-data{width:min(700px,calc(100vw - 8rem));max-width:700px;padding:3rem;background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border-radius:30px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 40px rgba(0,0,0,0.2);animation:fadeInUp 1s ease;text-align:center;margin:2rem auto}
    @keyframes fadeInUp{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
    .home-title{font-size:3.5rem;color:var(--title);margin-bottom:.5rem;font-weight:700;background:linear-gradient(135deg, #ffffff, #b2dfdb, #14b8a6);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradientShift 3s ease-in-out infinite}
    @keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
    .home-subtitle{font-size:1.5rem;margin-bottom:1.5rem;color:var(--text);font-weight:500;font-style:italic}
    .architecture-stage{min-height:82vh;display:flex;align-items:center;padding:6rem 0;background:var(--body)}
    .architecture-wrap{width:100%}
    .architecture-kicker{display:block;text-align:center;color:var(--skin-solid);font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;margin-bottom:.8rem}
    .architecture-heading{text-align:center;color:var(--title);font-size:clamp(2rem,5vw,4.5rem);line-height:1;margin-bottom:1rem}
    .architecture-note{text-align:center;color:var(--text);max-width:520px;margin:0 auto 3rem;line-height:1.7}
    .semantic-map{position:relative;display:grid;grid-template-columns:minmax(120px,.8fr) minmax(260px,1.5fr) minmax(120px,.8fr);gap:clamp(1.5rem,5vw,5rem);align-items:center;max-width:980px;margin:0 auto;padding:2.5rem;border:1px solid var(--glass-border);border-radius:30px;background:var(--glass);overflow:hidden}
    .semantic-map::before{content:'';position:absolute;left:12%;right:12%;top:50%;height:1px;background:linear-gradient(90deg,transparent,var(--skin-solid),rgba(20,184,166,.2),var(--skin-solid),transparent);background-size:220% 100%;animation:routeFlow 4s linear infinite}
    .semantic-stack{display:grid;gap:.7rem;position:relative;z-index:2}
    .semantic-node{padding:.75rem .8rem;border:1px solid var(--glass-border);border-radius:12px;background:var(--body);color:var(--text);font-size:.72rem;font-weight:600;letter-spacing:.08em;text-align:center;text-transform:uppercase;animation:nodeWake 3.6s ease-in-out infinite}
    .semantic-node:nth-child(2){animation-delay:.45s}.semantic-node:nth-child(3){animation-delay:.9s}.semantic-node:nth-child(4){animation-delay:1.35s}
    .semantic-core{position:relative;z-index:3;padding:1.4rem;border:1px solid rgba(20,184,166,.55);border-radius:24px;background:rgba(10,10,10,.78);box-shadow:0 0 45px rgba(20,184,166,.08)}
    [data-theme="light"] .semantic-core{background:rgba(255,255,255,.88)}
    .semantic-core-label{text-align:center;color:var(--skin-solid);font-size:.72rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;margin-bottom:1.2rem}
    .semantic-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(.65rem,2vw,1.2rem);padding:1rem;position:relative}
    .semantic-grid::before,.semantic-grid::after{content:'';position:absolute;inset:24% 10%;border-top:1px solid rgba(20,184,166,.38);border-bottom:1px solid rgba(20,184,166,.38)}
    .semantic-grid::after{inset:10% 24%;border:0;border-left:1px solid rgba(20,184,166,.38);border-right:1px solid rgba(20,184,166,.38)}
    .semantic-dot{width:10px;height:10px;border-radius:50%;background:var(--skin-solid);justify-self:center;position:relative;z-index:2;box-shadow:0 0 0 0 rgba(20,184,166,.45);animation:semanticPulse 2.8s ease-out infinite}
    .semantic-dot:nth-child(2n){animation-delay:.35s}.semantic-dot:nth-child(3n){animation-delay:.7s}.semantic-dot:nth-child(4n){animation-delay:1.05s}
    .flow-dot{position:absolute;z-index:4;top:calc(50% - 5px);left:12%;width:10px;height:10px;border-radius:50%;background:#d4af37;box-shadow:0 0 16px rgba(212,175,55,.8);animation:moveSignal 4s ease-in-out infinite}
    @keyframes routeFlow{to{background-position:-220% 0}}
    @keyframes nodeWake{0%,70%,100%{border-color:var(--glass-border);color:var(--text)}35%{border-color:var(--skin-solid);color:var(--title);transform:translateY(-2px)}}
    @keyframes semanticPulse{0%{box-shadow:0 0 0 0 rgba(20,184,166,.5)}70%,100%{box-shadow:0 0 0 10px rgba(20,184,166,0)}}
    @keyframes moveSignal{0%{left:12%;opacity:0}8%{opacity:1}50%{left:50%}92%{opacity:1}100%{left:88%;opacity:0}}
    @media(prefers-reduced-motion:reduce){.semantic-map::before,.semantic-node,.semantic-dot,.flow-dot{animation:none!important}.flow-dot{display:none}}
    .about{padding:6rem 0}.about-container{grid-template-columns:350px 1fr;gap:4rem;align-items:flex-start;max-width:1400px;margin:0 auto}.about-img{width:100%;max-width:350px;height:auto;border-radius:25px;box-shadow:0 20px 40px rgba(0,0,0,0.2);transition:transform 0.3s ease;object-fit:cover}.about-img:hover{transform:translateY(-10px)}
    .about-info{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:2rem 0}
    .about-box{padding:1.5rem;border-radius:15px;text-align:center}
    .about-icon{font-size:2rem;color:var(--skin-solid);margin-bottom:.5rem}
    .skills-container{grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
    .skills-header{display:flex;align-items:center;padding:1.2rem;border-radius:15px;cursor:pointer;margin-bottom:1rem;transition:all 0.3s ease}
    .skills-header.active{background:linear-gradient(135deg, #14b8a6, #0d9488) !important;transform:translateX(10px);box-shadow:0 10px 25px rgba(20,184,166,0.3)}
    .skills-icon{font-size:2rem;color:var(--skin-solid);margin-right:1rem;transition:all 0.3s ease}
    .skills-header.active .skills-icon{color:#ffffff !important}
    .skills-header.active h3,.skills-header.active span{color:#ffffff !important}
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
    .input:focus + .label,.input:not(:placeholder-shown) + .label{top:0;font-size:.85rem;color:var(--skin-solid);transform:translateY(-50%);background:var(--label-bg, #0d0d0d)}
    [data-theme="light"] .input:focus + .label,[data-theme="light"] .input:not(:placeholder-shown) + .label{background:#f8f8f8}
    [data-theme="dark"] .input:focus + .label,[data-theme="dark"] .input:not(:placeholder-shown) + .label{background:#0d0d0d}
    .contact-banner{padding:1rem 1.5rem;border-radius:15px;text-align:center;font-weight:500;margin-bottom:1.5rem;animation:fadeInUp 0.4s ease}
    .contact-banner.success{background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);color:#4ade80}
    .contact-banner.error{background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#f87171}
    textarea.input{min-height:120px;resize:vertical}
    .footer{border-radius:30px 30px 0 0;padding:3rem 0;text-align:center;margin-top:3rem}
    .footer-links{display:flex;justify-content:center;gap:1.5rem;margin:1.5rem 0;flex-wrap:wrap}
    .footer-link{color:var(--text);text-decoration:none;transition:all 0.3s ease;padding:0.5rem 1rem;border-radius:10px;cursor:pointer}
    .footer-link:hover{color:var(--title);background:rgba(255,255,255,0.1)}
    .impl-section{padding:5rem 0 3rem}
    .impl-stats-bar{display:flex;justify-content:center;gap:3rem;margin-bottom:2.5rem;padding:1.5rem;background:rgba(255,255,255,0.05);border-radius:20px;border:1px solid rgba(255,255,255,0.1);flex-wrap:wrap}
    .impl-stat-item{text-align:center}
    .impl-stat-number{font-size:1.8rem;font-weight:700;background:var(--skin);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .impl-stat-label{font-size:0.8rem;color:var(--text)}
    .impl-filter-container{display:flex;flex-wrap:wrap;gap:0.6rem;justify-content:center;margin-bottom:2.5rem}
    .impl-filter-btn{padding:0.45rem 1.1rem;border-radius:50px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text);cursor:pointer;transition:all 0.3s;font-size:0.85rem;font-family:'Poppins',sans-serif}
    .impl-filter-btn:hover{background:rgba(255,255,255,0.1);color:var(--title)}
    .impl-filter-btn.active{background:var(--skin);color:var(--title);border-color:transparent}
    .impl-projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:1.5rem}
    .impl-project-card{padding:1.75rem;cursor:pointer}
    .impl-project-card:hover{border-color:rgba(100,100,100,0.3)}
    .impl-expanded{grid-column:1/-1}
    .impl-project-header{display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem}
    .impl-project-icon{min-width:52px;height:42px;display:flex;align-items:center;justify-content:center;font-size:.68rem;font-weight:800;letter-spacing:.08em;color:var(--skin-solid);background:rgba(255,255,255,0.05);padding:0.6rem;border-radius:14px;border:1px solid rgba(255,255,255,0.1)}
    .impl-impact-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem}
    .impl-expand-btn{display:flex;align-items:center;justify-content:center;gap:0.5rem;width:100%;padding:0.6rem;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:var(--text);cursor:pointer;transition:all 0.3s;font-family:'Poppins',sans-serif;font-size:0.85rem;margin-top:1rem}
    .impl-expand-btn:hover{background:rgba(255,255,255,0.1);color:var(--title)}
    .steadfast-showcase:hover{transform:translateY(-3px)!important}
    .steadfast-images::-webkit-scrollbar{height:4px}
    .steadfast-images::-webkit-scrollbar-track{background:rgba(255,255,255,0.05);border-radius:10px}
    .steadfast-images::-webkit-scrollbar-thumb{background:#14b8a6;border-radius:10px}
    @media(max-width:1024px){
      .sidebar{transform:translateX(${sidebar ? "0" : "-100%"})}
      .nav-toggle{display:flex}
      .main{margin-left:0}
    }
    @media(max-width:768px){
      .main{margin-left:0}
      .architecture-stage{min-height:auto;padding:4.5rem 0}
      .semantic-map{grid-template-columns:1fr;gap:1rem;padding:1.2rem;max-width:420px}
      .semantic-map::before,.flow-dot{display:none}
      .semantic-stack{grid-template-columns:repeat(2,1fr)}
      .architecture-note{margin-bottom:2rem;padding:0 1rem}
      .sidebar{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100vh;
        background:rgba(10,10,10,0.98);
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
      .home{min-height:100vh;padding:1rem 0.75rem}
      .home-data{
        width:100%;
        max-width:100%;
        margin:1rem auto;
        padding:1.5rem;
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
        overflow-x:hidden;
      }
      .skills-header{
        padding:0.75rem 1rem;
        justify-content:flex-start;
      }
      .skills-header.active{transform:none}
      .skills-header h3{font-size:0.9rem;white-space:nowrap}
      .skills-icon{font-size:1.5rem;margin-right:0.75rem}
      .skills-data{padding:0.5rem}
      .skills-titles h3{font-size:0.85rem}
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
      .impl-section{padding:3rem 0 2rem}
      .impl-stats-bar{gap:1.5rem;flex-direction:column;padding:1.25rem}
      .impl-stat-number{font-size:1.5rem}
      .impl-filter-container{gap:0.4rem}
      .impl-filter-btn{padding:0.35rem 0.8rem;font-size:0.75rem}
      .impl-projects-grid{grid-template-columns:1fr;gap:1rem;padding:0 0.25rem}
      .impl-project-card{padding:1.25rem}
      .impl-impact-grid{grid-template-columns:1fr}
      .impl-project-icon{font-size:.65rem;padding:0.5rem}
      .steadfast-showcase{padding:1rem!important;overflow:hidden}
      .steadfast-images{gap:0.5rem!important}
      .steadfast-images img{width:80px!important;height:160px!important}
      .steadfast-images>div{flex-shrink:0}
      .steadfast-showcase h4{font-size:0.95rem!important}
      .steadfast-showcase span{font-size:0.75rem!important}
      .steadfast-showcase p{font-size:0.75rem!important}
      .about-info{grid-template-columns:repeat(2,1fr)}
      .contact-banner{font-size:0.9rem!important;padding:0.75rem 1rem!important}
    }
    @media(max-width:480px){
      .home-title{font-size:1.75rem}
      .home-subtitle{font-size:1rem}
      .home-data{width:calc(100vw - 1.5rem);padding:1.25rem}
      .title{font-size:1.5rem}
      .nav-link{font-size:1.1rem;padding:1rem 1.5rem}
      .about-img{max-width:200px}
      .skills-container{padding:0 0.5rem}
      .skills-header{padding:0.6rem 0.75rem}
      .skills-header h3{font-size:0.8rem}
      .skills-icon{font-size:1.3rem;margin-right:0.5rem}
      .skills-header span{font-size:0.75rem}
      .steadfast-images img{width:65px!important;height:130px!important}
      .work-card h4{font-size:0.9rem}
      .work-card span{font-size:0.75rem}
      .service-card{padding:1.25rem}
      .service-icon{font-size:2rem}
      .contact-card{padding:0.875rem}
      .glass-card{border-radius:15px}
      .btn{padding:0.625rem 1rem;font-size:0.85rem}
      .impl-stats-bar{gap:1rem;padding:1rem}
      .impl-stat-number{font-size:1.3rem}
      .impl-projects-grid{grid-template-columns:1fr}
      .impl-project-card{padding:1rem}
      .about-info{grid-template-columns:repeat(2,1fr)}
    }
  `;

  return (
    <>
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
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
          <div className="old-fashioned-toggle">
            <button
              className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <div className="toggle-base"></div>
              <div className="toggle-lever">
                <span className="lever-text light-text">L</span>
                <span className="lever-text dark-text">D</span>
              </div>
            </button>
          </div>
          <div className="home-data">
            <p style={{ marginBottom: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--skin-solid)", fontSize: "0.8rem", fontWeight: 700 }}>
              Senior Data Architect
            </p>
            <h1 className="home-title">Dammy Henry</h1>
            <h3 className="home-subtitle">Data platforms. Clear decisions. Strong teams.</h3>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn" onClick={() => scrollToSection("architecture")}>
                Explore
              </button>
            </div>
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

        <section className="architecture-stage" id="architecture" aria-labelledby="architecture-heading">
          <div className="architecture-wrap container">
            <span className="architecture-kicker">How I work</span>
            <h2 className="architecture-heading" id="architecture-heading">Complex in. Clear out.</h2>
            <p className="architecture-note">A governed semantic layer turns scattered systems into decisions people can trust.</p>
            <div className="semantic-map" role="img" aria-label="Animated flow from enterprise source systems through a governed semantic layer to trusted decisions">
              <div className="semantic-stack" aria-hidden="true">
                {['Oracle', 'APIs', 'Files', 'Operations'].map((label) => <span className="semantic-node" key={label}>{label}</span>)}
              </div>
              <div className="semantic-core" aria-hidden="true">
                <div className="semantic-core-label">Semantic Layer</div>
                <div className="semantic-grid">
                  {Array.from({ length: 12 }).map((_, index) => <span className="semantic-dot" key={index}></span>)}
                </div>
              </div>
              <div className="semantic-stack" aria-hidden="true">
                {['Models', 'Metrics', 'Reports', 'Decisions'].map((label) => <span className="semantic-node" key={label}>{label}</span>)}
              </div>
              <span className="flow-dot" aria-hidden="true"></span>
            </div>
          </div>
        </section>

        <section className="section" id="platform-work">
          <h2 className="title">Key Implementations</h2>
          <div className="container">
            <p style={{ textAlign: "center", color: "var(--text)", marginBottom: "2rem", maxWidth: "720px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
              Recent architecture and delivery work across cloud platforms, pipelines, governance, semantic models,
              and enterprise analytics operations.
            </p>

            <div className="impl-stats-bar">
              {[
                { number: "19.7M", label: "Rows Reconciled at Cutover" },
                { number: "45", label: "Governed EDW Views Verified" },
                { number: "1,500+", label: "Knowledge Articles Organized" },
                { number: "67", label: "Data Assets Mapped for Transition" },
              ].map((stat) => (
                <div key={stat.label} className="impl-stat-item">
                  <div className="impl-stat-number">{stat.number}</div>
                  <div className="impl-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
              {[
                {
                  icon: "AZ",
                  tag: "Cloud Modernization",
                  title: "Production PostgreSQL to Azure",
                  body: "Led a production Azure cutover that reconciled 19.7 million rows and reduced restore time to 12 minutes.",
                  tech: ["Azure PostgreSQL", "PostGIS", "TLS", "Cutover Governance"],
                },
                {
                  icon: "API",
                  tag: "Pipeline Engineering",
                  title: "API-Direct Market Data",
                  body: "Replaced a fragile file flow with a validated API-direct Fabric data product.",
                  tech: ["Microsoft Fabric", "Dataflow Gen2", "REST", "Power Query M"],
                },
                {
                  icon: "BI",
                  tag: "Decision Products",
                  title: "Executive Market Intelligence",
                  body: "Aligned revenue, backlog, plans, and outlook in one governed executive model.",
                  tech: ["Power BI", "TMDL", "DAX", "Azure Synapse"],
                },
                {
                  icon: "KB",
                  tag: "Knowledge Governance",
                  title: "EIM Knowledge Platform",
                  body: "Connected 1,500+ analytics articles into one searchable operating layer.",
                  tech: ["ServiceNow", "Metadata", "Search", "Knowledge Governance"],
                },
              ].map((card) => (
                <div key={card.title} className="glass-card" style={{ padding: "1.75rem", borderRadius: "24px", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.08em", border: "1px solid var(--skin-solid)", borderRadius: "999px", padding: "0.35rem 0.5rem", color: "var(--skin-solid)" }}>{card.icon}</span>
                    <span style={{ letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--skin-solid)", fontSize: "0.72rem", fontWeight: 700 }}>{card.tag}</span>
                  </div>
                  <h3 style={{ color: "var(--title)", fontSize: "1.15rem", marginBottom: "0.75rem", lineHeight: 1.35 }}>{card.title}</h3>
                  <p style={{ color: "var(--text)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1rem", flex: 1 }}>{card.body}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {card.tech.map((t) => (
                      <span key={t} style={{ padding: "0.25rem 0.6rem", background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.25)", borderRadius: "20px", fontSize: "0.7rem", color: "var(--title)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about section" id="about">
          <h2 className="title">About me</h2>
          <div className="about-container container grid">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
              <Image src="/img/dammyhenry.png" alt="Dammy Henry" className="about-img" width={350} height={420} priority style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <div>
              <p style={{ lineHeight: "1.8", marginBottom: "1rem" }}>
                I&apos;m a Senior Data Architect who turns fragmented enterprise data into governed platforms people can
                trust. I connect architecture to execution: setting direction, leading teams and transitions, and
                making sure the finished product is supportable after launch.
              </p>
              <h4 style={{ marginBottom: "0.75rem", color: "var(--title)" }}>What I bring to the table</h4>
              <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.8" }}>
                <li>Target-state architecture grounded in the systems, constraints, and teams that already exist</li>
                <li>Cloud, pipeline, semantic-model, and governance modernization</li>
                <li>Roadmaps, operating models, knowledge transfer, and portfolio leadership</li>
              </ul>
              <div className="about-info">
                {[
                  { icon: "award", title: "Experience", sub: "12+ Years" },
                  { icon: "suitcase-alt", title: "Projects", sub: "60+" },
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
                { id: "architecture" as SkillCategory, icon: "sitemap", title: "Data Architecture", years: "12+ years" },
                { id: "delivery" as SkillCategory, icon: "server-network", title: "Platform Delivery", years: "10+ years" },
                { id: "leadership" as SkillCategory, icon: "users-alt", title: "Management & Advisory", years: "10+ years" },
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
              <h4 style={{ marginTop: "2rem", marginBottom: "0.5rem", color: "var(--title)" }}>Recent Builds</h4>
              <p style={{ color: "var(--text)", lineHeight: 1.6, marginBottom: "1rem" }}>
                A living shelf of data products, platform work, and practical operating tools.
              </p>
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
                <p style={{ marginBottom: "1rem" }}>I help organizations turn data ambition into an operating platform.</p>
                <ul style={{ paddingLeft: "1.25rem" }}>
                  {activeService.items.map((item: string) => (
                    <li key={item} style={{ marginBottom: ".5rem" }}>{item}</li>
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
            <form className="glass-card" style={{ padding: "2rem", borderRadius: "25px" }} onSubmit={handleContactSubmit}>
              {contactStatus === "sent" && (
                <div className="contact-banner success">
                  Message sent successfully. I&apos;ll get back to you soon.
                </div>
              )}
              {contactStatus === "error" && (
                <div className="contact-banner error">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}
              <div className="input-container">
                <input type="text" className="input" placeholder=" " value={contactName} onChange={(e) => setContactName(e.target.value)} required />
                <label className="label">Full Name</label>
              </div>
              <div className="input-container">
                <input type="email" className="input" placeholder=" " value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
                <label className="label">Email</label>
              </div>
              <div className="input-container">
                <textarea className="input" placeholder=" " value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required></textarea>
                <label className="label">Message</label>
              </div>
              <button type="submit" className="btn" disabled={contactStatus === "sending"}>
                <i className="uil uil-navigator"></i>
                {contactStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>

        <footer className="footer glass-card">
          <div className="container">
            <h2 style={{ color: "var(--title)", fontSize: "1.5rem" }}>Dammy Henry</h2>
            <p style={{ fontSize: "0.95rem" }}>Senior Data Architect | Enterprise Data Leadership</p>
            <div className="footer-links">
              <a className="footer-link" onClick={() => scrollToSection("services")}>Services</a>
              <Link href="/builds" className="footer-link">Builds</Link>
              <Link href="/implementations" className="footer-link">Enterprise Projects</Link>
              <a className="footer-link" onClick={() => scrollToSection("contact")}>Contact</a>
              <Link href="/thoughts" className="footer-link">Thoughts</Link>
            </div>
            <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>&copy; {new Date().getFullYear()} Dammy Henry. All rights reserved.</p>
          </div>
        </footer>
      </main>

    </>
  );
};

export default PortfolioWebsite;
