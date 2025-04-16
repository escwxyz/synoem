import type { CollectionConfig } from "payload";
import { createDurationGroup } from "../fields/unit";

export const Warranties: CollectionConfig = {
  slug: "warranties",
  admin: {
    useAsTitle: "title",
    group: "Product Related",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      localized: true,
    },
    {
      name: "type",
      type: "select",
      label: "Type",
      defaultValue: "product",
      options: [
        {
          label: "Product Warranty",
          value: "product",
        },
        {
          label: "Power Warranty",
          value: "power",
        },
      ],
    },
    {
      name: "desc",
      type: "textarea",
      label: "Description",
      localized: true,
      admin: {
        description: "Description of the warranty",
      },
    },
    createDurationGroup("duration", "Duration", {
      admin: {
        description: "Duration of the warranty",
      },
    }),
    {
      name: "file",
      type: "upload",
      relationTo: "documents",
      label: "File",
      hasMany: false,
      admin: {
        description: "File of the warranty",
      },
      filterOptions: {
        mimeType: {
          equals: "application/pdf",
        },
      },
    },
  ],
};
