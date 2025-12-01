import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dammy Henry - Your Meticulous Analyst',
  description: 'Financial Analyst & Web Developer. Data-driven approaches to enhance financial operations and create beautiful digital experiences.',
  keywords: ['Financial Analyst', 'Web Developer', 'EDI', 'Data Analysis', 'Business Analyst'],
  authors: [{ name: 'Dammy Henry' }],
  openGraph: {
    title: 'Dammy Henry - Your Meticulous Analyst',
    description: 'Financial Analyst & Web Developer',
    url: 'https://dammyhenry.com',
    siteName: 'Dammy Henry',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dammy Henry - Your Meticulous Analyst',
    description: 'Financial Analyst & Web Developer',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/dammyhenry.png" type="image/png" />
        <link rel="apple-touch-icon" href="/dammyhenry.png" />
        <meta name="theme-color" content="#1e3c72" />
      </head>
      <body>{children}</body>
    </html>
  );
}
