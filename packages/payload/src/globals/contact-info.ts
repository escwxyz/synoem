import type { GlobalConfig } from "payload";

export const ContactInfo: GlobalConfig = {
  slug: "contact-info",
  admin: {
    group: "Setting",
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "addresses",
      type: "array",
      admin: {
        description:
          "The first address will be used as the headquarters address.",
      },
      required: true,
      localized: true,
      fields: [
        {
          name: "line1",
          type: "text",
          required: true,
        },
        {
          name: "line2",
          type: "text",
        },
        {
          name: "city",
          type: "text",
          required: true,
        },
        {
          name: "state",
          type: "text",
        },
        {
          name: "zip",
          type: "text",
        },
        {
          name: "country",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
