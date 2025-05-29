import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { anyone } from "../../access";
import { cmsEnvs } from "@synoem/env";
import { generateBlurDataUrl } from "../../hooks";

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
    {
      name: "blurDataUrl",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: {
    adminThumbnail: ({ doc }) => {
      if (!doc || !doc.filename) {
        console.log("No doc or filename:", doc);
        return "";
      }

      if (cmsEnvs.CMS_APP_ENV === "production" || cmsEnvs.CMS_APP_ENV === "preview") {
        return `${cmsEnvs.S3_ENDPOINT}/object/public/${cmsEnvs.S3_BUCKET_NAME}/images/${doc.filename}`;
      }
      return `/api/images/file/${doc.filename}`;
    },
    staticDir: path.resolve(dirname, "../../../../../apps/cms/public/media"),
    mimeTypes: ["image/*"],
  },
  hooks: {
    beforeChange: [generateBlurDataUrl],
  },
};
