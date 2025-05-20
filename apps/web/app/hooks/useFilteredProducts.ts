import { useMemo } from "react";
import { PRODUCTS_PER_PAGE, type ProductTypeId, type ProductTypeToSlugMap } from "@synoem/config";
import type { DataFromCollectionSlug } from "@synoem/payload/types";
import { useProductPagination } from "./use-product-pagination";
import { useProductFilters } from "./use-product-filters";
import { filterProducts } from "~/utils";
import type { SolarPanelFilterMetadata, PumpControllerFilterMetadata } from "@synoem/api";

interface UseFilteredProductsProps<T extends ProductTypeId> {
  allProducts: DataFromCollectionSlug<ProductTypeToSlugMap[T]>[];
  productTypeId: T;
  filterMetadata: T extends "solar-panel" ? SolarPanelFilterMetadata : PumpControllerFilterMetadata;
}

export function useFilteredProducts<T extends ProductTypeId>({
  allProducts,
  productTypeId,
  filterMetadata,
}: UseFilteredProductsProps<T>) {
  const { currentPage } = useProductPagination();

  const { urlFilters, isPending, handleResetFilters } = useProductFilters(
    filterMetadata,
    productTypeId,
  );

  const filteredData = useMemo(() => {
    if (!allProducts?.length) {
      return {
        docs: [],
        totalDocs: 0,
        limit: PRODUCTS_PER_PAGE,
        totalPages: 0,
        page: currentPage,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      };
    }

    return filterProducts(allProducts, urlFilters, productTypeId, currentPage);
  }, [allProducts, urlFilters, productTypeId, currentPage]);

  return {
    filteredProducts: filteredData.docs,
    totalFilteredDocs: filteredData.totalDocs,
    totalPages: filteredData.totalPages,

    isPending,
    urlFilters,
    handleResetFilters,

    currentPage,
  };
}
