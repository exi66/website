import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com/**",
      },
      {
        protocol: "https",
        hostname: "*.exi.moe/**",
      },
      {
        protocol: "https",
        hostname: "exi.moe/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["exi.moe", "*.exi.moe"],
    },
  },
  // if used turbopack
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
