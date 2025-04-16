import { PRODUCT_VARIANTS } from "@synoem/config";
import { productGallery } from "../../fields/product-gallery";
import { sku } from "../../fields/sku";
import type { Block } from "payload";

export const PumpControllerVariantBlock: Block = {
  slug: "pcv",
  labels: {
    singular: "Pump Controller Variant",
    plural: "Pump Controller Variants",
  },
  interfaceName: "PumpControllerVariantBlockType",
  fields: [
    sku,
    {
      name: "color",
      type: "select",
      options: PRODUCT_VARIANTS.pumpController.color.options,
      required: true,
    },
    productGallery,
  ],
};
