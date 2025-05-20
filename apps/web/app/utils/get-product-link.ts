import { type ProductTypeId, PRODUCT_TYPES } from "@synoem/config";
import type { SolarPanel, PumpController } from "@synoem/types";

export const getProductLink = (
  productTypeId: ProductTypeId,
  product: Pick<SolarPanel | PumpController, "slug" | "productCategory">,
) => {
  const { slug, productCategory } = product;

  if (typeof productCategory !== "object") {
    console.warn("Product Category is not populated properly");
    return null;
  }

  const productTypeSlug = Object.values(PRODUCT_TYPES).find(
    (type) => type.id === productTypeId,
  )?.id;

  if (!productTypeSlug) {
    console.warn("Product Type Slug is not populated properly");
    return null;
  }

  return `/products/${productTypeSlug}/${productCategory.slug}/${slug}`;
};
