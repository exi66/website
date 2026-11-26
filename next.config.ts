import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.exi.moe',
      },
      {
        protocol: 'https',
        hostname: 'exi.moe',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100kb',
      allowedOrigins: ['exi.moe', '*.exi.moe'],
    },
  },
};

export default nextConfig;
