import type { Block } from "payload";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  interfaceName: "MediaBlockType",
  fields: [
    {
      name: "media",
      admin: {
        description: "Select a media item to display",
      },
      type: "relationship",
      relationTo: ["images", "videos", "models"],
      required: true,
      hasMany: false,
    },
  ],
};
