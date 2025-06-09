import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { generateBreadcrumbsUrl, UNIQUE_PATH_COLLECTIONS } from "../fields/path";

export const nestedDocs = nestedDocsPlugin({
  collections: UNIQUE_PATH_COLLECTIONS,
  generateURL: generateBreadcrumbsUrl,
});
