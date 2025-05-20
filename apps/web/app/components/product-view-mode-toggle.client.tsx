"use client";

import { useAtom } from "jotai";
import { productsViewModeAtom } from "~/atoms/products-view-mode";
import { ToggleGroup, ToggleGroupItem } from "@synoem/ui/components/toggle-group";
import { GridIcon, ListIcon } from "lucide-react";
import { cn } from "@synoem/ui/lib/utils";

export const ProductViewModeToggle = () => {
  const [viewMode, setViewMode] = useAtom(productsViewModeAtom);

  const handleViewModeChange = (value: "grid" | "list") => {
    setViewMode(value);
  };

  return (
    <div className="hidden md:block">
      <ToggleGroup
        variant="outline"
        type="single"
        value={viewMode}
        onValueChange={handleViewModeChange}
      >
        <ToggleGroupItem
          value="grid"
          disabled={viewMode === "grid"}
          className={cn(viewMode === "list" && "cursor-pointer")}
        >
          <GridIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="list"
          disabled={viewMode === "list"}
          className={cn(viewMode === "grid" && "cursor-pointer")}
        >
          <ListIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
