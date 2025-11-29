import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dammy Henry - Portfolio",
  description: "Creative Developer & Designer Portfolio",
  metadataBase: new URL('https://dammyhenry.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dammy Henry - Portfolio',
    description: 'Creative Developer & Designer Portfolio',
    url: 'https://dammyhenry.com',
    siteName: 'Dammy Henry',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
