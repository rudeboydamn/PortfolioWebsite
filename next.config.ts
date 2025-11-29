import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Ensure static export works with dynamic routes
  trailingSlash: true,
  // Disable server-side rendering for static export
  distDir: 'out',
  // Enable static HTML export
  generateBuildId: async () => 'dammy-henry-portfolio',
  // Add basePath if needed
  // basePath: process.env.NODE_ENV === 'production' ? '' : '',
  // Add assetPrefix if needed
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://dammyhenry.com' : '',
};

// Check if we're building for production
if (process.env.NODE_ENV === 'production') {
  // Set assetPrefix to your domain in production
  // nextConfig.assetPrefix = 'https://dammyhenry.com';
}

export default nextConfig;
