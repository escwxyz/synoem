import { PRODUCT_TYPES } from "@synoem/config";
import type { Field, GlobalConfig } from "payload";
import { revalidateGlobals } from "../hooks";

const sanitizeString = (str: string) => str.replace(/\s+/g, " ").trim();

const contentField: Field = {
  name: "content",
  type: "array",
  minRows: 3,
  maxRows: 10,
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
  hooks: {
    beforeChange: [
      async ({ value }) => {
        if (Array.isArray(value)) {
          return value.map((item) => ({
            ...item,
            question:
              typeof item.question === "string" ? sanitizeString(item.question) : item.question,
            answer: typeof item.answer === "string" ? sanitizeString(item.answer) : item.answer,
          }));
        }
        return value;
      },
    ],
  },
};

export const FAQ: GlobalConfig = {
  slug: "faq",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "general",
          label: "General",
          fields: [contentField],
        },
        {
          label: "Product",
          fields: Object.values(PRODUCT_TYPES).map((productType) => ({
            type: "group",
            name: productType.id,
            fields: [contentField],
          })),
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobals],
  },
};
