import type { Block } from "payload";

export const LogoCloudBlock: Block = {
  slug: "logoCloudBlock",
  interfaceName: "LogoCloudBlockType",
  labels: {
    singular: "Logo Cloud",
    plural: "Logo Clouds",
  },
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "logos",
      label: "Logos",
      type: "upload",
      relationTo: "images",
      hasMany: true,
      required: true,
    },
    {
      name: "size",
      label: "Size",
      type: "number",
      min: 0,
      max: 200,
      defaultValue: 100,
    },
    {
      name: "speed",
      label: "Speed",
      type: "number",
      min: 0,
      max: 100,
      defaultValue: 40,
    },
    {
      name: "speedOnHover",
      label: "Speed on Hover",
      type: "number",
      min: 0,
      max: 100,
      defaultValue: 20,
    },
  ],
};
