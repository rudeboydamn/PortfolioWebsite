"use client";

import { useEffect, useState } from "react";
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Sidebar } from './sections/Sidebar';
import { ServiceModal } from './ui/ServiceModal';
import { navItems } from '@/lib/data';
import type { Service } from '@/lib/types';

export default function PortfolioWebsite() {
  const [sidebar, setSidebar] = useState(false);
  const [section, setSection] = useState("home");
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // Scroll spy
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
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setSection(id);
      setSidebar(false);
    }
  };

  const handleOpenService = (service: Service, index: number) => {
    setActiveService(service);
    setModalIndex(index);
  };

  const handleCloseModal = () => {
    setActiveService(null);
    setModalIndex(null);
  };

  return (
    <>
      <style jsx global>{`
        .main {
          margin-left: 100px;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        @media (max-width: 1024px) {
          .main {
            margin-left: 0;
          }
        }
      `}</style>

      <Sidebar
        sidebar={sidebar}
        section={section}
        navItems={navItems}
        onToggleSidebar={() => setSidebar(prev => !prev)}
        onCloseSidebar={() => setSidebar(false)}
        onScrollToSection={scrollToSection}
      />

      <main className="main">
        <Hero onScrollToAbout={() => scrollToSection("about")} />
        <About onScrollToContact={() => scrollToSection("contact")} />
        <Projects />
        <Skills />
        <Services onOpenService={handleOpenService} />
        <Contact />
        <Footer 
          onScrollToServices={() => scrollToSection("services")}
          onScrollToContact={() => scrollToSection("contact")}
        />
      </main>

      <ServiceModal 
        service={activeService} 
        onClose={handleCloseModal} 
      />

      <link 
        rel="stylesheet" 
        href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" 
      />
    </>
  );
}

// Component extraction complete - all sections moved to separate files
// See: components/sections/ for Hero, About, Skills, Projects, Services, Contact, Footer, Sidebar
// See: components/ui/ for ServiceModal
// See: lib/data.ts for all data constants
// See: lib/types.ts for all TypeScript types
