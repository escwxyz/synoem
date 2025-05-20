"use client";

import { Button } from "@synoem/ui/components/button";
import { FilterIcon } from "lucide-react";
import { useSidebar } from "~/hooks/useSidebar";

export const ProductFiltersToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
      <FilterIcon />
    </Button>
  );
};
