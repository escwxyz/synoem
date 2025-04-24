"use client";

import { Filter } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
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
import type { Locale } from "@synoem/config";
import { useTranslations } from "~/i18n/utils";

interface ProductFiltersBarProps {
  initialFilters?: Record<string, string | string[] | number | undefined>;
  children?: React.ReactNode;
  totalProducts: number;
  locale: Locale;
}

// Desktop sort and Mobile filters
export function ProductFiltersBar({
  children,
  // initialFilters,
  totalProducts,
  locale,
}: ProductFiltersBarProps) {
  const { t } = useTranslations(locale);
  // const [sort, setSort] = useUrlState(
  //   "sort",
  //   initialFilters?.sort || "featured",
  // );

  const resetFilters = () => {
    window.history.pushState({}, "", window.location.pathname);
    window.location.reload();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex justify-between items-center gap-2 w-full">
          {/**
           * NOTE: AutoFocus is related to the issue https://github.com/emilkowalski/vaul/issues/517
           */}
          <Drawer modal={false} autoFocus>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Filter className="h-4 w-4" />
                {t("Component.ProductFiltersBar.filters")}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  {t("Component.ProductFiltersBar.filters")}
                </DrawerTitle>
                <DrawerDescription>
                  {t("Component.ProductFiltersBar.description")}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">{children}</div>
              <DrawerFooter className="flex w-full">
                <Button variant="outline" onClick={resetFilters}>
                  {t("Component.ProductFiltersBar.reset")}
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* TODO: sort / native select on mobile */}
          {/* <DropdownMenu>
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
          </DropdownMenu> */}
        </div>

        <ProductCount initialCount={totalProducts} />
      </div>
    </div>
  );
}
