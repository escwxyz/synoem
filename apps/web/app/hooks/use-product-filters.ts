import { useCallback, useTransition } from "react";
import { useProductPagination } from "@/app/hooks/use-product-pagination";
import {
  convertMetadataToValues,
  createFilterSchema,
  type PumpControllerFilterValues,
  type SolarPanelFilterValues,
} from "~/utils";
import type { PumpControllerFilterMetadata, SolarPanelFilterMetadata } from "@synoem/api";
import { useQueryStates } from "nuqs";
import { useSidebar } from "~/hooks/useSidebar";
import type { ProductTypeId } from "@synoem/config";

export const useProductFilters = <T extends ProductTypeId>(
  initialMetadata: T extends "solar-panel"
    ? SolarPanelFilterMetadata
    : PumpControllerFilterMetadata,
  productTypeId: T,
  autoCloseSidebar = true,
): {
  isPending: boolean;
  urlFilters: T extends "solar-panel" ? SolarPanelFilterValues : PumpControllerFilterValues;
  handleResetFilters: () => void;
  handleChangeFilters: (changes: Partial<typeof urlFilters>) => void;
} => {
  const [isPending, startTransition] = useTransition();
  const { setCurrentPage } = useProductPagination();

  const filterSchema = createFilterSchema(initialMetadata, productTypeId);

  const [urlFilters, setUrlFilters] = useQueryStates(filterSchema, {
    startTransition,
  });

  const { isMobile, setIsOpen, setOpenMobile } = useSidebar();

  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setIsOpen(false);
    }
  }, [isMobile, setIsOpen, setOpenMobile]);

  const handleChangeFilters = useCallback(
    (changes: Partial<typeof urlFilters>) => {
      if (JSON.stringify(urlFilters) === JSON.stringify(changes)) {
        return;
      }

      startTransition(() => {
        setUrlFilters(changes).then(() => {
          setCurrentPage(1);
        });
      });
    },
    [setUrlFilters, setCurrentPage, urlFilters],
  );

  const handleResetFilters = useCallback(() => {
    const defaultValues = convertMetadataToValues<T>(initialMetadata, productTypeId);

    startTransition(() => {
      setUrlFilters(defaultValues).then(() => {
        setCurrentPage(1);
        if (autoCloseSidebar) {
          closeSidebar();
        }
      });
    });
  }, [
    setUrlFilters,
    closeSidebar,
    autoCloseSidebar,
    setCurrentPage,
    initialMetadata,
    productTypeId,
  ]);

  return {
    isPending,
    urlFilters: urlFilters as T extends "solar-panel"
      ? SolarPanelFilterValues
      : PumpControllerFilterValues,
    handleResetFilters,
    handleChangeFilters,
  };
};
