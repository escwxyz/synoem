import type { Plugin } from "payload";
import { storage } from "./storage";
import { nestedDocs } from "./nested-docs";
import { cmsEnvs } from "@synoem/env";

export const plugins: () => Plugin[] = () => {
  const plugins: Plugin[] = [nestedDocs];

  if (cmsEnvs.CMS_APP_ENV === "production" || cmsEnvs.CMS_APP_ENV === "preview") {
    plugins.push(storage);
  }

  return plugins;
};
