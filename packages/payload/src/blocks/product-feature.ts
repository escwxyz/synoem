import type { Block } from "payload";

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
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    // TODO
    // {
    //   name: "icon",
    //   type: "text",
    //   admin: {
    //     components: {},
    //   },
    // },
  ],
};
