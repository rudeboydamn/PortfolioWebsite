"use client";

import React from 'react';
import Link from 'next/link';

type BlogPost = {
  date: string;
  title: string;
  intro: string;
  post: string;
};

const blogs: BlogPost[] = [
  { date: 'September 28, 2025', title: 'The Hidden Power of EDI: Why It Still Runs Global Supply Chains', intro: 'Despite being decades old, EDI remains the backbone of commerce.', post: 'From 850 purchase orders to 856 ASNs, EDI quietly moves trillions in goods every year. What makes it timeless is stability, standardization, and near-zero ambiguity. Modern tools like iPaaS and API-driven visibility layers now elevate EDI from "batch processing" to "smart automation." As long as businesses rely on structured B2B communication, EDI will keep leading the way—just with better speed, monitoring, and intelligence layered on top.' },
  { date: 'October 5, 2025', title: 'AS2 Is Back: Why Secure B2B Transport Still Matters', intro: "AS2 isn't flashy—but it's everywhere.", post: 'With rising cybersecurity requirements, AS2 continues to dominate secure file exchange. Its non-repudiation and encryption make it ideal for modern compliance expectations. Paired with cloud-based AS2 hubs and automated certificate rotation, the protocol is experiencing a quiet resurgence. In a world full of APIs, AS2 remains the gold standard for mission-critical supply chain documents.' },
  { date: 'October 12, 2025', title: 'APIs vs. EDI: The Real Story Behind the Hype', intro: "It's not a battle—it's a partnership.", post: 'Real-time APIs bring speed and flexibility; EDI brings structure and predictability. The smartest companies blend both: APIs for instant inventory checks and tracking, EDI for high-volume order flows like 940s and 945s. Middleware platforms now bridge the two effortlessly, enabling hybrid integrations that reduce costs and boost visibility without forcing teams to choose one over the other.' },
  { date: 'October 19, 2025', title: 'How Automation Is Transforming Warehouse Integrations', intro: "WMS integrations used to be slow and manual—now they're fast and dynamic.", post: 'From 940/945 workflows to real-time pick confirmations, modern warehouses thrive on automation. Integration engines ingest XML, JSON, and flat files, then translate them into actionable instructions. With automated exception alerts, self-healing workflows, and smart routing, fulfillment centers now run with fewer errors and much faster cycle times. Integration is becoming a competitive advantage.' },
  { date: 'October 26, 2025', title: 'Error Handling: The Most Underrated Skill in Integration', intro: 'Great integrations fail—great integrators fix them fast.', post: "Companies lose thousands when an 856 fails or a 997 never arrives. An expert knows how to monitor flows, detect failures early, and recover without business interruption. Real-time dashboards, alerting, and retry logic turn painful outages into manageable events. Integration success isn't just about building maps—it's about protecting the entire order-to-cash engine." },
  { date: 'November 2, 2025', title: 'The Rise of iPaaS: Why Businesses Are Finally Letting Go of Legacy Middleware', intro: "Cloud integration isn't the future—it's the present.", post: "iPaaS platforms deliver speed, scalability, and out-of-the-box connectors. Whether it's SFTP workflows, EDI mapping, or API orchestration, modern platforms reduce development time dramatically. They also bring built-in monitoring and analytics, making it easier for teams to see bottlenecks and resolve issues. Companies adopting iPaaS aren't just modernizing—they're unlocking agility." },
  { date: 'November 9, 2025', title: 'Fun Fact: The 850 PO Is Older Than Most Tech We Use Today', intro: 'Yet it still works perfectly.', post: "The 850 purchase order format has remained largely unchanged for decades because it's efficient and universal. Even as XML and JSON gained popularity, the 850's structured data continues powering retail, distribution, and manufacturing. Its longevity proves that well-designed standards can survive multiple generations of technology innovations." },
  { date: 'November 16, 2025', title: 'How Integrations Improve Customer Experience Without Anyone Noticing', intro: 'When integrations work, customers feel the difference.', post: 'Accurate inventory? Smooth order flows? On-time delivery alerts? All integration-driven. When an ERP, WMS, and logistics partner sync seamlessly, customers enjoy frictionless experiences without ever seeing the backend. Fast reconciliations, fewer disputes, and cleaner data all translate directly into customer trust and loyalty. Good integrations quietly boost brand reputation.' },
  { date: 'November 23, 2025', title: 'The New Era of Partner Onboarding', intro: 'Onboarding used to take weeks—now it can take hours.', post: 'Automation templates, reusable maps, dynamic validation, and API-based testing environments drastically reduce onboarding times. Instead of rebuilding integrations, teams now duplicate frameworks and apply partner-specific rules. This shift speeds up revenue realization and reduces IT workload. The companies that win fastest are the ones who onboard partners fastest.' },
  { date: 'November 30, 2025', title: 'Why Visibility Is the New Currency in Supply Chain Tech', intro: 'Data wins.', post: 'Businesses no longer tolerate "black box" integrations. They want real-time status, predictive alerts, and analytics on file volumes, SLA compliance, and failure trends. Modern integration engines and iPaaS dashboards give unparalleled insights into how documents move across systems. Visibility turns integrations from "IT plumbing" into a strategic asset that drives continuous improvement.' },
];

export default function ThoughtsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', color: 'rgba(255,255,255,0.9)', fontFamily: "'Poppins', sans-serif", padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
          ← Back to Home
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Thoughts</h1>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>2025 Blogs</h2>
          {blogs.slice().reverse().map((blog, index) => (
            <article key={index} style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '15px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#fff' }}>{blog.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>{blog.date}</p>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'rgba(255,255,255,0.8)' }}>{blog.intro}</p>
              <p style={{ lineHeight: '1.7', color: 'rgba(255,255,255,0.85)' }}>{blog.post}</p>
            </article>
          ))}
        </section>

        <section>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', borderBottom: '2px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>Podcasts</h2>
          <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '15px', padding: '2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)' }}>Coming soon!</p>
          </div>
        </section>
      </div>
    </div>
  );
}
