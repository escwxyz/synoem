import type { CollectionConfig } from "payload";
import { updateNotificationState } from "../hooks/update-notification-state";

export const Notifications: CollectionConfig<"notifications"> = {
  slug: "notifications",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "link",
      type: "relationship",
      hasMany: false,
      relationTo: ["pages", "solar-panels", "pump-controllers"],
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
