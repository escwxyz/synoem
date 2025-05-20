import { dmnoNextConfigPlugin } from "@dmno/nextjs-integration";
import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // redirects,
  transpilePackages: ["three"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
    // viewTransition: true,
    // dynamicIO: true,
  },
};

export default dmnoNextConfigPlugin()(withNextIntl(nextConfig));

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
