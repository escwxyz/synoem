import type { Product } from "~/types/product";
import { isSolarPanel } from "./check-product-type";

export const getProductUrl = (product: Product): string => {
  if (isSolarPanel(product)) {
    return `/products/solar-panels/${product.cell.type}/${product.slug}`;
  }

  return `/products/pump-controllers/${product.type}/${product.slug}`;
};
