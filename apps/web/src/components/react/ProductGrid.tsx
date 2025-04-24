"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@synoem/payload/payload-types";
import { ProductCard } from "~/components/react/ProductCard";
import { isSolarPanel } from "~/utils/check-product-type";
import {
  filterMetadataStore,
  cellTypeStore,
  powerMinStore,
  powerMaxStore,
  efficiencyMinStore,
  efficiencyMaxStore,
  // sortStore,
  pageStore,
  initializeFilters,
  syncFiltersToUrl,
  filteredProductsCountStore,
  typeStore,
  // currentMaxStore,
  // currentMinStore,
  voltageMaxStore,
  voltageMinStore,
} from "~/stores/product-filter";
import { useStore } from "@nanostores/react";

import { Sun } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import { Pagination } from "./Pagination";
import {
  PRODUCTS_PER_PAGE,
  PRODUCTS_CACHE_DURATION,
  type Locale,
} from "@synoem/config";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("Failed to access localStorage:", e);
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn("Failed to write to localStorage:", e);
      return false;
    }
  },
};

interface Props {
  initialProducts: Product[];
  totalProducts: number;
  category: Product["category"];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  initialFilters?: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  filterMetadata: Record<string, any>;
  locale: Locale;
}

export const ProductGrid = ({
  initialProducts,
  totalProducts,
  category,
  initialFilters = {},
  filterMetadata,
  locale,
}: Props) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoadingAllProducts, setIsLoadingAllProducts] = useState(false);
  const [hasLoadedAll, setHasLoadedAll] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const metadata = useStore(filterMetadataStore);
  // Solar Panels
  const cellType = useStore(cellTypeStore);
  const powerMin = useStore(powerMinStore);
  const powerMax = useStore(powerMaxStore);
  const efficiencyMin = useStore(efficiencyMinStore);
  const efficiencyMax = useStore(efficiencyMaxStore);
  // Pump Controllers
  const types = useStore(typeStore);
  const voltageMin = useStore(voltageMinStore);
  const voltageMax = useStore(voltageMaxStore);
  // const currentMin = useStore(currentMinStore);
  // const currentMax = useStore(currentMaxStore);

  // const sort = useStore(sortStore);
  const currentPage = useStore(pageStore);

  useEffect(() => {
    setIsClient(true);

    try {
      initializeFilters(initialFilters, filterMetadata);
    } catch (error) {
      console.error("Failed to initialize filters:", error);
      // if (initialFilters.sort) sortStore.set(initialFilters.sort);
      if (initialFilters.page) pageStore.set(Number(initialFilters.page));
    }
  }, [initialFilters, filterMetadata]);

  useEffect(() => {
    if (!isClient) return;

    if (initialProducts.length >= totalProducts) {
      setProducts(initialProducts);
      filteredProductsCountStore.set(initialProducts.length);
      setHasLoadedAll(true);
      return;
    }

    const date = new Date();
    const dateString = date.toISOString();

    const cacheKey = `products-${category}-${dateString}`;
    try {
      const cachedData = safeStorage.getItem(cacheKey);
      const cacheTimestamp = safeStorage.getItem(`${cacheKey}-timestamp`);

      if (cachedData && cacheTimestamp) {
        try {
          const parsedData = JSON.parse(cachedData);
          const timestamp = Number.parseInt(cacheTimestamp);

          if (Date.now() - timestamp < PRODUCTS_CACHE_DURATION) {
            setProducts(parsedData);
            setHasLoadedAll(true);
            return;
          }
        } catch (error) {
          console.error("Failed to parse cached products:", error);
        }
      }
    } catch (error) {
      console.error("Failed to load products from cache:", error);
    }

    setIsLoadingAllProducts(true);

    const timer = setTimeout(async () => {
      try {
        // const response = await fetch(
        //   `/api/products/${category}?limit=500&sort=${sort}`,
        // );

        const response = await fetch(`/api/products/${category}?limit=500`);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);

          try {
            safeStorage.setItem(cacheKey, JSON.stringify(data.products));
            safeStorage.setItem(`${cacheKey}-timestamp`, Date.now().toString());
          } catch (e) {
            console.error("Failed to cache products:", e);
          }
        }
      } catch (error) {
        console.error("Failed to load products:", error);
        setLoadError("Error loading products");
      } finally {
        setIsLoadingAllProducts(false);
        setHasLoadedAll(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [category, initialProducts, totalProducts, isClient]);

  const filteredProducts = useMemo(() => {
    const productsToFilter = hasLoadedAll ? products : initialProducts;
    let filtered = [...productsToFilter];

    try {
      if (category === "solar-panels") {
        if (cellType && cellType.length > 0) {
          filtered = filtered
            .filter((product) => isSolarPanel(product))
            .filter(
              (product) =>
                product.solarPanel?.[0].type &&
                cellType.includes(product.solarPanel?.[0].type),
            );
        }

        if (powerMin !== undefined && powerMax !== undefined) {
          filtered = filtered
            .filter((product) => isSolarPanel(product))
            .filter(
              (product) =>
                product.solarPanel?.[0].power &&
                Number(product.solarPanel?.[0].power.max) >= powerMin &&
                Number(product.solarPanel?.[0].power.min) <= powerMax,
            );
        }

        if (efficiencyMin !== undefined && efficiencyMax !== undefined) {
          filtered = filtered
            .filter((product) => isSolarPanel(product))
            .filter((product) => {
              if (!product.solarPanel?.[0].power?.points?.length) return false;

              return product.solarPanel?.[0].power.points.some(
                (point) =>
                  Number(point.efficiency) >= efficiencyMin &&
                  Number(point.efficiency) <= efficiencyMax,
              );
            });
        }
      } else if (category === "pump-controllers") {
        if (types && types.length > 0) {
          filtered = filtered.filter((product) => {
            if (!product.pumpController?.[0].type) return false;
            return types.includes(product.pumpController?.[0].type);
          });
        }

        if (voltageMin !== undefined && voltageMax !== undefined) {
          filtered = filtered.filter((product) => {
            if (!product.pumpController?.[0].voltageRange) return false;
            return (
              Number(product.pumpController?.[0].voltageRange.max) >=
                voltageMin &&
              Number(product.pumpController?.[0].voltageRange.min) <= voltageMax
            );
          });
        }
      }

      try {
        filteredProductsCountStore.set(filtered.length);
      } catch (error) {
        console.error("Error setting filtered products count:", error);
      }

      // if (sort === "newest") {
      //   filtered.sort((a, b) => {
      //     return (
      //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //     );
      //   });
      // }
    } catch (error) {
      console.error("Error filtering products:", error);
      return productsToFilter;
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
    types,
    voltageMin,
    voltageMax,
    // sort,
    category,
    hasLoadedAll,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

  const currentProducts = useMemo(() => {
    const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const handlePageChange = (page: number) => {
    try {
      pageStore.set(page);
      syncFiltersToUrl();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const url = new URL(window.location.href);
      url.searchParams.set("page", String(page));
      window.history.pushState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetFilters = () => {
    try {
      cellTypeStore.set([]);

      if (metadata?.powerRange) {
        powerMinStore.set(metadata.powerRange.min || 0);
        powerMaxStore.set(metadata.powerRange.max || 1000);
      }

      if (metadata?.efficiencyRange) {
        efficiencyMinStore.set(metadata.efficiencyRange.min || 0);
        efficiencyMaxStore.set(metadata.efficiencyRange.max || 100);
      }

      // sortStore.set("featured");
      pageStore.set(1);

      syncFiltersToUrl();
    } catch (error) {
      window.location.href = window.location.pathname;
    }
  };

  const getSkeletonCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 9;
      if (window.innerWidth >= 640) return 6;
      return 3;
    }
    return 6;
  };

  // TODO
  if (!isLoadingAllProducts && filteredProducts.length === 0 && hasLoadedAll) {
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
      {loadError && (
        <div className="bg-destructive/10 text-destructive rounded-md p-4 mb-4">
          <p>{loadError}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {isLoadingAllProducts
          ? Array.from({ length: getSkeletonCount() }).map((_, index) => (
              <ProductCardSkeleton
                key={`skeleton-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                }`}
              />
            ))
          : currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}

        {!isLoadingAllProducts &&
          currentProducts.length > 0 &&
          currentProducts.length < 3 &&
          Array.from({ length: 3 - (currentProducts.length % 3) }).map(
            (_, index) => (
              <div
                key={`empty-${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  index
                }`}
                className="hidden lg:block"
              />
            ),
          )}
      </div>

      {!isLoadingAllProducts && totalPages > 1 && (
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
