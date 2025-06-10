import type { Block } from "payload";
import { link } from "../fields";

export const InquiryBlock: Block = {
  slug: "inquiryBlock",
  interfaceName: "InquiryBlockType",
  admin: {
    group: "Functionality",
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
      required: true,
    },
    {
      type: "collapsible",
      label: "Action Buttons",
      fields: [
        link({
          localizedLabel: true,
          required: false,
          overrides: {
            name: "ctaPrimary",
            label: "Primary CTA (Optional)",
          },
        }),
        link({
          localizedLabel: true,
          required: false,
          overrides: {
            name: "ctaSecondary",
            label: "Secondary CTA (Optional)",
          },
        }),
      ],
    },
  ],
};
