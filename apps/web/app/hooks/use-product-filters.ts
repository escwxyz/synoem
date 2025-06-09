import { useCallback, useMemo, useTransition } from "react";
import { useProductPagination } from "@/app/hooks/use-product-pagination";
import {
  convertMetadataToValues,
  createFilterSchema,
  type PumpControllerFilterValues,
  type SolarPanelFilterValues,
} from "~/utils";
import type {
  PumpControllerFilterMetadata,
  SolarPanelFilterMetadata,
} from "~/types/product-filter-metadata";
import { useQueryStates } from "nuqs";
import { useSidebar } from "~/hooks/useSidebar";
import type { ProductTypeId } from "@synoem/config";
import { useState } from "react";

export const useProductFilters = <T extends ProductTypeId>(
  initialMetadata: SolarPanelFilterMetadata | PumpControllerFilterMetadata | undefined,
  productTypeId: T,
  autoCloseSidebar = true,
): {
  isPending: boolean;
  urlFilters: T extends "solar-panel" ? SolarPanelFilterValues : PumpControllerFilterValues;
  handleResetFilters: () => void;
  handleChangeFilters: (changes: Partial<typeof urlFilters>) => void;
  handleApplyChanges: () => void;
} => {
  const [isPending, startTransition] = useTransition();
  const { setCurrentPage } = useProductPagination();

  if (!initialMetadata) {
    return {
      isPending: false,
      urlFilters: {} as T extends "solar-panel"
        ? SolarPanelFilterValues
        : PumpControllerFilterValues,
      handleResetFilters: () => {},
      handleChangeFilters: () => {},
      handleApplyChanges: () => {},
    };
  }

  const defaultValues = convertMetadataToValues<T>(initialMetadata, productTypeId);

  const filterSchema = createFilterSchema(initialMetadata, productTypeId);

  const [urlFilters, setUrlFilters] = useQueryStates(filterSchema, {
    startTransition,
  });

  const [localFilters, setLocalFilters] = useState<Partial<typeof urlFilters>>(defaultValues);

  const hasChanges = useMemo(() => {
    return JSON.stringify(localFilters) !== JSON.stringify(urlFilters);
  }, [localFilters, urlFilters]);

  const { isMobile, setIsOpen, setOpenMobile } = useSidebar();

  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setIsOpen(false);
    }
  }, [isMobile, setIsOpen, setOpenMobile]);

  const handleChangeFilters = useCallback((changes: Partial<typeof urlFilters>) => {
    setLocalFilters((prev) => ({ ...prev, ...changes }));
  }, []);

  const handleApplyChanges = useCallback(() => {
    if (hasChanges && localFilters) {
      startTransition(() => {
        setUrlFilters(localFilters).then(() => {
          setCurrentPage(1);
        });
      });
    }
  }, [hasChanges, localFilters, setUrlFilters, setCurrentPage]);

  // const handleChangeFilters = useCallback(
  //   (changes: Partial<typeof urlFilters>) => {
  //     if (JSON.stringify(urlFilters) === JSON.stringify(changes)) {

  //       return;
  //     }

  //     startTransition(() => {
  //       setUrlFilters(changes).then(() => {
  //         setCurrentPage(1);
  //       });
  //     });
  //   },
  //   [setUrlFilters, setCurrentPage, urlFilters],
  // );

  const handleResetFilters = useCallback(() => {
    startTransition(() => {
      setLocalFilters(defaultValues);
      setUrlFilters(defaultValues).then(() => {
        setCurrentPage(1);
        if (autoCloseSidebar) {
          closeSidebar();
        }
      });
    });
  }, [setUrlFilters, closeSidebar, autoCloseSidebar, setCurrentPage, defaultValues]);

  return {
    isPending,
    urlFilters: urlFilters as T extends "solar-panel"
      ? SolarPanelFilterValues
      : PumpControllerFilterValues,
    handleResetFilters,
    handleChangeFilters,
    handleApplyChanges,
  };
};
