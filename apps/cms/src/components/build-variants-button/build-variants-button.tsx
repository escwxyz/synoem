"use client";

import { Button, toast, useAllFormFields, useFormFields, useLocale } from "@payloadcms/ui";
import React, { useState } from "react";

import {
  type ProductTypeId,
  PRODUCT_TYPES,
  type VariantOptionConfig,
  type VariantOptionValue,
  isValidLocale,
  type Locale,
  getLocalizedString,
} from "@synoem/config";

import type { ProductVariants } from "@synoem/payload/payload-types";
import { reduceFieldsToValues } from "payload/shared";

export const BuildVariantsButton = ({
  productTypeId,
}: {
  productTypeId: ProductTypeId;
}) => {
  const locale = useLocale();

  if (!isValidLocale(locale.code)) {
    toast.error(`Invalid locale: ${locale.code}`);
    return null;
  }

  const [status, setStatus] = useState<"generating" | "clearing" | "idle">("idle");

  const [fields] = useAllFormFields();

  const formData = reduceFieldsToValues(fields, true);

  const data = formData;

  const hasPrevData = Array.isArray(data?.variants) && data?.variants.length > 0;

  const fieldDispatch = useFormFields(([, dispatch]) => dispatch);

  const productConfig = PRODUCT_TYPES[productTypeId];

  const generateVariants = () => {
    if (hasPrevData) {
      toast.warning("Please clear existing variants before generating new ones.");
      return;
    }

    setStatus("generating");

    try {
      const variantOptions = productConfig.variantOptions;

      if (variantOptions.length === 0) {
        toast.error("No variant options configured for this product type.");
        setStatus("idle");
        return;
      }

      const variants = generateVariantCombinations(variantOptions, locale.code as Locale);

      variants.forEach((variant, index) => {
        console.log("variant", variant);

        fieldDispatch({
          type: "ADD_ROW",
          path: "variants",
          rowIndex: index,
        });

        fieldDispatch({
          type: "UPDATE",
          path: `variants.${index}.sku`,
          value: variant.sku,
        });

        variant.options?.forEach((optionValue, optionIndex) => {
          fieldDispatch({
            type: "ADD_ROW",
            path: `variants.${index}.options`,
            rowIndex: optionIndex,
          });

          fieldDispatch({
            type: "UPDATE",
            path: `variants.${index}.options.${optionIndex}.label`,
            value: optionValue.label,
          });

          fieldDispatch({
            type: "UPDATE",
            path: `variants.${index}.options.${optionIndex}.type`,
            value: optionValue.type,
          });

          fieldDispatch({
            type: "UPDATE",
            path: `variants.${index}.options.${optionIndex}.value`,
            value: optionValue.value,
          });
        });
      });
      toast.success(`${variants.length} variants built successfully!`);
    } catch (error) {
      console.error("Error building variants:", error);
      toast.error(
        `Failed to build variants: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setStatus("idle");
    }
  };

  const clearVariants = () => {
    if (!Array.isArray(data?.variants) || data?.variants.length === 0) {
      return;
    }

    setStatus("clearing");

    try {
      for (let i = data?.variants.length - 1; i >= 0; i--) {
        fieldDispatch({
          type: "REMOVE_ROW",
          path: "variants",
          rowIndex: i,
        });
      }
    } catch (error) {
      console.error("Error clearing points:", error);
      toast.error("Failed to clear power points");
    } finally {
      setStatus("idle");
      toast.success("Power points cleared");
    }
  };

  const disableGenerate = status === "generating" || status === "clearing" || hasPrevData;

  const disableClear = status === "clearing" || !hasPrevData;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <Button onClick={generateVariants} buttonStyle="primary" disabled={disableGenerate}>
        {status === "generating" ? "Generating..." : "Generate Variants"}
      </Button>
      <Button onClick={clearVariants} buttonStyle="secondary" disabled={disableClear}>
        {status === "clearing" ? "Clearing..." : "Clear Variants"}
      </Button>
    </div>
  );
};

interface OptionCombination {
  config: Pick<VariantOptionConfig, "label" | "type" | "name">;
  value: VariantOptionValue;
}

function generateVariantCombinations(
  options: VariantOptionConfig[],
  locale: Locale,
): ProductVariants {
  if (options.length === 0) return [];

  let combinations: OptionCombination[][] = [[]];

  for (const option of options) {
    const newCombinations: OptionCombination[][] = [];

    for (const combo of combinations) {
      for (const value of option.values) {
        newCombinations.push([
          ...combo,
          { config: { label: option.label, type: option.type, name: option.name }, value },
        ]);
      }
    }

    combinations = newCombinations;
  }

  return combinations.map((optionCombination, index) => {
    const formattedOptions = optionCombination.map((comb) => ({
      type: comb.config.type,
      value: comb.config.type === "color" ? comb.value.color || comb.value.value : comb.value.value,
      label: getLocalizedString(comb.config.label, locale),
    }));

    const sku = generateSku(options.map((o) => o.name).join("-"), optionCombination, index);

    return {
      sku,
      gallery: [],
      options: formattedOptions,
    };
  });
}

// TODO: you may change this function to dynamically generate sku based on the product type
function generateSku(prefix: string, combination: OptionCombination[], index: number): string {
  const suffix = combination
    .map((item) => {
      return item.value.value
        .replace(/[^a-zA-Z0-9]/g, "")
        .substring(0, 3)
        .toUpperCase();
    })
    .join("-");

  return `${prefix.toUpperCase()}-${suffix}-${String(index + 1).padStart(2, "0")}`;
}

export default React.memo(BuildVariantsButton);
