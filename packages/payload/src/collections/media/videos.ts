import { anyone } from "../../access";
import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import { Caption, Category, Alt, Tags, Extension } from "./shared-fields";

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
    defaultColumns: ["filename", "duration", "updatedAt"],
  },
  fields: [
    // Alt,
    // Caption,
    {
      name: "duration",
      type: "text",
      label: "Duration",
    },
    // Category,
    // Tags,
    // Extension,
  ],
  upload: {
    adminThumbnail: "thumbnail",
    staticDir: path.resolve(
      dirname,
      "../../../../../apps/payload/public/media",
    ),
    mimeTypes: ["video/mp4", "video/webm", "video/ogg"],
  },
};
