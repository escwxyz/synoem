import { PRODUCT_VARIANTS } from "@synoem/config";
import { productGallery } from "../../fields/product-gallery";
import { sku } from "../../fields/sku";
import type { Block } from "payload";

export const SolarPanelVariantBlock: Block = {
  slug: "spv",
  labels: {
    singular: "Solar Panel Variant",
    plural: "Solar Panel Variants",
  },
  interfaceName: "SolarPanelVariantBlockType",
  fields: [
    sku,
    {
      name: "frame",
      type: "select",
      required: true,
      options: PRODUCT_VARIANTS.solarPanel.frameColor.options,
    },
    {
      name: "panel",
      type: "select",
      required: true,
      options: PRODUCT_VARIANTS.solarPanel.panelColor.options,
    },
    productGallery,
  ],
};
