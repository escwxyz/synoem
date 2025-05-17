import { dmnoNextConfigPlugin } from "@dmno/nextjs-integration";
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  async rewrites() {
    return [
      {
        source: "/dashboard/:path*",
        destination: "/admin/:path*",
      },
    ];
  },
};

export default dmnoNextConfigPlugin()(withPayload(nextConfig, { devBundleServerPackages: false }));
