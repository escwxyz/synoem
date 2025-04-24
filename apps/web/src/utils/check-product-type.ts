import { PRODUCT_CATEGORIES } from "@synoem/config";
import type { Product } from "@synoem/payload/payload-types";

export const isSolarPanel = (product: Pick<Product, "category" | "solarPanel">) => {
  return (
    product.category === PRODUCT_CATEGORIES.solarPanel.pluralSlug &&
    Array.isArray(product.solarPanel) &&
    product.solarPanel.length > 0
  );
};

export const isPumpController = (product: Pick<Product, "category" | "pumpController">) => {
  return (
    product.category === PRODUCT_CATEGORIES.pumpController.pluralSlug &&
    Array.isArray(product.pumpController) &&
    product.pumpController.length > 0
  );
};
