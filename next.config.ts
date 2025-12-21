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
  // Enable unique build IDs
  generateBuildId: async () => `build-${Date.now()}`,
};

// Check if we're building for production
if (process.env.NODE_ENV === 'production') {
  // Set assetPrefix to your domain in production
  // nextConfig.assetPrefix = 'https://dammyhenry.com';
}

export default nextConfig;
