import type { CollectionConfig } from "payload";
import { slug } from "../fields";
import { generateId } from "../hooks";

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
      name: "id",
      type: "text",
      admin: {
        hidden: true,
      },
    },
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
  hooks: {
    beforeValidate: [generateId],
  },
};
