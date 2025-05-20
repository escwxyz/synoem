"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useProductFilters } from "@/app/hooks/use-product-filters";
import type { SolarPanelFilterMetadata } from "@synoem/api";
import { Label } from "@synoem/ui/components/label";
import { Switch } from "@synoem/ui/components/switch";
import { Slider } from "@synoem/ui/components/slider";

export const SolarPanelFilters = (filterMetadata: SolarPanelFilterMetadata) => {
  const { urlFilters, handleChangeFilters } = useProductFilters(filterMetadata, "solar-panel");

  const t = useTranslations("Component");

  const params = useParams();

  const slug = Array.isArray(params.category) ? params.category : [params.category].filter(Boolean);

  const isSubCategory = slug.length > 0;

  return (
    <>
      {!isSubCategory && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">{t("ProductFilters.cellType")}</h3>
          </div>
          <div className="space-y-2">
            {Array.isArray(urlFilters.types) && (
              <div className="space-y-2">
                {filterMetadata.types.map((type) => (
                  <Label key={type} className="flex items-center gap-2 cursor-pointer">
                    <Switch
                      checked={urlFilters.types?.includes(type) || false}
                      onCheckedChange={() => {
                        handleChangeFilters({
                          types: urlFilters.types?.includes(type)
                            ? urlFilters.types.filter((t) => t !== type)
                            : [...(urlFilters.types || []), type],
                        });
                      }}
                    />
                    {type.toUpperCase()}
                  </Label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">{t("ProductFilters.powerRange")}</h3>
          <span className="text-xs text-muted-foreground">
            {`${urlFilters.powerMin}W ~ ${urlFilters.powerMax}W`}
          </span>
        </div>
        <div className="space-y-2">
          <Slider
            min={filterMetadata.powerRange.min}
            max={filterMetadata.powerRange.max}
            value={[urlFilters.powerMin || 0, urlFilters.powerMax || 0]}
            onValueChange={(value) =>
              handleChangeFilters({ powerMin: value[0], powerMax: value[1] })
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="">
          <h3 className="text-sm font-medium">{t("ProductFilters.efficiencyRange")}</h3>
          <span className="text-xs text-muted-foreground">
            {`${urlFilters.efficiencyMin.toFixed(1)}% ~ ${urlFilters.efficiencyMax.toFixed(1)}%`}
          </span>
        </div>

        <div className="px-2">
          <Slider
            min={filterMetadata.efficiencyRange.min}
            max={filterMetadata.efficiencyRange.max}
            step={0.05}
            value={[urlFilters.efficiencyMin, urlFilters.efficiencyMax]}
            onValueChange={(value) =>
              handleChangeFilters({
                efficiencyMin: value[0],
                efficiencyMax: value[1],
              })
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Glass Type</h3>
        </div>
        <div className="space-y-2">
          {Array.isArray(urlFilters.glassTypes) && (
            <div className="space-y-2">
              {filterMetadata.glassTypes.map((type) => (
                <Label key={type} className="flex items-center gap-2 cursor-pointer">
                  <Switch
                    checked={urlFilters.glassTypes?.includes(type) || false}
                    onCheckedChange={() => {
                      handleChangeFilters({
                        glassTypes: urlFilters.glassTypes?.includes(type)
                          ? urlFilters.glassTypes.filter((t) => t !== type)
                          : [...(urlFilters.glassTypes || []), type],
                      });
                    }}
                  />
                  {type.toUpperCase()}
                </Label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="">
          <h3 className="text-sm font-medium">Dimensions</h3>
          <span className="text-xs text-muted-foreground">
            {`${urlFilters.dimensionsMin.toFixed(2)}m² ~ ${urlFilters.dimensionsMax.toFixed(2)}m²`}
          </span>
        </div>

        <div className="px-2">
          <Slider
            min={filterMetadata.dimensionsRange.minArea}
            max={filterMetadata.dimensionsRange.maxArea}
            step={0.05}
            value={[urlFilters.dimensionsMin, urlFilters.dimensionsMax]}
            onValueChange={(value) =>
              handleChangeFilters({
                dimensionsMin: value[0],
                dimensionsMax: value[1],
              })
            }
          />
        </div>
      </div>
    </>
  );
};
