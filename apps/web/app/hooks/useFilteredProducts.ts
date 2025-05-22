import { useMemo } from "react";
import { PRODUCTS_PER_PAGE, type ProductTypeId, type ProductTypeToSlugMap } from "@synoem/config";
import type { DataFromCollectionSlug } from "@synoem/payload/types";
import { useProductPagination } from "./use-product-pagination";
import { useProductFilters } from "./use-product-filters";
import {
  filterProducts,
  type PumpControllerFilterValues,
  type SolarPanelFilterValues,
} from "~/utils";
import type {
  SolarPanelFilterMetadata,
  PumpControllerFilterMetadata,
} from "~/types/product-filter-metadata";

interface UseFilteredProductsProps<T extends ProductTypeId> {
  allProducts: DataFromCollectionSlug<ProductTypeToSlugMap[T]>[];
  productTypeId: T;
  filterMetadata: SolarPanelFilterMetadata | PumpControllerFilterMetadata | undefined;
}

export function useFilteredProducts<T extends ProductTypeId>({
  allProducts,
  productTypeId,
  filterMetadata,
}: UseFilteredProductsProps<T>) {
  if (!filterMetadata) {
    return {
      filteredProducts: [],
      totalFilteredDocs: 0,
      totalPages: 0,
      isPending: false,
      urlFilters: {} as T extends "solar-panel"
        ? SolarPanelFilterValues
        : PumpControllerFilterValues,
      handleResetFilters: () => {},
    };
  }

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
