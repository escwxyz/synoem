import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { processAttachment } from "../../hooks/process-attachment";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Attachments: CollectionConfig = {
  slug: "attachments",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "createdAt"],
    group: "Media",
    description: "Customer uploaded files",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  upload: {
    staticDir:
      process.env.CMS_APP_ENV === "development"
        ? path.resolve(dirname, "../../../../../apps/cms/public/media/attachments")
        : undefined,
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
  },
  hooks: {
    beforeChange: [processAttachment],
  },
  fields: [],
};
