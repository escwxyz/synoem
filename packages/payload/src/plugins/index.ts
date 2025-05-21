import type { Plugin } from "payload";
import { storage } from "./storage";
import { nestedDocs } from "./nested-docs";

export const plugins: () => Plugin[] = () => {
  const plugins: Plugin[] = [nestedDocs];

  if (DMNO_CONFIG.CMS_APP_ENV === "production" || DMNO_CONFIG.CMS_APP_ENV === "preview") {
    plugins.push(storage);
  }

  return plugins;
};
