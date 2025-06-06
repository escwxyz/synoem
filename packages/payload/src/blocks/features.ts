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
    {
      name: "columns",
      type: "select",
      admin: {
        description: "Number of columns to display the features on desktop",
      },
      options: [
        {
          label: "2 Columns",
          value: "2",
        },
        {
          label: "3 Columns",
          value: "3",
        },
        {
          label: "Single Column",
          value: "1",
        },
      ],
      defaultValue: "2",
    },
  ],
};
