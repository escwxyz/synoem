import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slug";
import { title } from "../fields/title";
import { desc } from "../fields/description";
import { coverImage } from "../fields/cover-image";

export const Industries: CollectionConfig<"industries"> = {
  slug: "industries",
  access: {
    read: () => true,
  },
  fields: [title, desc, coverImage, ...slugField()],
};
