"use client";

// import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useProductFilters } from "@/app/hooks/use-product-filters";
import type { PumpControllerFilterMetadata } from "~/types/product-filter-metadata";
import { Label } from "@synoem/ui/components/label";
import { Switch } from "@synoem/ui/components/switch";
import { Slider } from "@synoem/ui/components/slider";

export const PumpControllerFilters = (filterMetadata: PumpControllerFilterMetadata) => {
  const { urlFilters, handleChangeFilters } = useProductFilters(filterMetadata, "pump-controller");

  // const t = useTranslations("PumpControllerFilters");

  const params = useParams();

  const slug = Array.isArray(params.slug) ? params.slug : [params.slug].filter(Boolean);

  const isSubCategory = slug.length > 1;

  return (
    <>
      {!isSubCategory && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Pump Controller Types</h3>
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
        <div className="">
          <h3 className="text-sm font-medium">Voltage Range</h3>
          <span className="text-xs text-muted-foreground">
            {`${urlFilters.voltageMin}V ~ ${urlFilters.voltageMax}V`}
          </span>
        </div>

        <div className="px-2">
          <Slider
            min={filterMetadata.voltageRange.min}
            max={filterMetadata.voltageRange.max}
            step={0.05}
            value={[urlFilters.voltageMin, urlFilters.voltageMax]}
            onValueChange={(value) =>
              handleChangeFilters({
                voltageMin: value[0],
                voltageMax: value[1],
              })
            }
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="">
          <h3 className="text-sm font-medium">Max Current</h3>
          <span className="text-xs text-muted-foreground">
            {`${urlFilters.maxCurrentMin}A ~ ${urlFilters.maxCurrentMax}A`}
          </span>
        </div>

        <div className="px-2">
          <Slider
            min={filterMetadata.maxCurrentRange.min}
            max={filterMetadata.maxCurrentRange.max}
            step={0.05}
            value={[urlFilters.maxCurrentMin, urlFilters.maxCurrentMax]}
            onValueChange={(value) =>
              handleChangeFilters({
                maxCurrentMin: value[0],
                maxCurrentMax: value[1],
              })
            }
          />
        </div>
      </div>
    </>
  );
};
