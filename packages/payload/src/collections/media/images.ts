import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { anyone } from "../../access";
import { generateId } from "../../hooks";

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
      name: "id",
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    staticDir: path.resolve(dirname, "../../../../../apps/cms/public/media"),
    mimeTypes: ["image/*"],
  },
  hooks: {
    beforeValidate: [generateId],
  },
};
