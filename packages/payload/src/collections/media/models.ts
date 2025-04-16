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
    // TODO: add some configs for r3f to apply to the model
  ],
  upload: {
    staticDir: path.resolve(
      dirname,
      "../../../../../apps/payload/public/media",
    ),
    // TODO: not working as expected, need to find a way to only allow 3d models
    // mimeTypes: [
    //   "model/gltf-binary",
    //   "model/gltf+json",
    // ],
  },
};
