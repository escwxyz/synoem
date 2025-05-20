"use client";

import type { SolarPanel, PumpController } from "@synoem/types";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { useMemo } from "react";
import { selectedVariantStore, type VariantOption } from "~/atoms/product-variant-option";
import { Button } from "@synoem/ui/components/button";
import { cn } from "@synoem/ui/lib/utils";
import { selectedImageAtom } from "~/atoms";
import { galleryIndexAtom } from "~/atoms";
import { productModelViewAtom } from "~/atoms";
import type { Image as ImageType } from "@synoem/types";

interface Props {
  variants: SolarPanel["variants"] | PumpController["variants"];
  onVariantChange?: (
    variant: SolarPanel["variants"][number] | PumpController["variants"][number] | null,
  ) => void;
}

export const ProductVariantSwatch = ({ variants, onVariantChange }: Props) => {
  const setSelectedVariant = useSetAtom(selectedVariantStore);

  const setGalleryIndex = useSetAtom(galleryIndexAtom);
  const setSelectedImage = useSetAtom(selectedImageAtom);
  const setShowModelView = useSetAtom(productModelViewAtom);

  const [selectedOptions] = useState<Record<string, string>>({});

  const groupedOptions = useMemo(() => {
    if (!variants || variants.length === 0) return {};

    const groups: Record<string, Set<string>> = {};

    for (const variant of variants) {
      if (variant.options) {
        for (const { label, value } of variant.options) {
          if (!groups[label]) {
            groups[label] = new Set();
          }
          groups[label].add(value);
        }
      }
    }

    return Object.entries(groups).reduce(
      (acc, [option, values]) => {
        acc[option] = Array.from(values);
        return acc;
      },
      {} as Record<string, string[]>,
    );
  }, [variants]);

  const findMatchingVariant = (selectedOptions: Record<string, string>) => {
    if (!variants || variants.length === 0) return null;

    return (
      variants.find((variant) => {
        if (!variant.options) return false;

        const optionsMap = new Map(variant.options.map(({ label, value }) => [label, value]));

        for (const [option, value] of Object.entries(selectedOptions)) {
          if (optionsMap.get(option) !== value) return false;
        }

        return true;
      }) || null
    );
  };

  const selectOption = (option: string, value: string) => {
    const newOptions = { ...selectedOptions, [option]: value };

    const variant = findMatchingVariant(newOptions);
    if (variant?.id) {
      setSelectedVariant({
        id: variant.id,
        sku: variant.sku,
        options: variant.options as VariantOption[],
      });

      setGalleryIndex(0);
      // TODO: support variant for 3d model in the future, currently we just switch back to the carousel view
      setShowModelView(false);

      if (
        variant.gallery &&
        variant.gallery.length > 0 &&
        typeof variant.gallery[0] === "object" &&
        variant.gallery[0].url
      ) {
        setSelectedImage(variant.gallery[0] as ImageType);
      }

      if (onVariantChange) {
        onVariantChange(variant);
      }
    }
  };

  if (!variants || variants.length === 0 || Object.keys(groupedOptions).length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground text-sm">
        We're offering different customization options for this product. Please select the option
        that you would like to customize.
      </div>
      {Object.entries(groupedOptions).map(([option, values]) => (
        <div key={option} className="space-y-2">
          <h3 className="font-medium text-sm">{option}</h3>
          <div className="flex flex-wrap gap-2">
            {values.map((value) => {
              const selected = selectedOptions[option] === value;

              return (
                <Button
                  key={`${option}-${value}`}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "border rounded-md px-3 py-1 min-w-[3rem]",
                    selected ? "bg-primary text-primary-foreground" : "cursor-pointer",
                  )}
                  onClick={() => selectOption(option, value)}
                  disabled={selected}
                >
                  <span className="font-medium">{value}</span>
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
