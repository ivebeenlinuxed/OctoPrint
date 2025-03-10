import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/plugin/octoreact/ui',
  images: {
    path: '/plugin/octoreact/ui/public',
  },
};

export default nextConfig;
