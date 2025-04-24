import type { Block } from "payload";
import { createIconSelectField } from "../fields/icon-select";

// TODO: add more style options
// TODO: add row label & validation
export const ProductFeatureBlock: Block = {
  slug: "productFeatureBlock",
  interfaceName: "ProductFeatureBlockType",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    // TODO
    createIconSelectField({}),
  ],
};
