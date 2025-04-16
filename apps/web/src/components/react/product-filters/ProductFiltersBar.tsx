// TODO

"use client";

import { useState } from "react";
import { useUrlState } from "~/hooks/use-url-state";
import { Button } from "@synoem/ui/components/button";
import { Filter, X } from "lucide-react";

interface Props {
  totalProducts?: number;
}

export const ProductFiltersBar = ({ totalProducts = 0 }: Props) => {
  const [sort, setSort] = useUrlState("sort", "relevance");

  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
    if (!filtersOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Button
          onClick={toggleFilters}
          className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-md"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>

        {totalProducts > 0 && (
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{totalProducts}</span> results
          </p>
        )}
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 lg:hidden">
          <div className="h-full w-[80vw] max-w-sm bg-white p-6 shadow-lg overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button onClick={toggleFilters} className="text-gray-500">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <slot />
          </div>
        </div>
      )}
    </>
  );
};
