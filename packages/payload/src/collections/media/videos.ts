import { anyone } from "../../access";
import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Videos: CollectionConfig = {
  slug: "videos",
  access: {
    read: anyone,
  },
  admin: {
    group: "Media",
    useAsTitle: "filename",
    defaultColumns: ["filename", "caption", "updatedAt"],
  },
  fields: [
    {
      name: "caption",
      type: "text",
      label: "Caption",
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    staticDir:
      process.env.CMS_APP_ENV === "development"
        ? path.resolve(dirname, "../../../../../apps/cms/public/media/")
        : undefined,
    mimeTypes: ["video/mp4", "video/webm", "video/ogg"],
  },
};
