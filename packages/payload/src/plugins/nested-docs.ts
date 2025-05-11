import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";

export const nestedDocs = nestedDocsPlugin({
  collections: [],
  generateURL: (docs, currentDoc) => {
    return docs.reduce((url, doc) => `${url}/${doc.slug}`, "");
  },
});
