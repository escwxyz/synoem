import type { TextField } from "payload";

export const createSkuField = (): TextField => ({
  name: "sku",
  type: "text",
  label: "SKU",
  required: true,
  unique: true,
  admin: {
    description: "The SKU for the product",
  },
  validate: (value: string | null | undefined | string[]) => {
    // todo: validate sku
    return true;
  },
});

export const sku = createSkuField();
