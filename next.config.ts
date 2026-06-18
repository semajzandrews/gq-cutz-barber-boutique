import type { NextConfig } from "next";

// Lenis + dev: a single instance must match production, so StrictMode's
// dev double-invoke is disabled (see DESIGN_LESSONS 06-03).
const nextConfig: NextConfig = {
  reactStrictMode: false,
};

export default nextConfig;
