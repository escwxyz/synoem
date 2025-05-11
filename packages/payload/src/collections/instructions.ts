import type { CollectionConfig } from "payload";

export const Instructions: CollectionConfig = {
  slug: "instructions",
  admin: {
    useAsTitle: "title",
    group: "Downloads",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      localized: true,
      required: true,
    },
    {
      name: "description",
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
      admin: {
        description: "Upload a PDF file for the instructions",
      },
    },
  ],
};
