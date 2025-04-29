import type { CollectionConfig } from "payload";
import { title } from "../fields/title";
import { updateNotificationState } from "../hooks/update-notification-state";

export const Notifications: CollectionConfig<"notifications"> = {
  slug: "notifications",
  fields: [
    title,
    {
      name: "link",
      type: "relationship",
      hasMany: false,
      relationTo: ["pages", "products"], // add posts and products
    },
    {
      name: "state",
      type: "select",
      options: ["active", "inactive"],
      defaultValue: "inactive",
    },
  ],
  hooks: {
    afterChange: [updateNotificationState],
  },
};
