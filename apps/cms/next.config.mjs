import { dmnoNextConfigPlugin } from "@dmno/nextjs-integration";
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
};

export default dmnoNextConfigPlugin()(withPayload(nextConfig, { devBundleServerPackages: false }));
