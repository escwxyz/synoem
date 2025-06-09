import type { Plugin } from "payload";
import { storage } from "./storage";
import { nestedDocs } from "./nested-docs";

export const plugins: () => Plugin[] = () => {
  const plugins: Plugin[] = [nestedDocs, storage];

  return plugins;
};
