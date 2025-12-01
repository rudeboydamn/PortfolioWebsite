"use client";

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../../../components/theme-toggle';

export default function As2IsBackWhySecureB2bTransportStillMattersPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--background)',
      color: 'rgba(255,255,255,0.9)',
      fontFamily: "'Poppins', sans-serif",
      padding: '2rem'
    }}>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <ThemeToggle />
      </div>

      <Link href="/thoughts" style={{
        display: 'inline-block',
        marginBottom: '2rem',
        color: 'var(--skin-solid)',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: '500'
      }}>
        ← Back to Thoughts
      </Link>

      <article style={{
        maxWidth: '800px',
        margin: '0 auto',
        lineHeight: '1.7'
      }}>
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: 'var(--title)',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AS2 Is Back: Why Secure B2B Transport Still Matters
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text)',
            marginBottom: '2rem'
          }}>
            <time dateTime="2025-10-05">October 5, 2025</time> • by Dammy Henry
          </p>
        </header>

        <section style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>
            AS2 isn&apos;t flashy—but it&apos;s everywhere.
          </p>
          <p>
            With rising cybersecurity requirements, AS2 continues to dominate secure file exchange. Its non-repudiation and encryption make it ideal for modern compliance expectations. Paired with cloud-based AS2 hubs and automated certificate rotation, the protocol is experiencing a quiet resurgence. In a world full of APIs, AS2 remains the gold standard for mission-critical supply chain documents.
          </p>
        </section>
      </article>

      <footer style={{
        textAlign: 'center',
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        color: 'var(--text)'
      }}>
        <p>© 2025 Dammy Henry. All rights reserved.</p>
        <div style={{ marginTop: '1rem' }}>
          <a href="mailto:dammy@dammyhenry.com" style={{ color: 'var(--skin-solid)', textDecoration: 'none', marginRight: '1rem' }}>Email</a>
          <a href="https://www.linkedin.com/in/dammyhenry" target="_blank" rel="noopener" style={{ color: 'var(--skin-solid)', textDecoration: 'none', marginRight: '1rem' }}>LinkedIn</a>
          <a href="https://github.com/rudeboydamn" target="_blank" rel="noopener" style={{ color: 'var(--skin-solid)', textDecoration: 'none' }}>GitHub</a>
        </div>
      </footer>
    </div>
  );
}
