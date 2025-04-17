"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "~/types/product";
import { ProductCard } from "~/components/react/ProductCard";
import { isSolarPanel } from "~/utils/check-product-type";
import {
  filterMetadataStore,
  cellTypeStore,
  powerMinStore,
  powerMaxStore,
  efficiencyMinStore,
  efficiencyMaxStore,
  sortStore,
  pageStore,
  initializeFilters,
  syncFiltersToUrl,
  filteredProductsCountStore,
} from "~/stores/product-filter";
import { useStore } from "@nanostores/react";

import { Sun, Loader2 } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import { Pagination } from "./Pagination";
import {
  type ProductCategoryPluralSlug,
  PRODUCTS_PER_PAGE,
  PRODUCTS_CACHE_DURATION,
} from "@synoem/config";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface Props {
  initialProducts: Product[];
  totalProducts: number;
  category: ProductCategoryPluralSlug;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  initialFilters?: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  filterMetadata: Record<string, any>;
}

export const ProductGrid = ({
  initialProducts,
  totalProducts,
  category,
  initialFilters = {},
  filterMetadata,
}: Props) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(false);
  const [hasLoadedAll, setHasLoadedAll] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const metadata = useStore(filterMetadataStore);
  const cellType = useStore(cellTypeStore);
  const powerMin = useStore(powerMinStore);
  const powerMax = useStore(powerMaxStore);
  const efficiencyMin = useStore(efficiencyMinStore);
  const efficiencyMax = useStore(efficiencyMaxStore);
  const sort = useStore(sortStore);
  const currentPage = useStore(pageStore);

  useEffect(() => {
    initializeFilters(initialFilters, filterMetadata);
  }, [initialFilters, filterMetadata]);

  useEffect(() => {
    if (initialProducts.length >= totalProducts) {
      setProducts(initialProducts);
      filteredProductsCountStore.set(initialProducts.length);
      setHasLoadedAll(true);
      return;
    }

    const cacheKey = `products-${category}-${sort}`;
    try {
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

      if (cachedData && cacheTimestamp) {
        const parsedData = JSON.parse(cachedData);
        const timestamp = Number.parseInt(cacheTimestamp);

        if (Date.now() - timestamp < PRODUCTS_CACHE_DURATION) {
          setProducts(parsedData);
          setHasLoadedAll(true);
          return;
        }
      }
    } catch (error) {
      console.error("Failed to load products from cache:", error);
    }

    const loadAllProducts = async () => {
      try {
        setIsLoadingAllProducts(true);
        setLoadError(null);

        const response = await fetch(
          `/api/products/${category}?limit=500&sort=${sort}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        const allProducts = data.products;

        if (allProducts && Array.isArray(allProducts)) {
          setProducts(allProducts);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(allProducts));
            localStorage.setItem(
              `${cacheKey}-timestamp`,
              Date.now().toString(),
            );
          } catch (e) {
            console.error("Failed to cache products:", e);
          }
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        setLoadError("无法加载完整产品列表，请尝试刷新页面");
      } finally {
        setIsLoadingAllProducts(false);
        setHasLoadedAll(true);
      }
    };

    const timer = setTimeout(() => {
      loadAllProducts();
    }, 1000);

    return () => clearTimeout(timer);
  }, [category, initialProducts, totalProducts, sort]);

  const filteredProducts = useMemo(() => {
    const productsToFilter = hasLoadedAll ? products : initialProducts;

    let filtered = [...productsToFilter];

    if (category === "solar-panels") {
      if (cellType && cellType.length > 0) {
        filtered = filtered
          .filter((product) => isSolarPanel(product))
          .filter(
            (product) => product.cell && cellType.includes(product.cell.type),
          );
      }

      if (powerMin !== undefined && powerMax !== undefined) {
        filtered = filtered
          .filter((product) => isSolarPanel(product))
          .filter(
            (product) =>
              product.powerRange &&
              Number(product.powerRange.max) >= powerMin &&
              Number(product.powerRange.min) <= powerMax,
          );
      }

      if (efficiencyMin !== undefined && efficiencyMax !== undefined) {
        filtered = filtered
          .filter((product) => isSolarPanel(product))
          .filter((product) => {
            if (!product.powerRange?.points?.length) return false;

            return product.powerRange.points.some(
              (point) =>
                Number(point.efficiency) >= efficiencyMin &&
                Number(point.efficiency) <= efficiencyMax,
            );
          });
      }
    } else if (category === "pump-controllers") {
      // TODO: pump-controllers
      // ...
    }

    filteredProductsCountStore.set(filtered.length);

    // TODO: sort
    if (sort === "newest") {
      filtered.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    return filtered;
  }, [
    products,
    initialProducts,
    cellType,
    powerMin,
    powerMax,
    efficiencyMin,
    efficiencyMax,
    sort,
    category,
    hasLoadedAll,
  ]);

  useEffect(() => {
    if (initialProducts?.length) {
      filteredProductsCountStore.set(initialProducts.length);
    }
  }, [initialProducts]);

  useEffect(() => {
    if (filteredProducts?.length) {
      filteredProductsCountStore.set(filteredProducts.length);
    }
  }, [filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    pageStore.set(page);
    syncFiltersToUrl();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilters = () => {
    cellTypeStore.set([]);

    if (metadata?.powerRange) {
      powerMinStore.set(metadata.powerRange.min || 0);
      powerMaxStore.set(metadata.powerRange.max || 1000);
    }

    if (metadata?.efficiencyRange) {
      efficiencyMinStore.set(metadata.efficiencyRange.min || 0);
      efficiencyMaxStore.set(metadata.efficiencyRange.max || 100);
    }

    sortStore.set("featured");
    pageStore.set(1);

    syncFiltersToUrl();
  };

  if (filteredProducts.length === 0) {
    // TODO
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Sun className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">
          Please try adjusting your filters.
        </p>
        <Button onClick={resetFilters}>Reset filters</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {/* TODO: error */}
        {loadError && (
          <div className="bg-destructive/10 text-destructive rounded-md p-2 text-sm">
            {loadError}
          </div>
        )}
        {isLoadingAllProducts &&
          Array.from({ length: 6 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <ProductCardSkeleton key={index} />
          ))}

        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} category={category} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
