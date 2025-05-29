import type { MetadataRoute } from "next";
import { webEnvs } from "@synoem/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${webEnvs.NEXT_PUBLIC_WEB_SITE_URL}/sitemap.xml`,
  };
}
