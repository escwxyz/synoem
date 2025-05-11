import type { CollectionConfig } from "payload";

export const Drawings: CollectionConfig = {
  slug: "drawings",
  admin: {
    useAsTitle: "title",
    group: "Downloads",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      localized: true,
    },
    {
      name: "file",
      type: "upload",
      required: true,
      relationTo: "images",
      hasMany: false,
    },
  ],
};
