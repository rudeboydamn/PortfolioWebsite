"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type SkillCategory = "frontend" | "design" | "backend";
type WorkCategory = "web" | "app" | "design";

type Skill = {
  n: string;
  p: number;
};

type WorkItem = {
  id: number;
  cat: WorkCategory;
  img: string;
  title: string;
};

type Testimonial = {
  desc: string;
  date: string;
  name: string;
  role: string;
  img: string;
};

type Service = {
  icon: string;
  title: string;
  items: string[];
};

const skills: Record<SkillCategory, Skill[]> = {
  frontend: [
    { n: "HTML", p: 90 },
    { n: "CSS", p: 80 },
    { n: "Javascript", p: 60 },
    { n: "React", p: 85 },
  ],
  design: [
    { n: "Figma", p: 90 },
    { n: "Sketch", p: 80 },
    { n: "PhotoShop", p: 70 },
  ],
  backend: [
    { n: "PHP", p: 80 },
    { n: "Python", p: 80 },
    { n: "MySQL", p: 70 },
    { n: "Firebase", p: 75 },
  ],
};

const works: WorkItem[] = [
  { id: 1, cat: "web", img: "https://i.postimg.cc/43Th5VXJ/work-1.png", title: "Web Design" },
  { id: 2, cat: "app", img: "https://i.postimg.cc/sXLjnC5p/work-2.png", title: "App Design" },
  { id: 3, cat: "design", img: "https://i.postimg.cc/QNB1jXYZ/work-3.png", title: "Brand Design" },
  { id: 4, cat: "app", img: "https://i.postimg.cc/s2DGqyG8/work-4.png", title: "App Design" },
  { id: 5, cat: "web", img: "https://i.postimg.cc/TYVyPhrF/work-5.png", title: "Brand Design" },
  { id: 6, cat: "design", img: "https://i.postimg.cc/wMdqKcbv/work-6.png", title: "Web Design" },
];

const testimonials: Testimonial[] = [
  {
    desc: "Working with Miriam was an absolute pleasure from start to finish...",
    date: "March 30, 2025",
    name: "Chen Xiuying",
    role: "Marketing Director",
    img: "https://i.postimg.cc/MTr9j4Yn/client1.jpg",
  },
  {
    desc: "Miriam truly understood our business needs through her modern design...",
    date: "January 18, 2025",
    name: "Joshua Middletown",
    role: "Sales Director",
    img: "https://i.postimg.cc/wvV7f8rB/client2.jpg",
  },
  {
    desc: "I was blown away by the website Miriam created for my business...",
    date: "November 29, 2024",
    name: "Melanie Stone",
    role: "Business Owner",
    img: "https://i.postimg.cc/pdP9DL0S/client3.jpg",
  },
];

const services: Service[] = [
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
  {
    icon: "edit",
    title: "Branding<br>Designer",
    items: ["Competitive Analysis", "Accessibility Design", "Project Management", "Design Iteration", "User Research"],
  },
];

