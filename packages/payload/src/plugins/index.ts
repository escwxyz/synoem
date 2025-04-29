import type { Plugin } from "payload";
import { seo } from "./seo";
import { storage } from "./storage";
export const plugins: () => Plugin[] = () => {
  const plugins: Plugin[] = [];

  if (DMNO_CONFIG.APP_ENV === "production") {
    plugins.push(seo);
    plugins.push(storage);
  }

  return plugins;
};
