"use client";

import { useMemo } from "react";
import type { Product } from "~/types/product";
import { ProductCard } from "~/components/react/ProductCard";
import { isPumpController, isSolarPanel } from "~/utils/check-product-type";
import { useMultiUrlState } from "~/hooks/use-url-state";

interface Props {
  products: Product[];
  category: "solar-panels" | "pump-controllers";
}

export const ProductGrid = ({ products, category }: Props) => {
  const [solarFilters, setSolarFilters] = useMultiUrlState(
    {
      cell: "",
      minPower: 0,
      maxPower: 0,
      minEfficiency: 0,
      maxEfficiency: 0,
    },
    {
      minPower: (v) => Number.parseFloat(v),
      maxPower: (v) => Number.parseFloat(v),
      minEfficiency: (v) => Number.parseFloat(v),
      maxEfficiency: (v) => Number.parseFloat(v),
    },
  );

  const [pumpFilters, setPumpFilters] = useMultiUrlState(
    {
      type: "",
      minVoltage: 0,
      maxVoltage: 0,
      minCurrent: 0,
      maxCurrent: 0,
    },
    {
      minVoltage: (v) => Number.parseFloat(v),
      maxVoltage: (v) => Number.parseFloat(v),
      minCurrent: (v) => Number.parseFloat(v),
      maxCurrent: (v) => Number.parseFloat(v),
    },
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (category === "solar-panels" && isSolarPanel(product)) {
        if (solarFilters.cell && product.cell?.type !== solarFilters.cell) {
          return false;
        }
      } else if (category === "pump-controllers" && isPumpController(product)) {
        if (pumpFilters.type && product.type !== pumpFilters.type) {
          return false;
        }
      }

      return true;
    });
  }, [products, category, solarFilters, pumpFilters]);

  if (filteredProducts.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-sm text-muted-foreground mb-6">
        Showing <span className="font-medium">{filteredProducts.length}</span>{" "}
        results
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="transform transition duration-300 hover:translate-y-[-5px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};
