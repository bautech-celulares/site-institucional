
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Loader próprio: usa os WebP gerados por scripts/optimize-images.mjs
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    deviceSizes: [360, 540],
    imageSizes: [96, 240, 282, 320, 460, 480, 520, 560],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
