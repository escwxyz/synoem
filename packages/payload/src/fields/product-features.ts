import type { Field } from "payload";
import { ProductFeatureBlock } from "../blocks/product-feature";

export const createProductFeaturesField = (): Field => {
  return {
    name: "features",
    type: "blocks",
    admin: {
      description: "Add features to the product",
    },
    maxRows: 4,
    blocks: [ProductFeatureBlock],
  };
};
