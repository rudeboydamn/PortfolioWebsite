import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dammy Henry - Data Engineer',
  description:
    'Data Engineer specializing in ETL pipelines, data warehousing, and analytics infrastructure to transform raw data into actionable insights and drive business decisions.',
  keywords: ['Data Engineer', 'Web Developer', 'ETL', 'Data Pipelines', 'SQL', 'Python', 'Data Warehousing', 'Analytics'],
  authors: [{ name: 'Dammy Henry' }],
  openGraph: {
    title: 'Dammy Henry - Data Engineer',
    description: 'Data Engineer & Web Developer focusing on data pipelines, ETL, and analytics infrastructure.',
    url: 'https://dammyhenry.com',
    siteName: 'Dammy Henry',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dammy Henry - Data Engineer',
    description: 'Data Engineer & Web Developer with a focus on data pipelines and analytics.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dammy Henry',
  url: 'https://dammyhenry.com',
  jobTitle: 'Data Engineer & Web Developer',
  description:
    'Data Engineer & Web Developer specializing in ETL pipelines, data warehousing, analytics infrastructure, and building scalable data solutions for businesses.',
  sameAs: [
    'https://www.linkedin.com/in/dammyhenry',
    'https://github.com/rudeboydamn',
  ],
} as const;

import { Providers } from './providers';

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
        <meta name="theme-color" content="#0a0a0a" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        ></script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
