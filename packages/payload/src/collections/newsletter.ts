import type { CollectionConfig } from "payload";
import { admin, adminOrSelf, anyone } from "../access";
import { sendNewsletterConfirmation } from "../hooks/send-newsletter-confirmation";

export const NewsletterSubscribers: CollectionConfig<"newsletter-subscribers"> =
  {
    slug: "newsletter-subscribers",
    admin: {
      useAsTitle: "email",
      description: "Users who have subscribed to the newsletter",
      group: "Forms",
    },
    access: {
      read: admin,
      create: anyone,
      update: adminOrSelf,
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
        name: "name",
        label: "Name",
        type: "text",
        admin: {
          description: "The subscriber's name (optional)",
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
      afterOperation: [sendNewsletterConfirmation],
    },
  };
