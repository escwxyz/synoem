import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { anyone } from "../../access";
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
  // folders: true,
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
    disableLocalStorage:
      process.env.CMS_APP_ENV === "production" || process.env.CMS_APP_ENV === "preview",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    // adminThumbnail: ({ doc }) => {
    //   if (!doc || !doc.filename) {
    //     console.log("No doc or filename:", doc);
    //     return "";
    //   }

    //   if (process.env.CMS_APP_ENV === "production" || process.env.CMS_APP_ENV === "preview") {
    //     return `${process.env.S3_ENDPOINT}/object/public/${process.env.S3_BUCKET_NAME}/images/${doc.filename}`;
    //   }
    //   return `/api/images/file/${doc.filename}`;
    // },
    staticDir:
      process.env.CMS_APP_ENV === "development"
        ? path.resolve(dirname, "../../../../../apps/cms/public/media/")
        : undefined,
    mimeTypes: ["image/*"],
  },
  hooks: {
    beforeChange: [generateBlurDataUrl],
  },
};
