import type { CollectionConfig } from "payload";
import { anyone } from "../../access";
import { generateBlurDataUrl } from "../../hooks";

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

    adminThumbnail: ({ doc }) => {
      if (!doc || !doc.filename) {
        console.log("No doc or filename:", doc);
        return "";
      }

      return `${process.env.S3_ENDPOINT}/object/public/${process.env.S3_BUCKET_NAME}/images/${doc.filename}`;
    },
    mimeTypes: ["image/*"],
  },
  hooks: {
    beforeChange: [generateBlurDataUrl],
  },
};
