import type { GlobalConfig } from "payload";
import { revalidateGlobal } from "../hooks";
import { anyone } from "../access";

export const ContactInfo: GlobalConfig = {
  slug: "contact-info",
  admin: {
    group: "Settings",
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      defaultValue: "info@example.com",
    },
    {
      name: "phone",
      type: "text",
      required: true,
      defaultValue: "+1234567890",
    },
    {
      name: "addresses",
      type: "array",
      admin: {
        description: "The first address will be used as the headquarters address.",
      },
      required: true,
      localized: true,
      interfaceName: "Addresses",
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
      defaultValue: [
        {
          line1: "123 Main St",
          line2: "Apt 1",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "USA",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
