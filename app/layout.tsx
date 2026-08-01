import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Dammy Henry - Senior Data Architect',
    template: '%s | Dammy Henry',
  },
  description:
    'Senior Data Architect leading enterprise platform modernization, cloud migration, data governance, semantic models, and analytics delivery.',
  keywords: [
    'Senior Data Architect',
    'Data Architecture Manager',
    'Data Engineering Manager',
    'Data Engineer',
    'Data Engineering',
    'Data Governance',
    'Azure Synapse',
    'Microsoft Fabric',
    'Docker',
    'ETL Pipelines',
    'Power BI',
    'DAX',
    'SQL',
    'Python',
    'Data Warehousing',
    'Analytics',
    'Business Intelligence',
    'Data Modeling',
    'dbt',
    'Apache Airflow',
    'EDI',
    'Enterprise Integration',
  ],
  authors: [{ name: 'Dammy Henry', url: 'https://dammyhenry.com' }],
  creator: 'Dammy Henry',
  publisher: 'Dammy Henry',
  metadataBase: new URL('https://dammyhenry.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dammy Henry - Senior Data Architect',
    description: 'Senior Data Architect leading governed enterprise platforms, cloud modernization, semantic models, and the teams behind them.',
    url: 'https://dammyhenry.com',
    siteName: 'Dammy Henry Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Dammy Henry - Senior Data Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dammy Henry - Senior Data Architect',
    description: 'Enterprise data architecture, platform modernization, governance, semantic models, and delivery leadership.',
    creator: '@dammyhenry',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console code
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Professional Schema.org structured data
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dammy Henry',
  url: 'https://dammyhenry.com',
  image: 'https://dammyhenry.com/img/dammyhenry.png',
  jobTitle: 'Senior Data Architect',
  description:
    'Senior Data Architect leading enterprise data platforms, cloud modernization, governance, semantic models, and cross-functional delivery.',
  sameAs: [
    'https://www.linkedin.com/in/dammyhenry',
    'https://github.com/rudeboydamn',
  ],
  knowsAbout: [
    'Enterprise Data Architecture',
    'Platform Modernization',
    'Stakeholder Management',
    'Data Engineering',
    'ETL Pipelines',
    'Power BI',
    'SQL',
    'Python',
    'Data Warehousing',
    'Business Intelligence',
    'Portfolio Leadership',
    'Data Product Strategy',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Keystone Vale',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dammy Henry Portfolio',
  url: 'https://dammyhenry.com',
  author: {
    '@type': 'Person',
    name: 'Dammy Henry',
  },
  description:
    'Portfolio of Dammy Henry, Senior Data Architect and enterprise data leader.',
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Dammy Henry - Enterprise Data Architecture Services',
  description:
    'Enterprise data architecture, platform modernization, analytics strategy, and delivery leadership services.',
  url: 'https://dammyhenry.com',
  provider: {
    '@type': 'Person',
    name: 'Dammy Henry',
  },
  serviceType: [
    'Enterprise Data Architecture',
    'Platform Modernization',
    'Data Engineering Leadership',
    'Analytics Strategy',
    'Data Governance',
    'Semantic Model Design',
  ],
};

import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/img/d-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/img/d-icon.svg" />
        <link rel="mask-icon" href="/img/d-icon.svg" color="#333333" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://unicons.iconscout.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `
          }}
        />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','dark')}else{document.documentElement.setAttribute('data-theme','light')}}catch(e){}})()`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
