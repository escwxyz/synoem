import type { CollectionConfig } from "payload";
import { createQuantityGroup, createWeightGroup } from "../fields/unit";
import { createDimensionsGroup } from "../fields/dimensions";
import { admin } from "../access";

export const PackagingConfigs: CollectionConfig = {
  slug: "packaging-configs",
  access: {
    create: admin,
    update: admin,
  },
  admin: {
    useAsTitle: "title",
    group: "Products",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      admin: {
        placeholder: "Example: Standard Packaging Configuration A",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      admin: {
        description: "Description of the packaging configuration",
      },
    },

    {
      type: "collapsible",
      label: "Base Packaging",
      admin: {
        description: "Basic packaging information for individual units",
      },
      fields: [
        createQuantityGroup("unitQty", "Package Unit", {
          admin: {
            description: "How the product is packaged individually (e.g., pieces, sets)",
          },
        }),
        createDimensionsGroup({
          name: "unitDimensions",
          label: "Package Dimensions",
          admin: {
            description: "Dimensions of a single package",
          },
        }),
        createWeightGroup("unitWeight", "Package Weight", {
          admin: {
            description: "Weight of a single packaged unit",
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Pallet Configuration",
      admin: {
        description: "Pallet-level packaging information (only for products packed in pieces)",
        condition: (data, siblingData) => {
          return siblingData?.unitQty?.unit === "pcs";
        },
      },
      fields: [
        {
          name: "qtyPerPallet",
          type: "number",
          label: "Quantity per Pallet",
          min: 1,
          admin: {
            description: "Number of pieces that can fit on one pallet",
            placeholder: "e.g., 26 panels per pallet",
          },
        },
        createDimensionsGroup({
          name: "palletDimensions",
          label: "Pallet Dimensions",
          admin: {
            description: "Dimensions of a fully loaded pallet",
          },
        }),
        createWeightGroup("palletWeight", "Pallet Weight", {
          admin: {
            description: "Total weight of a fully loaded pallet (including pallet weight)",
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Container Configuration",
      admin: {
        condition: (data, siblingData) => {
          return !!siblingData?.qtyPerPallet;
        },
        description: "Container-level shipping information (only available when using pallets)",
      },
      fields: [
        {
          name: "containerType",
          type: "select",
          label: "Container Type",
          options: [
            { label: "20GP", value: "20GP" },
            { label: "40GP", value: "40GP" },
            { label: "40HQ", value: "40HQ" },
          ],
          admin: {
            description: "Standard shipping container type",
          },
        },
        {
          name: "pltsPerContainer",
          type: "number",
          label: "Pallets per Container",
          min: 1,
          admin: {
            description: "Number of pallets that can fit in the container",
            placeholder: "e.g., 24 pallets in a 40HQ container",
          },
        },
        {
          name: "totalQty",
          type: "number",
          label: "Total Quantity",
          admin: {
            readOnly: true,
            description: "Total number of pieces in the container (Pallets × Units per Pallet)",
            placeholder: "Automatically calculated",
          },
          hooks: {
            beforeValidate: [
              ({ value, siblingData }) => {
                const palletsPerContainer = siblingData?.pltsPerContainer;
                const qtyPerPallet = siblingData?.qtyPerPallet;
                if (palletsPerContainer && qtyPerPallet) {
                  return palletsPerContainer * qtyPerPallet;
                }
                return value;
              },
            ],
          },
        },
        {
          name: "totalWeight",
          type: "number",
          label: "Total Weight (kg)",
          admin: {
            readOnly: true,
            description: "Total weight of all pallets in the container (kg)",
            placeholder: "Automatically calculated",
          },
          hooks: {
            beforeValidate: [
              ({ value, siblingData }) => {
                const palletsPerContainer = siblingData?.pltsPerContainer;
                const palletWeight = siblingData?.palletWeight?.value;
                if (palletsPerContainer && palletWeight) {
                  return palletsPerContainer * palletWeight;
                }
                return value;
              },
            ],
          },
        },
      ],
    },
  ],
};
