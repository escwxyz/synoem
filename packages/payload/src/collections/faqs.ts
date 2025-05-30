import { PRODUCT_TYPES } from "@synoem/config";
import type { CollectionConfig } from "payload";
import { anyone } from "../access";

const sanitizeString = (str: string) => str.replace(/\s+/g, " ").trim();

export const Faqs: CollectionConfig = {
  slug: "faqs",
  admin: {
    group: "Content",
    defaultColumns: ["type", "question"],
    useAsTitle: "question",
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        {
          label: "General",
          value: "general",
        },
        ...Object.values(PRODUCT_TYPES).map((productType) => ({
          label: productType.label,
          value: productType.id,
        })),
      ],
    },
    {
      name: "question",
      type: "text",
      localized: true,
      required: true,
      hooks: {
        beforeChange: [
          async ({ value }) => {
            if (typeof value === "string") {
              return sanitizeString(value);
            }
            return value;
          },
        ],
      },
    },
    {
      name: "answer",
      type: "richText",
      required: true,
      localized: true,
    },
  ],
};
