import { atom } from "jotai";
import type { ProductVariants } from "@synoem/types";

export type VariantOption = NonNullable<ProductVariants[number]["options"]>[number];

export type SelectedVariant = {
  id: string;
  sku: string;
  options: VariantOption[];
};

export const selectedVariantStore = atom<SelectedVariant | null>(null);
