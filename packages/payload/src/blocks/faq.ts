import { PRODUCT_TYPES } from "@synoem/config";
import type { Block } from "payload";

export const FAQBlock: Block = {
  slug: "faqBlock",
  interfaceName: "FAQBlockType",
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "description",
      type: "text",
      localized: true,
    },
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
      defaultValue: "general",
    },
    {
      name: "style",
      type: "select",
      label: "Style",
      required: true,
      options: [
        {
          label: "Accordion",
          value: "accordion",
        },
        {
          label: "Card",
          value: "card",
        },
      ],
      defaultValue: "accordion",
    },
    {
      name: "content",
      type: "relationship",
      relationTo: "faqs",
      hasMany: true,
      minRows: 3,
      maxRows: 10,
      required: true,
      admin: {
        appearance: "drawer",
      },
      filterOptions: ({ siblingData }) => {
        // @ts-expect-error
        if (siblingData?.type) {
          return {
            // @ts-expect-error
            type: { equals: siblingData.type },
          };
        }
        return true;
      },
    },
  ],
};
