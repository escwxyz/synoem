import type { Plugin } from "payload";
import { storage } from "./storage";
import { nestedDocs } from "./nested-docs";
import { importExport } from "./import-export";

export const plugins: () => Plugin[] = () => {
  const plugins: Plugin[] = [nestedDocs, importExport];

  if (process.env.CMS_APP_ENV === "production" || process.env.CMS_APP_ENV === "preview") {
    plugins.push(storage);
  }

  return plugins;
};
