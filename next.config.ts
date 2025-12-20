import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Ensure proper routing
  trailingSlash: true,
  // Use standard distDir for Vercel
  distDir: '.next',
  // Enable static HTML export for Vercel
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
