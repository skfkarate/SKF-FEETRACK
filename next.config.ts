import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true, // Required for static export
  },
  devIndicators: false, // Hide the "N" badge in dev mode
  // Uncomment and set your repo name if deploying to github.io/repo-name
  // basePath: '/your-repo-name',
};

export default nextConfig;
