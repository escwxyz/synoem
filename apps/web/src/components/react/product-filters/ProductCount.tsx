"use client";

import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { filteredProductsCountStore } from "~/stores/product-filter";

interface ProductCountProps {
  initialCount?: number;
}

export function ProductCount({ initialCount = 0 }: ProductCountProps) {
  const count = useStore(filteredProductsCountStore);

  const displayCount = count || initialCount;

  useEffect(() => {
    if (initialCount > 0 && (!count || count === 0)) {
      filteredProductsCountStore.set(initialCount);
    }
  }, [initialCount, count]);

  return (
    <div className="text-sm text-muted-foreground">
      Showing {displayCount} products
    </div>
  );
}
