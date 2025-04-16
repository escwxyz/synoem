import type { CollectionConfig } from "payload";
import { admin, adminOrSelf } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: admin,
    delete: admin,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    defaultColumns: ["name", "email", "roles"],
    useAsTitle: "name",
    group: "Users",
  },
  auth: {
    depth: 0,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "roles",
      type: "select",
      required: true,
      hasMany: true,
      options: ["admin", "editor", "customer"],
    },
  ],
};
