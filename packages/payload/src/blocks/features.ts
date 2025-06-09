import type { Block } from "payload";
import { FeatureBlock } from "./feature";

export const FeaturesBlock: Block = {
  slug: "featuresBlock",
  interfaceName: "FeaturesBlockType",
  admin: {
    group: "Content",
  },
  labels: {
    singular: "Features Block",
    plural: "Features Blocks",
  },
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        description: "Title of the features block",
      },
      localized: true,
    },
    {
      name: "description",
      type: "text",
      admin: {
        description: "Description of the features block",
      },
      localized: true,
    },
    {
      name: "features",
      type: "blocks",
      minRows: 2,
      maxRows: 6,
      admin: {
        description: "Showcased features, min. 2, max. 6",
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
