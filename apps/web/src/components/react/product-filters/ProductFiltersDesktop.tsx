"use client";

import { Button } from "@synoem/ui/components/button";

export const ProductFiltersDesktop = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const resetFilters = () => {
    window.location.href = window.location.pathname;
  };

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset
        </Button>
      </div>
      {children}
    </aside>
  );
};
