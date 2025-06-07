import type { CollectionConfig } from "payload";
import { admin, adminOrSelf, anyone } from "../../access";
import { generateNewsletterToken, sendNewsletterConfirmation } from "../../hooks";

export const NewsletterSubscribers: CollectionConfig<"newsletter-subscribers"> = {
  slug: "newsletter-subscribers",
  admin: {
    useAsTitle: "email",
    description: "Users who have subscribed to the newsletter",
    group: "Forms",
  },
  access: {
    read: admin,
    create: anyone,
    // TODO: current newsletter subscribers are not related to the user collection,
    // update: adminOrSelf,
  },
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      unique: true,
      admin: {
        description: "The subscriber's email address",
        readOnly: true,
      },
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Subscribed", value: "subscribed" },
        { label: "Unsubscribed", value: "unsubscribed" },
      ],
      defaultValue: "subscribed",
      admin: {
        position: "sidebar",
        description: "Subscription status",
        readOnly: true,
      },
    },
    {
      name: "token",
      type: "text",
      label: "Token",
      unique: true,
      admin: {
        readOnly: true,
        description: "Token for unsubscribing",
        position: "sidebar",
      },
    },
    {
      name: "metadata",
      type: "group",
      label: "Metadata",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      fields: [
        {
          name: "page",
          type: "text",
          label: "Page",
          admin: {
            description: "The page the subscriber subscribed from",
          },
          access: {
            read: admin,
          },
        },
        {
          name: "ipAddress",
          type: "text",
          label: "IP Address",
          access: {
            read: admin,
          },
        },
        {
          name: "userAgent",
          type: "text",
          label: "Browser Information",
          access: {
            read: admin,
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [generateNewsletterToken],
    afterOperation: [sendNewsletterConfirmation],
  },
};
