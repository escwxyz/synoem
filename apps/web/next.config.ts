import { dmnoNextConfigPlugin } from "@dmno/nextjs-integration";
import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

console.log("ENV DUMP", process.env);

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // redirects,
  // transpilePackages: ["three"],
  // TODO: https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages
  serverExternalPackages: ["@prisma/client", "mongodb", "mongoose"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
    optimizePackageImports: ["three", "recharts"],
    serverComponentsHmrCache: true,

    // viewTransition: true,
    // dynamicIO: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    minimumCacheTTL: 2678400,
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default dmnoNextConfigPlugin()(withNextIntl(withBundleAnalyzer(nextConfig)));

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
