import { anyone } from "../../access";
import type { CollectionConfig } from "payload";
import { fileURLToPath } from "node:url";
import path from "node:path";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Models: CollectionConfig = {
  slug: "models",
  access: {
    read: anyone,
  },
  admin: {
    group: "Media",
    useAsTitle: "filename",
  },
  fields: [
    // {
    //   name: "preview",
    //   type: "ui",
    //   admin: {
    //     components: {
    //       Field: "@synoem/payload/components/model-previewer#ModelPreviewer",
    //     },
    //   },
    // },
    // {
    //   name: "info",
    //   type: "json",
    //   admin: {
    //     readOnly: true,
    //     description: "Information about the model",
    //     components: {
    //       beforeInput: ["@synoem/payload/components/model-field#ModelField"],
    //     },
    //   },
    // },
  ],
  upload: {
    staticDir:
      process.env.CMS_APP_ENV === "development"
        ? path.resolve(dirname, "../../../../../apps/cms/public/media/")
        : undefined,
    // TODO: still not working for `.gltf` files.
    mimeTypes: ["application/octet-stream", "model/gltf-binary", "model/gltf+json"],
  },
  hooks: {
    afterChange: [],
  },
};
