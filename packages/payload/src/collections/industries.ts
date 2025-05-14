import type { CollectionConfig } from "payload";
import { slug } from "../fields";

export const Industries: CollectionConfig<"industries"> = {
  slug: "industries",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      localized: true,
    },
    {
      name: "coverImage",
      type: "upload",
      label: "Cover Image",
      relationTo: "images",
      admin: {
        description: "The cover image for the industry",
      },
    },
    ...slug(),
  ],
};
