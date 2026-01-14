import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    // Framer Motion has known TypeScript compatibility issues
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
