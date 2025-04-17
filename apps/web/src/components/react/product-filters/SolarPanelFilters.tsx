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
} from "~/stores/product-filter";
import { Label } from "@synoem/ui/components/label";
import { Checkbox } from "@synoem/ui/components/checkbox";
import { Slider } from "@synoem/ui/components/slider";
import { useEffect } from "react";

interface SolarPanelFiltersProps {
  filterMetadata: FilterMetadata; // to avoid hydration error
  initialFilters?: Record<string, string | string[] | number | undefined>;
}

export function SolarPanelFilters({
  filterMetadata,
  initialFilters = {},
}: SolarPanelFiltersProps) {
  useEffect(() => {
    initializeFilters(initialFilters, filterMetadata);

    const handlePopState = () => {
      syncFiltersFromUrl();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [filterMetadata, initialFilters]);

  const metadata = useStore(filterMetadataStore);
  const cellType = useStore(cellTypeStore);
  const powerMin = useStore(powerMinStore);
  const powerMax = useStore(powerMaxStore);
  const efficiencyMin = useStore(efficiencyMinStore);
  const efficiencyMax = useStore(efficiencyMaxStore);

  const effectiveMetadata = metadata || filterMetadata;

  const cellTypes = effectiveMetadata?.cellTypes || [];

  const toggleCellType = (type: string) => {
    const currentTypes = [...cellType];

    if (currentTypes.includes(type)) {
      cellTypeStore.set(currentTypes.filter((t) => t !== type));
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

  return (
    <div className="space-y-6">
      {cellTypes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Cell Type</h3>
          <div className="space-y-2">
            {cellTypes.map((type) => (
              <Label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={cellType.includes(type)}
                  onCheckedChange={() => toggleCellType(type)}
                />
                {type.toUpperCase()}
              </Label>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Power Range</h3>
          <span className="text-xs text-muted-foreground">
            {powerMin}W - {powerMax}W
          </span>
        </div>

        <div className="px-2">
          <Slider
            defaultValue={[powerMin, powerMax]}
            min={metadata?.powerRange?.min || 0}
            max={metadata?.powerRange?.max || 1000}
            step={5}
            value={[powerMin, powerMax]}
            onValueChange={handlePowerRangeChange}
            className="h-4"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Efficiency Range</h3>
          <span className="text-xs text-muted-foreground">
            {efficiencyMin}% - {efficiencyMax}%
          </span>
        </div>

        <div className="px-2">
          <Slider
            min={metadata?.efficiencyRange?.min || 0}
            max={metadata?.efficiencyRange?.max || 100}
            step={0.5}
            value={[efficiencyMin, efficiencyMax]}
            onValueChange={handleEfficiencyRangeChange}
            className="h-4"
          />
        </div>
      </div>
    </div>
  );
}
