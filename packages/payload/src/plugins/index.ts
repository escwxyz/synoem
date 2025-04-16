import type { Plugin } from "payload";
import { seo } from "./seo";
import { bunny } from "./bunny";

export const plugins: () => Plugin[] = () => {
  const plugins: Plugin[] = [bunny];

  if (DMNO_CONFIG.APP_ENV === "production") {
    plugins.push(seo);
  }

  return plugins;
};
