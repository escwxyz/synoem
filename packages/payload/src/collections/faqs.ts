import { getProductTypeOptions } from "@synoem/config";
import type { CollectionConfig } from "payload";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  labels: {
    singular: "FAQ",
    plural: "FAQs",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "General",
          value: "general",
        },
        ...getProductTypeOptions(),
      ],
    },
    {
      name: "content",
      type: "array",
      fields: [
        {
          name: "question",
          type: "textarea",
          required: true,
          localized: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};
