"use client";

import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@synoem/ui/components/dropdown-menu";
import { useUrlState } from "~/hooks/use-url-state";
import { ProductCount } from "./ProductCount";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@synoem/ui/components/drawer";

interface ProductFiltersBarProps {
  initialFilters?: Record<string, string | string[] | number | undefined>;
  children?: React.ReactNode;
  totalProducts: number;
}

// Desktop sort and Mobile filters
export function ProductFiltersBar({
  children,
  initialFilters,
  totalProducts,
}: ProductFiltersBarProps) {
  const [sort, setSort] = useUrlState(
    "sort",
    initialFilters?.sort || "featured",
  );

  const resetFilters = () => {
    window.history.pushState({}, "", window.location.pathname);
    window.location.reload();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Drawer modal={false}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Filter products by specs and more.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">{children}</div>
              <DrawerFooter className="flex w-full">
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* TODO: sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Sort
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuLabel>Sorting</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sort === "featured"}
                onCheckedChange={() => setSort("featured")}
              >
                Featured
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sort === "newest"}
                onCheckedChange={() => setSort("newest")}
              >
                Newest
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ProductCount initialCount={totalProducts} />
      </div>
    </div>
  );
}
