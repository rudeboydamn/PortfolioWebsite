import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dammy Henry - Your Meticulous Analyst',
  description:
    'Financial Analyst & Web Developer specializing in EDI, integrated payables, and data analytics to drive financial performance and build pragmatic digital experiences.',
  keywords: ['Financial Analyst', 'Web Developer', 'EDI', 'Data Analysis', 'Business Analyst', 'Integrated Payables', 'Implementation Analyst'],
  authors: [{ name: 'Dammy Henry' }],
  openGraph: {
    title: 'Dammy Henry - Your Meticulous Analyst',
    description: 'Financial Analyst & Web Developer focusing on EDI, automation, and data-driven decision making.',
    url: 'https://dammyhenry.com',
    siteName: 'Dammy Henry',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dammy Henry - Your Meticulous Analyst',
    description: 'Financial Analyst & Web Developer with a focus on EDI and automation.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dammy Henry',
  url: 'https://dammyhenry.com',
  jobTitle: 'Financial Analyst & Web Developer',
  description:
    'Financial Analyst & Web Developer specializing in EDI, integrated payables, data analytics, and building pragmatic digital experiences for businesses.',
  sameAs: [
    'https://www.linkedin.com/in/dammyhenry',
    'https://github.com/rudeboydamn',
  ],
} as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/d-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/img/d-icon.svg" />
        <meta name="theme-color" content="#1e3c72" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
