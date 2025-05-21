"use client";

// TODO: polish & i18n

import type { Locale, ProductTypeId, ProductTypeToSlugMap } from "@synoem/config";
import { Button } from "@synoem/ui/components/button";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "~/components/sidebar.client";
import { cn } from "@synoem/ui/lib/utils";
import { useProductFilters } from "@/app/hooks/use-product-filters";
import type {
  SolarPanelFilterMetadata,
  PumpControllerFilterMetadata,
} from "~/types/product-filter-metadata";
import dynamic from "next/dynamic";
import { Skeleton } from "@synoem/ui/components/skeleton";
import { Suspense, use } from "react";
import { useSearchParams } from "next/navigation";
import { buildProductFilterMetadata } from "~/utils/build-filter-metadata";
import type { APIResponse } from "~/types/api-response";
import type { DataFromCollectionSlug, PaginatedDocs } from "@synoem/payload/types";

const SolarPanelFilters = dynamic(
  () => import("./solar-panel-filters.client").then((mod) => mod.SolarPanelFilters),
  { ssr: false, loading: () => <FiltersSkeleton /> },
);

const PumpControllerFilters = dynamic(
  () => import("./pump-controller-filters.client").then((mod) => mod.PumpControllerFilters),
  { ssr: false, loading: () => <FiltersSkeleton /> },
);

type Props<T extends ProductTypeId> = {
  productTypeId: T;
  locale: Locale;
  filterMetadataPromise: Promise<
    APIResponse<PaginatedDocs<DataFromCollectionSlug<ProductTypeToSlugMap[T]>>>
  >;
} & React.ComponentProps<typeof Sidebar>;

export const ProductFiltersSidebar = <T extends ProductTypeId>({
  productTypeId,
  locale,
  className,
  filterMetadataPromise,
  ...props
}: Props<T>) => {
  const filterMetadataResponse = use(filterMetadataPromise);

  if (filterMetadataResponse.status === "error") {
    return <div>Something went wrong fetching filter metadata</div>;
  }

  const filterMetadata = buildProductFilterMetadata<T>(
    filterMetadataResponse.data?.docs || [],
    productTypeId,
  );

  // @ts-expect-error
  const { isPending, handleResetFilters } = useProductFilters(filterMetadata, productTypeId);

  const isDirty = useSearchParams().size > 0;

  return (
    <Sidebar
      className={cn("top-(--header-height) h-[calc(100svh-var(--header-height))]!", className)}
      {...props}
    >
      <SidebarHeader>Product Filters</SidebarHeader>
      <SidebarContent className="p-4 md:p-6">
        <div className="space-y-6">
          <Suspense fallback={<FiltersSkeleton />}>
            {productTypeId === "solar-panel" && (
              <SolarPanelFilters {...(filterMetadata as SolarPanelFilterMetadata)} />
            )}
            {productTypeId === "pump-controller" && (
              <PumpControllerFilters {...(filterMetadata as PumpControllerFilterMetadata)} />
            )}
          </Suspense>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="outline"
          disabled={!isDirty || isPending}
          onClick={() => {
            handleResetFilters();
          }}
          className="flex-1"
        >
          Reset
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

function FiltersSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
