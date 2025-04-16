// @ts-check
/// <reference types="./.dmno/.typegen/global.d.ts" />
import dmnoAstroIntegration from "@dmno/astro-integration";
import { defineConfig } from "astro/config";
// import { mutableLocales, defaultLocale } from "@synoem/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { imageService } from "@unpic/astro/service";
import { mutableLocales, defaultLocale } from "@synoem/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: DMNO_PUBLIC_CONFIG.PUBLIC_SITE_URL,
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: imageService({}),
  },
  i18n: {
    locales: mutableLocales,
    defaultLocale,
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [dmnoAstroIntegration(), react()],
  adapter: vercel(),
  experimental: {
    // svg: true,
  },
});
