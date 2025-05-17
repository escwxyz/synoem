import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { anyone } from "../../access";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Images: CollectionConfig = {
  slug: "images",
  admin: {
    group: "Media",
    useAsTitle: "filename",
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    adminThumbnail: ({ doc }) => {
      if (!doc || !doc.filename) {
        console.log("No doc or filename:", doc);
        return "";
      }

      if (DMNO_CONFIG.APP_ENV === "production" || DMNO_CONFIG.APP_ENV === "preview") {
        return `${DMNO_CONFIG.S3_ENDPOINT}/object/public/${DMNO_CONFIG.S3_BUCKET_NAME}/images/${doc.filename}`;
      }
      return `/api/images/file/${doc.filename}`;
    },
    staticDir: path.resolve(dirname, "../../../../../apps/cms/public/media"),
    mimeTypes: ["image/*"],
  },
  hooks: {},
};
