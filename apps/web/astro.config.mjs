// @ts-check
/// <reference types="./.dmno/.typegen/global.d.ts" />
import dmnoAstroIntegration from "@dmno/astro-integration";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import { imageService } from "@unpic/astro/service";
import { mutableLocales, defaultLocale } from "@synoem/config";
// import { builtinModules } from "node:module";
import netlify from "@astrojs/netlify";

// import node from "@astrojs/node";

// const nodeBuiltins = [...builtinModules, ...builtinModules.map((m) => `node:${m}`)];

// https://astro.build/config
export default defineConfig({
  site: DMNO_CONFIG.ASTRO_PUBLIC_SITE_URL,
  output: "server",
  prefetch: DMNO_CONFIG.APP_ENV === "production",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["file-type", "pngjs"], // Temporary fix until payload bumps file-type version
    },
    ssr: {
      // external: nodeBuiltins,
      external: ["file-type", "pngjs"],
    },
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
  devToolbar: {
    enabled: false,
  },
  integrations: [dmnoAstroIntegration(), react()],
  adapter: netlify(),
});
