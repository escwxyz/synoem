import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Images: CollectionConfig = {
  slug: "images",
  admin: {
    group: "Media",
    useAsTitle: "filename",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    staticDir: path.resolve(
      dirname,
      "../../../../../apps/payload/public/media",
    ),
    mimeTypes: ["image/*"],
  },
};
