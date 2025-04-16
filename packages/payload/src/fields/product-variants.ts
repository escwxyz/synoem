import type { Block, CollapsibleField } from "payload";

export const createProductVariants = ({
  block,
}: {
  block: Block;
}): CollapsibleField => {
  return {
    type: "collapsible",
    label: "Product Variants",
    fields: [
      {
        name: "enableVariants",
        type: "checkbox",
        label: "Enable Variants",
        defaultValue: true,
      },
      {
        name: "vars",
        type: "blocks",
        minRows: 1,
        required: true,
        admin: {
          condition: (data) => data?.enableVariants,
        },
        blocks: [block],
      },
    ],
  };
};
