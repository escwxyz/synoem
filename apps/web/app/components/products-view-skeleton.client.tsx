"use client";

import { PRODUCTS_PER_PAGE } from "@synoem/config";
import { useAtom } from "jotai";
import { productsViewModeAtom } from "~/atoms/products-view-mode";
import { ProductCardSkeleton } from "./product-card-skeleton.client";

export const ProductsViewSkeleton = () => {
  const [productsViewMode] = useAtom(productsViewModeAtom);

  const isList = productsViewMode === "list";

  return (
    <>
      {isList ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}
    </>
  );
};