const PortfolioWebsite: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillCategory>("frontend");
  const [activeFilter, setActiveFilter] = useState<"all" | WorkCategory>("all");
  const [popup, setPopup] = useState<{ open: boolean; item?: WorkItem }>({ open: false });
  const [modal, setModal] = useState<number | null>(null);
  const [sidebar, setSidebar] = useState(false);
  const [section, setSection] = useState("home");
  const [testimonial, setTestimonial] = useState(0);
  const [focus, setFocus] = useState<Record<string, boolean>>({});

  const filteredWorks = activeFilter === "all" ? works : works.filter((w) => w.cat === activeFilter);
  const activeService = modal !== null ? services[modal] : undefined;

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((item) => {
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
    setSidebar(false);
  };

  const dynamicStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        :root{--skin:linear-gradient(135deg, #667eea 0%, #764ba2 100%);--skin-solid:#667eea;--title:rgba(255,255,255,0.95);--text:rgba(255,255,255,0.8);--body:linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);--glass:rgba(255,255,255,0.1);--glass-border:rgba(255,255,255,0.2);--shadow:rgba(0,0,0,0.3);--font:'Poppins',sans-serif}
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:var(--font);background:var(--body);color:var(--text);min-height:100vh;overflow-x:hidden}
        body::before{content:'';position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 50%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120,219,255,0.3) 0%, transparent 50%);pointer-events:none;z-index:-1}
        .container{max-width:1200px;margin:0 auto;padding:0 1rem}.grid{display:grid}.flex{display:flex}
        .glass{background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);box-shadow:0 8px 32px var(--shadow)}
        .glass-card{background:rgba(255,255,255,0.05);backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);border:1px solid rgba(255,255,255,0.1);border-radius:20px;box-shadow:0 15px 35px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2);transition:all 0.4s cubic-bezier(0.23,1,0.320,1)}
        .glass-card:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 25px 50px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)}
        .btn{display:inline-flex;align-items:center;gap:.5rem;background:var(--skin);color:var(--title);padding:.75rem 1.4rem;border:none;border-radius:50px;cursor:pointer;transition:all 0.3s ease;position:relative;overflow:hidden;font-weight:500;text-decoration:none}
        .btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);transition:left 0.5s}
        .btn:hover::before{left:100%}
        .btn:hover{transform:translateY(-3px);box-shadow:0 10px 25px rgba(102,126,234,0.4)}
        .btn i{font-size:1.1rem}
        .section{padding:6rem 0 2rem;position:relative}.title{text-align:center;font-size:2.5rem;margin-bottom:3rem;color:var(--title);font-weight:600;text-shadow:0 4px 8px rgba(0,0,0,0.3)}
        .sidebar{position:fixed;width:100px;height:100vh;background:rgba(255,255,255,0.05);backdrop-filter:blur(25px);-webkit-backdrop-filter:blur(25px);border-right:1px solid rgba(255,255,255,0.1);z-index:999;transition:.3s ease;box-shadow:5px 0 25px rgba(0,0,0,0.1)}
        .nav-logo{position:absolute;top:1.8rem;left:50%;transform:translateX(-50%);width:50px;height:50px;background:var(--skin);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--title);font-weight:700;font-size:1.2rem;box-shadow:0 8px 25px rgba(102,126,234,0.4);animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.05)}}
        .nav-menu{position:fixed;transform:rotate(-90deg) translateX(-100%);transform-origin:left top;width:100vh;top:50px}
        .nav-list{display:flex;flex-direction:row-reverse;margin:0 auto;list-style:none;justify-content:center}
        .nav-link{color:var(--text);text-decoration:none;padding:0 1.5rem;height:80px;line-height:80px;transition:all 0.3s ease;position:relative;font-weight:500;text-transform:capitalize}
        .nav-link::before{content:'';position:absolute;bottom:1.8rem;left:50%;width:0;height:2px;background:var(--skin-solid);transition:width 0.3s ease;transform:translateX(-50%)}
        .nav-link:hover,.nav-link.active{color:var(--title);text-shadow:0 0 10px rgba(255,255,255,0.5)}
        .nav-link:hover::before,.nav-link.active::before{width:20px}
        .nav-toggle{position:fixed;top:2rem;right:1.5rem;width:50px;height:45px;background:var(--glass);backdrop-filter:blur(15px);color:var(--title);border:1px solid var(--glass-border);border-radius:15px;cursor:pointer;z-index:1000;display:none;align-items:center;justify-content:center;transition:all 0.3s ease}
        .nav-toggle:hover{transform:scale(1.1);box-shadow:0 5px 15px rgba(0,0,0,0.2)}
        .nav-close{color:var(--title);font-size:1.8rem}
        .main{margin-left:100px;min-height:100vh;position:relative}
        .home{background:linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('/dammyhenry.png') center/cover;height:100vh;display:flex;align-items:center;position:relative;overflow:hidden}
        .home::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at center, rgba(102,126,234,0.1) 0%, transparent 70%);pointer-events:none}
        .home-data{max-width:600px;padding:3rem;background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border-radius:30px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 40px rgba(0,0,0,0.2);animation:fadeInUp 1s ease;margin:2rem}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
        .home-title{font-size:3.5rem;color:var(--title);margin-bottom:.5rem;font-weight:700;background:linear-gradient(135deg, #667eea, #764ba2, #f093fb);background-size:200% 200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradientShift 3s ease-in-out infinite}
        @keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .home-subtitle{font-size:1.8rem;margin-bottom:1rem;color:var(--text);font-weight:500}
        .home-desc{margin-bottom:2rem;line-height:1.8;font-size:1.1rem;color:var(--text)}
        .about{padding:8rem 0}.about-container{grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
        .about-img{width:100%;border-radius:25px;box-shadow:0 20px 40px rgba(0,0,0,0.2);transition:transform 0.3s ease}
        .about-img:hover{transform:scale(1.05) rotate(2deg)}
        .about-info{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin:3rem 0}
        .about-box{padding:2rem;border-radius:20px;text-align:center;transition:all 0.3s ease;position:relative;overflow:hidden}
        .about-box::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));border-radius:20px;transition:opacity 0.3s ease;opacity:0}
        .about-box:hover::before{opacity:1}
        .about-icon{font-size:2.5rem;color:var(--skin-solid);margin-bottom:1rem;transition:transform 0.3s ease}
        .about-box:hover .about-icon{transform:scale(1.2) rotate(10deg)}
        .skills-container{grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
        .skills-header{display:flex;align-items:center;padding:1.5rem;border-radius:20px;cursor:pointer;margin-bottom:1.5rem;transition:all 0.3s ease;position:relative;overflow:hidden}
        .skills-header::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);transition:left 0.5s}
        .skills-header:hover::before{left:100%}
        .skills-header.active{background:var(--skin);transform:translateX(10px);box-shadow:0 10px 25px rgba(102,126,234,0.3)}
        .skills-icon{font-size:2.5rem;color:var(--skin-solid);margin-right:1.5rem;transition:all 0.3s ease}
        .skills-header.active .skills-icon{color:white;transform:rotate(360deg)}
        .skills-content{animation:slideIn 0.5s ease}
        @keyframes slideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .skills-data{margin-bottom:2rem;padding:1rem;border-radius:15px;transition:all 0.3s ease}
        .skills-data:hover{background:rgba(255,255,255,0.05);transform:translateX(10px)}
        .skills-titles{display:flex;justify-content:space-between;margin-bottom:1rem;font-weight:600}
        .skills-bar{height:8px;background:rgba(255,255,255,0.1);border-radius:10px;overflow:hidden;position:relative}
        .skills-bar::before{content:'';position:absolute;top:0;left:0;height:100%;width:100%;background:linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));animation:shimmer 2s infinite}
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        .skills-per{height:100%;background:var(--skin);transition:width 1s ease;border-radius:10px;position:relative;overflow:hidden}
        .skills-per::after{content:'';position:absolute;top:0;left:0;height:100%;width:30px;background:linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);animation:slide 2s infinite}
        @keyframes slide{0%{transform:translateX(-30px)}100%{transform:translateX(200px)}}
        .work-filters{display:flex;justify-content:center;gap:1rem;margin-bottom:3rem;flex-wrap:wrap}
        .work-item{padding:1rem 2rem;border:none;border-radius:25px;color:var(--text);cursor:pointer;transition:all 0.3s ease;font-weight:500;position:relative;overflow:hidden;background:rgba(255,255,255,0.02)}
        .work-item::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.05);border-radius:25px;opacity:0;transition:opacity 0.3s ease}
        .work-item:hover::before{opacity:1}
        .work-item.active,.work-item:hover{background:var(--skin);color:var(--title);transform:translateY(-5px);box-shadow:0 10px 25px rgba(102,126,234,0.3)}
        .work-container{grid-template-columns:repeat(auto-fit,minmax(350px,1fr));gap:2.5rem}
        .work-card{padding:2rem;border-radius:25px;transition:all 0.4s cubic-bezier(0.23,1,0.320,1);position:relative;overflow:hidden}
        .work-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05));border-radius:25px;opacity:0;transition:opacity 0.3s ease}
        .work-card:hover::before{opacity:1}
        .work-img{width:100%;border-radius:20px;margin-bottom:1.5rem;transition:transform 0.3s ease;box-shadow:0 10px 25px rgba(0,0,0,0.1)}
        .work-card:hover .work-img{transform:scale(1.05)}
        .work-btn{color:var(--skin-solid);background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:.5rem;font-weight:600;transition:all 0.3s ease;padding:0.5rem 0}
        .work-btn:hover{color:var(--title);transform:translateX(10px)}
        .popup{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);display:${popup.open ? "flex" : "none"};align-items:center;justify-content:center;z-index:1000;padding:1rem;animation:fadeIn 0.3s ease}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .popup-content{border-radius:25px;padding:2.5rem;max-width:700px;position:relative;animation:slideUp 0.3s ease}
        @keyframes slideUp{from{transform:translateY(50px);opacity:0}to{transform:translateY(0);opacity:1}}
        .popup-close{position:absolute;top:1rem;right:1rem;background:rgba(255,255,255,0.1);border:none;color:var(--title);font-size:1.5rem;cursor:pointer;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease}
        .popup-close:hover{background:rgba(255,255,255,0.2);transform:rotate(90deg)}
        .services-container{grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2.5rem}
        .service-card{padding:3rem 2rem;border-radius:25px;text-align:center;transition:all 0.4s ease;position:relative;overflow:hidden}
        .service-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));border-radius:25px;opacity:0;transition:opacity 0.3s ease}
        .service-card:hover::before{opacity:1}
        .service-icon{font-size:3rem;color:var(--skin-solid);margin-bottom:1.5rem;transition:all 0.3s ease}
        .service-card:hover .service-icon{transform:scale(1.2) rotate(10deg)}
        .modal{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);display:${modal !== null ? "flex" : "none"};align-items:center;justify-content:center;z-index:1000;padding:1rem;animation:fadeIn 0.3s ease}
        .modal-content{border-radius:25px;padding:3rem;max-width:600px;position:relative;animation:slideUp 0.3s ease}
        .modal-close{position:absolute;top:1rem;right:1rem;background:rgba(255,255,255,0.1);border:none;color:var(--title);font-size:1.5rem;cursor:pointer;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease}
        .modal-close:hover{background:rgba(255,255,255,0.2);transform:rotate(90deg)}
        .testimonial{border-radius:25px;padding:2.5rem;margin-bottom:2rem;position:relative;overflow:hidden}
        .testimonial::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05));border-radius:25px}
        .testimonial-profile{display:flex;align-items:center;gap:1.5rem;margin-top:1.5rem}
        .testimonial-img{width:70px;height:70px;border-radius:50%;border:3px solid rgba(255,255,255,0.2);transition:transform 0.3s ease;object-fit:cover}
        .testimonial:hover .testimonial-img{transform:scale(1.1)}
        .contact-container{grid-template-columns:1fr 1fr;gap:4rem}
        .contact-card{padding:2rem;border-radius:20px;text-align:center;margin-bottom:1.5rem;transition:all 0.3s ease;position:relative;overflow:hidden}
        .contact-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05));border-radius:20px;opacity:0;transition:opacity 0.3s ease}
        .contact-card:hover::before{opacity:1}
        .input-container{position:relative;margin-bottom:2rem}
        .input{width:100%;padding:1rem 1.5rem;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);border-radius:15px;color:var(--title);font-size:1rem;transition:all 0.3s ease;backdrop-filter:blur(10px)}
        .input:focus{outline:none;border-color:var(--skin-solid);background:rgba(255,255,255,0.08);box-shadow:0 0 20px rgba(102,126,234,0.2)}
        .label{position:absolute;top:50%;left:1.5rem;transform:translateY(-50%);color:var(--text);pointer-events:none;transition:all 0.3s ease;background:rgba(255,255,255,0.05);padding:0 0.5rem;border-radius:5px}
        .input:focus + .label,.input:not(:placeholder-shown) + .label{top:0;font-size:.9rem;color:var(--skin-solid);transform:translateY(-50%)}
        textarea.input{min-height:150px;resize:vertical}
        .footer{border-radius:30px 30px 0 0;padding:4rem 0;text-align:center;margin-top:4rem;position:relative;overflow:hidden}
        .footer::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))}
        .footer-links{display:flex;justify-content:center;gap:3rem;margin:2rem 0;flex-wrap:wrap}
        .footer-link{color:var(--text);text-decoration:none;transition:all 0.3s ease;padding:0.5rem 1rem;border-radius:10px;text-transform:capitalize}
        .footer-link:hover{color:var(--title);background:rgba(255,255,255,0.1);transform:translateY(-3px)}
        @media(max-width:1024px){
          .sidebar{transform:translateX(${sidebar ? "0" : "-100%"})}
          .nav-toggle{display:flex}
          .main{margin-left:0}
        }
        @media(max-width:768px){
          .main{margin-left:0}.sidebar{width:100%;transform:translateX(${sidebar ? "0" : "-100%"})}
          .nav-logo{display:${sidebar ? "flex" : "none"}}
          .nav-menu{transform:none;position:relative;width:100%;top:auto;left:auto;height:100%;display:flex;justify-content:center}
          .nav-list{flex-direction:column;align-items:center;padding:2rem 0;height:100%;justify-content:center}
          .nav-link{padding:1rem 0;line-height:1.5;height:auto}
          .nav-link::before{bottom:0;top:auto}
          .about-container,.skills-container,.contact-container{grid-template-columns:1fr;text-align:center;gap:3rem}
          .work-container{grid-template-columns:1fr}
          .home-title{font-size:2.5rem}
          .home-data{margin:1rem;padding:2rem}
          .work-filters{gap:0.5rem}
          .work-item{padding:0.8rem 1.5rem;font-size:0.9rem}
        }
      `;

  return (
    <>
      <style>{dynamicStyles}</style>

      <div className="nav-toggle" onClick={() => setSidebar((prev) => !prev)}>
        <i className="uil uil-bars"></i>
      </div>

      <aside className="sidebar">
        <div className="nav-logo">D</div>
        <nav className="nav-menu">
          <div className="menu">
            <ul className="nav-list">
              {["home", "about", "skills", "work", "services", "contact"].map((item) => (
                <li key={item} className="nav-item">
                  <a
                    href={`#${item}`}
                    className={`nav-link ${section === item ? "active" : ""}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item);
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div
          className="nav-close"
          onClick={() => setSidebar(false)}
          style={{ position: "absolute", top: "1rem", right: "1.25rem", cursor: "pointer", display: sidebar ? "block" : "none" }}
        >
          <i className="uil uil-times"></i>
        </div>
      </aside>

      <main className="main">
        <section className="home" id="home">
          <div className="home-data">
            <h1 className="home-title">Hi, I&apos;m Dammy</h1>
            <h3 className="home-subtitle">Creative Developer &amp; Designer</h3>
            <p className="home-desc">
              I craft immersive digital experiences with clean code, intuitive design, and a passion for storytelling.
            </p>
            <button className="btn" onClick={() => scrollToSection("about")}>
              <i className="uil uil-user"></i>More About me!
            </button>
          </div>
        </section>

        <section className="about section" id="about">
          <h2 className="title">About me</h2>
          <div className="about-container container grid">
            <Image src="/dammyhenry.png" alt="Dammy Henry" className="about-img" width={600} height={720} priority />
            <div>
              <h3>Hi, I&apos;m Dammy Henry, based in Canada</h3>
              <p>
                I&apos;m a web developer with extensive knowledge and years of experience building digital products, blending web technologies with
                UI and UX design finesse.
              </p>
              <div className="about-info">
                {[
                  { icon: "award", title: "Experience", sub: "10+ Years" },
                  { icon: "suitcase-alt", title: "Completed", sub: "60+ Projects" },
                  { icon: "headphones-alt", title: "Support", sub: "Online 24/7" },
                ].map((item) => (
                  <div key={item.title} className="about-box">
                    <i className={`uil uil-${item.icon} about-icon`}></i>
                    <h3>{item.title}</h3>
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

        <section className="skills section" id="skills">
          <h2 className="title">My Experience</h2>
          <div className="skills-container container grid">
            <div>
              {[
                { id: "frontend" as SkillCategory, icon: "brackets-curly", title: "Frontend Developer" },
                { id: "design" as SkillCategory, icon: "swatchbook", title: "UI/UX Designer" },
                { id: "backend" as SkillCategory, icon: "server-network", title: "Backend Developer" },
              ].map((skill) => (
                <div
                  key={skill.id}
                  className={`skills-header glass-card ${activeSkill === skill.id ? "active" : ""}`}
                  onClick={() => setActiveSkill(skill.id)}
                >
                  <i className={`uil uil-${skill.icon} skills-icon`}></i>
                  <div>
                    <h3>{skill.title}</h3>
                    <span>More than 4 years</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="skills-content">
              {skills[activeSkill].map((skill) => (
                <div key={skill.n} className="skills-data">
                  <div className="skills-titles">
                    <h3>{skill.n}</h3>
                    <span>{skill.p}%</span>
                  </div>
                  <div className="skills-bar">
                    <div className="skills-per" style={{ width: `${skill.p}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="work section" id="work">
          <h2 className="title">Recent Works</h2>
          <div className="work-filters">
            {["all", "web", "app", "design"].map((filter) => (
              <button
                key={filter}
                className={`work-item glass-card ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter as "all" | WorkCategory)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          <div className="work-container container grid">
            {filteredWorks.map((work) => (
              <div key={work.id} className="work-card glass-card">
                <Image src={work.img} alt={work.title} className="work-img" width={480} height={320} />
                <h3>{work.title}</h3>
                <button className="work-btn" onClick={() => setPopup({ open: true, item: work })}>
                  Demo <i className="uil uil-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="popup" role="dialog" aria-modal="true">
          <div className="popup-content glass-card">
            <button className="popup-close" onClick={() => setPopup({ open: false })}>
              &times;
            </button>
            {popup.item && (
              <>
                <Image src={popup.item.img} alt={popup.item.title} width={640} height={400} style={{ width: "100%", borderRadius: ".5rem" }} />
                <h3 style={{ marginTop: "1.5rem", color: "var(--title)" }}>{popup.item.title}</h3>
                <p style={{ marginTop: "0.75rem" }}>Project details and description would go here.</p>
              </>
            )}
          </div>
        </div>

        <section className="services section" id="services">
          <h2 className="title">What I Offer</h2>
          <div className="services-container container grid">
            {services.map((service, index) => (
              <div key={service.title} className="service-card glass-card">
                <i className={`uil uil-${service.icon} service-icon`}></i>
                <h3 dangerouslySetInnerHTML={{ __html: service.title }}></h3>
                <button className="btn" onClick={() => setModal(index)}>
                  View More
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content glass-card">
            <button className="modal-close" onClick={() => setModal(null)}>
              &times;
            </button>
            {activeService && (
              <>
                <h3>{activeService.title.replace(/<br>/g, " ")}</h3>
                <p style={{ margin: "1rem 0" }}>I offer services with quality work to clients and companies.</p>
                <ul>
                  {activeService.items.map((item) => (
                    <li key={item} style={{ marginBottom: ".5rem" }}>
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <section className="testimonials section" id="testimonials">
          <h2 className="title">Testimonials</h2>
          <div className="container">
            <div className="testimonial glass-card">
              <p dangerouslySetInnerHTML={{ __html: testimonials[testimonial].desc }}></p>
              <div className="testimonial-profile">
                <Image
                  src={testimonials[testimonial].img}
                  alt={testimonials[testimonial].name}
                  className="testimonial-img"
                  width={70}
                  height={70}
                  priority
                />
                <div>
                  <h4>{testimonials[testimonial].name}</h4>
                  <span>{testimonials[testimonial].role}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setTestimonial(index)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "none",
                    margin: "0 4px",
                    background: index === testimonial ? "var(--skin-solid)" : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                  }}
                ></button>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <h2 className="title">Contact me</h2>
          <div className="contact-container container grid">
            <div>
              {[
                { icon: "envelope-edit", title: "Email", data: "hello@dammyhenry.org" },
                { icon: "whatsapp", title: "Whatsapp", data: "+1 (999) 888-777" },
                { icon: "facebook-messenger", title: "Messenger", data: "dammyhenry" },
              ].map((contact) => (
                <div key={contact.title} className="contact-card glass-card">
                  <i className={`uil uil-${contact.icon}`}></i>
                  <h3>{contact.title}</h3>
                  <span>{contact.data}</span>
                </div>
              ))}
            </div>
            <form className="glass-card" style={{ padding: "2rem", borderRadius: "25px" }}>
              {["username", "email", "phone", "message"].map((field) => (
                <div key={field} className="input-container">
                  {field === "message" ? (
                    <textarea
                      className="input"
                      placeholder=" "
                      onFocus={() => setFocus({ ...focus, [field]: true })}
                      onBlur={(event) => setFocus({ ...focus, [field]: event.target.value !== "" })}
                    ></textarea>
                  ) : (
                    <input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      className="input"
                      placeholder=" "
                      onFocus={() => setFocus({ ...focus, [field]: true })}
                      onBlur={(event) => setFocus({ ...focus, [field]: event.target.value !== "" })}
                    />
                  )}
                  <label className="label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                </div>
              ))}
              <button type="submit" className="btn">
                <i className="uil uil-navigator"></i>Send Message
              </button>
            </form>
          </div>
        </section>

        <footer className="footer glass-card">
          <div className="container">
            <h2>Dammy Henry</h2>
            <p>Creative Developer</p>
            <div className="footer-links">
              {["services", "work", "contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className="footer-link"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link);
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
            <p>&copy; {new Date().getFullYear()} Dammy Henry. All rights reserved.</p>
          </div>
        </footer>
      </main>

      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" />
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    </>
  );
};

export default PortfolioWebsite;
