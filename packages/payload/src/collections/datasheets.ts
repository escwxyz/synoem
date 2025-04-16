import type { CollectionConfig } from "payload";

export const Datasheets: CollectionConfig<"datasheets"> = {
  slug: "datasheets",
  admin: {
    useAsTitle: "title",
    group: "Product Related",
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
      admin: {
        description: "Upload a PDF file for the datasheet",
      },
    },
  ],
};
