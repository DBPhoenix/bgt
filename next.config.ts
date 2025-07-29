import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/bgt',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
