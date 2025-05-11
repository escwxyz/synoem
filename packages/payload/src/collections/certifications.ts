import type { CollectionConfig } from "payload";

export const Certifications: CollectionConfig = {
  slug: "certifications",
  admin: {
    useAsTitle: "name",
    group: "Downloads",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
    {
      name: "desc",
      type: "textarea",
      label: "Description",
      localized: true,
    },
    {
      name: "file",
      type: "upload",
      relationTo: "documents",
      label: "File",
      hasMany: false,
      filterOptions: {
        mimeType: {
          equals: "application/pdf",
        },
      },
    },
  ],
};
