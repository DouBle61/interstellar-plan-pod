import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath: "/interstellar-plan-pod",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
