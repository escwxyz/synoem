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
      name: "logo",
      type: "upload",
      label: "Logo",
      relationTo: "images",
      hasMany: false,
      admin: {
        description: "The logo of the certification",
      },
      required: true,
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
