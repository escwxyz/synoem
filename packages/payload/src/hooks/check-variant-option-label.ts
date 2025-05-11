import type { CollectionBeforeValidateHook } from "payload";
import type { VariantOption } from "../payload-types";

export const checkVariantOptionLabel: CollectionBeforeValidateHook<VariantOption> = async ({
  data,
  operation,
}) => {
  if (!data) return;

  if (operation === "create" || operation === "update") {
    const existingOptions = data.options || [];

    // Extract all defined labels from options
    const labels = existingOptions.map((option) => option.label).filter(Boolean); // Filter out undefined or empty labels

    // Check if all labels are unique by comparing set size with array length
    const uniqueLabels = new Set(labels);

    if (uniqueLabels.size !== labels.length) {
      throw new Error("Option labels must be unique within a variant option");
    }

    return data;
  }
};
