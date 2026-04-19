import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Dammy Henry - Data Engineer & Analytics Professional',
    template: '%s | Dammy Henry',
  },
  description:
    'Data Engineer specializing in ETL pipelines, data warehousing, Power BI dashboards, and analytics infrastructure. 12+ years transforming raw data into actionable business insights.',
  keywords: [
    'Data Engineer',
    'Data Engineering',
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
    'Web Developer',
    'Full Stack Developer',
    'iOS Developer',
    'Swift',
    'React',
    'TypeScript',
    'Next.js',
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
    title: 'Dammy Henry - Data Engineer & Analytics Professional',
    description: 'Data Engineer & Web Developer specializing in ETL pipelines, Power BI dashboards, data warehousing, and analytics infrastructure.',
    url: 'https://dammyhenry.com',
    siteName: 'Dammy Henry Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dammy Henry - Data Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dammy Henry - Data Engineer & Analytics Professional',
    description: 'Data Engineer specializing in ETL, Power BI, and data warehousing. 12+ years experience.',
    creator: '@dammyhenry',
    images: ['/img/twitter-image.jpg'],
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
  jobTitle: 'Data Engineer & Web Developer',
  description:
    'Data Engineer & Web Developer specializing in ETL pipelines, Power BI dashboards, data warehousing, and building scalable data solutions.',
  sameAs: [
    'https://www.linkedin.com/in/dammyhenry',
    'https://github.com/rudeboydamn',
  ],
  knowsAbout: [
    'Data Engineering',
    'ETL Pipelines',
    'Power BI',
    'SQL',
    'Python',
    'Data Warehousing',
    'Business Intelligence',
    'Web Development',
    'iOS Development',
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
    'Portfolio of Dammy Henry - Data Engineer specializing in ETL pipelines, Power BI, and data warehousing.',
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Dammy Henry - Data Engineering Services',
  description:
    'Data engineering, analytics, and business intelligence consulting services.',
  url: 'https://dammyhenry.com',
  provider: {
    '@type': 'Person',
    name: 'Dammy Henry',
  },
  serviceType: [
    'Data Engineering',
    'ETL Development',
    'Power BI Dashboards',
    'Data Warehousing',
    'Web Development',
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
