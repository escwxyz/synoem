import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // redirects,
  // transpilePackages: ["three"],
  productionBrowserSourceMaps: process.env.NODE_ENV === "development",
  // TODO: https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages
  serverExternalPackages: [
    "sharp",
    "drizzle-kit",
    "drizzle-kit/api",
    "pino",
    "libsql",
    "pino-pretty",
    "graphql",
  ],
  // webpack: (config, { dev, isServer }) => {
  //   // config.module.rules.push({})
  // },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
    optimizePackageImports: ["three", "recharts", "lucide-react"],
    serverComponentsHmrCache: true,

    // ppr: "incremental", // https://github.com/opennextjs/opennextjs-cloudflare/tree/main/examples/next-partial-prerendering

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
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  devIndicators: false,
};

export default withNextIntl(withBundleAnalyzer(nextConfig));

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
