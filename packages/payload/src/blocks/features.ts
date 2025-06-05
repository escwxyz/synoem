import type { Block } from "payload";
import { FeatureBlock } from "./feature";

export const FeaturesBlock: Block = {
  slug: "featuresBlock",
  interfaceName: "FeaturesBlockType",
  labels: {
    singular: "Features Block",
    plural: "Features Blocks",
  },
  fields: [
    {
      name: "features",
      type: "blocks",
      minRows: 2,
      maxRows: 6,
      admin: {
        description: "Showcased features of the product, min. 2, max. 6",
      },
      blocks: [FeatureBlock],
    },
  ],
};
