"use client";

import { useState } from "react";
import { useMultiUrlState } from "~/hooks/use-url-state";
import { Button } from "@synoem/ui/components/button";
import { filterMetadataStore } from "~/stores/product-filter";
import { useStore } from "@nanostores/react";

export const SolarPanelFilters = () => {
  const metadata = useStore(filterMetadataStore);

  const [filters, setFilters] = useMultiUrlState(
    {
      cell: "",
      minPower: 0,
      maxPower: 0,
      minEfficiency: 0,
      maxEfficiency: 0,
    },
    {
      minPower: (v) => Number.parseFloat(v),
      maxPower: (v) => Number.parseFloat(v),
      minEfficiency: (v) => Number.parseFloat(v),
      maxEfficiency: (v) => Number.parseFloat(v),
    },
  );

  const [expanded, setExpanded] = useState({
    cell: true,
    power: true,
    efficiency: true,
  });

  const clearFilters = () => {
    setFilters({
      cell: "",
      minPower: 0,
      maxPower: 0,
      minEfficiency: 0,
      maxEfficiency: 0,
    });
  };

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        <Button
          onClick={clearFilters}
          className="text-sm text-primary hover:underline"
        >
          Clear all
        </Button>
      </div>

      <div className="space-y-4">
        {metadata?.cellTypes && metadata.cellTypes.length > 0 && (
          <div className="border-b pb-4">
            <Button
              className="flex justify-between items-center mb-2 cursor-pointer"
              onClick={() => toggleSection("cell")}
            >
              <h4 className="font-medium">Cell Technology</h4>
              <div>{expanded.cell ? "−" : "+"}</div>
            </Button>

            {expanded.cell && (
              <div className="space-y-2">
                {metadata.cellTypes.map((cell) => (
                  <label key={cell} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="cell"
                      value={cell}
                      checked={filters.cell === cell}
                      onChange={() => setFilters({ ...filters, cell })}
                    />
                    <span>{cell}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cell"
                    value=""
                    checked={!filters.cell}
                    onChange={() => setFilters({ ...filters, cell: "" })}
                  />
                  <span>All Technologies</span>
                </label>
              </div>
            )}
          </div>
        )}

        <div className="border-b pb-4">
          <Button
            className="flex justify-between items-center mb-2 cursor-pointer"
            onClick={() => toggleSection("power")}
          >
            <h4 className="font-medium">Power Range (W)</h4>
            <div>{expanded.power ? "−" : "+"}</div>
          </Button>

          {expanded.power && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPower || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minPower: e.target.value
                        ? Number.parseFloat(e.target.value)
                        : 0,
                    })
                  }
                  className="w-full border p-2 rounded-md"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPower || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxPower: e.target.value
                        ? Number.parseFloat(e.target.value)
                        : 0,
                    })
                  }
                  className="w-full border p-2 rounded-md"
                />
              </div>

              {metadata?.powerRange && (
                <div className="px-1">
                  <input
                    type="range"
                    min={metadata.powerRange.min}
                    max={metadata.powerRange.max}
                    step={
                      (metadata.powerRange.max - metadata.powerRange.min) / 20
                    }
                    value={filters.maxPower || metadata.powerRange.max}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        maxPower: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{metadata.powerRange.min}W</span>
                    <span>{metadata.powerRange.max}W</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-b pb-4">
          <Button
            className="flex justify-between items-center mb-2 cursor-pointer"
            onClick={() => toggleSection("efficiency")}
          >
            <h4 className="font-medium">Efficiency (%)</h4>
            <div>{expanded.efficiency ? "−" : "+"}</div>
          </Button>

          {expanded.efficiency && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minEfficiency || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minEfficiency: e.target.value
                        ? Number.parseFloat(e.target.value)
                        : 0,
                    })
                  }
                  className="w-full border p-2 rounded-md"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxEfficiency || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxEfficiency: e.target.value
                        ? Number.parseFloat(e.target.value)
                        : 0,
                    })
                  }
                  className="w-full border p-2 rounded-md"
                />
              </div>

              {metadata?.efficiencyRange && (
                <div className="px-1">
                  <input
                    type="range"
                    min={metadata.efficiencyRange.min}
                    max={metadata.efficiencyRange.max}
                    step={
                      (metadata.efficiencyRange.max -
                        metadata.efficiencyRange.min) /
                      20
                    }
                    value={
                      filters.maxEfficiency || metadata.efficiencyRange.max
                    }
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        maxEfficiency: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{metadata.efficiencyRange.min}%</span>
                    <span>{metadata.efficiencyRange.max}%</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
