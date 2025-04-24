"use client";

import { useStore } from "@nanostores/react";
import {
  filterMetadataStore,
  type FilterMetadata,
  cellTypeStore,
  powerMinStore,
  powerMaxStore,
  efficiencyMinStore,
  efficiencyMaxStore,
  syncFiltersToUrl,
  initializeFilters,
  syncFiltersFromUrl,
  typeStore,
  voltageMaxStore,
  voltageMinStore,
} from "~/stores/product-filter";
import { Label } from "@synoem/ui/components/label";
import { Slider } from "@synoem/ui/components/slider";
import { useEffect, useRef } from "react";
import { Switch } from "@synoem/ui/components/switch";
import type { Product } from "@synoem/payload/payload-types";
import type { Locale } from "@synoem/config";
import { useTranslations } from "~/i18n/utils";

interface ProductFiltersProps {
  filterMetadata: FilterMetadata;
  initialFilters?: Record<string, string | string[] | number | undefined>;
  productCategory: Product["category"];
  locale: Locale;
}

export const ProductFilters = ({
  filterMetadata,
  initialFilters = {},
  productCategory,
  locale,
}: ProductFiltersProps) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    let processedInitialFilters = { ...initialFilters };

    if (productCategory === "solar-panels") {
      const availableCellTypes = filterMetadata?.cellTypes || [];

      if (
        !processedInitialFilters.cellType ||
        !Array.isArray(processedInitialFilters.cellType) ||
        processedInitialFilters.cellType.length === 0
      ) {
        processedInitialFilters = {
          ...processedInitialFilters,
          cellType: availableCellTypes,
        };
      }
    } else if (productCategory === "pump-controllers") {
      const availableTypes = filterMetadata?.types || [];

      if (
        !processedInitialFilters.type ||
        !Array.isArray(processedInitialFilters.type) ||
        processedInitialFilters.type.length === 0
      ) {
        processedInitialFilters = {
          ...processedInitialFilters,
          type: availableTypes,
        };
      }
    }

    initializeFilters(processedInitialFilters, filterMetadata);

    const handlePopState = () => {
      syncFiltersFromUrl();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [filterMetadata, initialFilters, productCategory]);

  const metadata = useStore(filterMetadataStore);
  // Solar Panel
  const cellType = useStore(cellTypeStore);

  const powerMin = useStore(powerMinStore);
  const powerMax = useStore(powerMaxStore);
  const efficiencyMin = useStore(efficiencyMinStore);
  const efficiencyMax = useStore(efficiencyMaxStore);

  // Pump Controller
  const type = useStore(typeStore);
  const voltageMin = useStore(voltageMinStore);
  const voltageMax = useStore(voltageMaxStore);

  const effectiveMetadata = metadata || filterMetadata;
  const cellTypes = effectiveMetadata?.cellTypes || [];
  const types = effectiveMetadata?.types || [];

  const toggleType = (type: string) => {
    const currentTypes = [...type];

    if (currentTypes.includes(type)) {
      if (currentTypes.length > 1) {
        typeStore.set(currentTypes.filter((t) => t !== type));
      }
    } else {
      typeStore.set([...currentTypes, type]);
    }

    syncFiltersToUrl();
  };

  const toggleCellType = (type: string) => {
    const currentTypes = [...cellType];

    if (currentTypes.includes(type)) {
      if (currentTypes.length > 1) {
        cellTypeStore.set(currentTypes.filter((t) => t !== type));
      }
    } else {
      cellTypeStore.set([...currentTypes, type]);
    }

    syncFiltersToUrl();
  };

  const handlePowerRangeChange = (values: number[]) => {
    if (values.length >= 2) {
      powerMinStore.set(values[0]);
      powerMaxStore.set(values[1]);
      syncFiltersToUrl();
    }
  };

  const handleEfficiencyRangeChange = (values: number[]) => {
    if (values.length >= 2) {
      efficiencyMinStore.set(values[0]);
      efficiencyMaxStore.set(values[1]);
      syncFiltersToUrl();
    }
  };

  const handleVoltageRangeChange = (values: number[]) => {
    if (values.length >= 2) {
      voltageMinStore.set(values[0]);
      voltageMaxStore.set(values[1]);
      syncFiltersToUrl();
    }
  };

  const { t } = useTranslations(locale);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          {productCategory === "solar-panels" ? (
            <h3 className="text-sm font-medium">
              {t("Component.ProductFilters.cellType")}
            </h3>
          ) : (
            <h3 className="text-sm font-medium">
              {t("Component.ProductFilters.type")}
            </h3>
          )}
        </div>
        <div className="space-y-2">
          {productCategory === "solar-panels" && cellTypes.length > 0 && (
            <div className="space-y-2">
              {cellTypes.map((type) => (
                <Label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Switch
                    checked={cellType.includes(type)}
                    onCheckedChange={() => toggleCellType(type)}
                  />
                  {type.toUpperCase()}
                </Label>
              ))}
            </div>
          )}
          {productCategory === "pump-controllers" && types.length > 0 && (
            <div className="space-y-2">
              {types.map((t) => (
                <Label
                  key={t}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Switch
                    checked={type.includes(t)}
                    onCheckedChange={() => toggleType(t)}
                  />
                  {t.toUpperCase()}
                </Label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          {productCategory === "solar-panels" ? (
            <h3 className="text-sm font-medium">
              {t("Component.ProductFilters.powerRange")}
            </h3>
          ) : (
            <h3 className="text-sm font-medium">
              {t("Component.ProductFilters.voltageRange")}
            </h3>
          )}
          <span className="text-xs text-muted-foreground">
            {productCategory === "solar-panels"
              ? `${powerMin}W ~ ${powerMax}W`
              : `${voltageMin}V ~ ${voltageMax}V`}
          </span>
        </div>

        <div className="px-2">
          <Slider
            defaultValue={[
              productCategory === "solar-panels" ? powerMin : voltageMin,
              productCategory === "solar-panels" ? powerMax : voltageMax,
            ]}
            min={
              productCategory === "solar-panels"
                ? metadata?.powerRange?.min || 0
                : metadata?.voltageRange?.min || 0
            }
            max={
              productCategory === "solar-panels"
                ? metadata?.powerRange?.max || 1000
                : metadata?.voltageRange?.max || 1000
            }
            step={5}
            value={[
              productCategory === "solar-panels" ? powerMin : voltageMin,
              productCategory === "solar-panels" ? powerMax : voltageMax,
            ]}
            onValueChange={
              productCategory === "solar-panels"
                ? handlePowerRangeChange
                : handleVoltageRangeChange
            }
          />
        </div>
      </div>

      {productCategory === "solar-panels" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              {t("Component.ProductFilters.efficiencyRange")}
            </h3>
            <span className="text-xs text-muted-foreground">
              {`${efficiencyMin}% ~ ${efficiencyMax}%`}
            </span>
          </div>

          <div className="px-2">
            <Slider
              min={metadata?.efficiencyRange?.min || 0}
              max={metadata?.efficiencyRange?.max || 100}
              step={0.5}
              value={[efficiencyMin, efficiencyMax]}
              onValueChange={handleEfficiencyRangeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};
