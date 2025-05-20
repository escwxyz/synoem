"use client";

import { useAtom } from "jotai";
import { selectedVariantStore } from "~/atoms/product-variant-option";

export const ProductVariantInfo = () => {
  const [selectedVariant] = useAtom(selectedVariantStore);

  if (!selectedVariant) {
    return null;
  }

  const { sku, options } = selectedVariant;

  return <div>sku: {sku}</div>;
};
