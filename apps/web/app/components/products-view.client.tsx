"use client";

import { useAtomValue } from "jotai";
import { productsViewModeAtom } from "~/atoms/products-view-mode";
import { ProductCard } from "./product-card.client";
import type { Locale, ProductTypeId } from "@synoem/config";
import { ProductPagination } from "./product-pagination.client";
import { useFilteredProducts } from "~/hooks/useFilteredProducts";
import { Button } from "@synoem/ui/components/button";
import { use, useMemo } from "react";
import { ProductsViewSkeleton } from "./products-view-skeleton.client";
import { buildProductFilterMetadata } from "~/utils/build-filter-metadata";
import type { APIResponse } from "~/types/api-response";
import type { PaginatedDocs } from "@synoem/payload/types";
import type { DataFromCollectionSlug } from "@synoem/payload/types";
import type { ProductTypeToSlugMap } from "@synoem/config";

interface Props<T extends ProductTypeId> {
  locale: Locale;
  productTypeId: T;
  categorySlug?: string;
  filterMetadataPromise: Promise<
    APIResponse<PaginatedDocs<DataFromCollectionSlug<ProductTypeToSlugMap[T]>>>
  >;
  allProductsPromise: Promise<
    APIResponse<PaginatedDocs<DataFromCollectionSlug<ProductTypeToSlugMap[T]>>>
  >;
}

export const ProductsView = <T extends ProductTypeId>({
  locale,
  productTypeId,
  categorySlug,
  filterMetadataPromise,
  allProductsPromise,
}: Props<T>) => {
  const filterMetadataResponse = use(filterMetadataPromise);

  const filterMetadata = buildProductFilterMetadata<T>(
    filterMetadataResponse.data?.docs || [],
    productTypeId,
  );

  const allProductsResponse = use(allProductsPromise);

  const allProducts = useMemo(() => {
    const products = allProductsResponse.data?.docs || [];

    if (categorySlug) {
      return products.filter((product) => {
        if (typeof product.productCategory === "string") {
          return true;
        }
        return product.productCategory.slug === categorySlug;
      });
    }

    return products;
  }, [allProductsResponse?.data?.docs, categorySlug]);

  const { filteredProducts, totalFilteredDocs, isPending, handleResetFilters } =
    useFilteredProducts({
      allProducts,
      productTypeId,
      // @ts-expect-error
      filterMetadata,
    });

  const productsViewMode = useAtomValue(productsViewModeAtom);

  const isList = productsViewMode === "list";

  if (filterMetadataResponse.status === "error" || allProductsResponse.status === "error") {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium">Error loading products</h3>
        <p className="text-muted-foreground">Please try again later</p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => {
            console.log("try again");
          }}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {isPending ? (
          <>
            <ProductsViewSkeleton />
          </>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <>
                {isList ? (
                  <div className="flex flex-col gap-4">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        // @ts-expect-error
                        product={product}
                        productTypeId={productTypeId}
                        locale={locale}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        // @ts-expect-error
                        product={product}
                        productTypeId={productTypeId}
                        locale={locale}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-muted-foreground">Please try adjusting the filters</p>
                <Button className="mt-4" variant="outline" onClick={handleResetFilters}>
                  Reset filters
                </Button>
              </div>
            )}
          </>
        )}

        {filteredProducts.length > 0 && (
          <div className="grid place-items-center mt-8">
            <ProductPagination totalCount={totalFilteredDocs} />
          </div>
        )}
      </div>
    </>
  );
};
