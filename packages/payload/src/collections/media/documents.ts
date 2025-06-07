import { anyone } from "../../access";
import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import { Caption, Alt, Tags, Extension } from "./shared-fields";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Documents: CollectionConfig = {
  slug: "documents",
  access: {
    read: anyone,
  },
  admin: {
    group: "Media",
    useAsTitle: "filename",
  },
  fields: [],
  upload: {
    adminThumbnail: "thumbnail",
    staticDir:
      process.env.CMS_APP_ENV === "development"
        ? path.resolve(dirname, "../../../../../apps/cms/public/media/")
        : undefined,
    mimeTypes: ["application/pdf"],
    focalPoint: false,
  },
};
