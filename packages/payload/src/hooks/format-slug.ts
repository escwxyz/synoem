import type { FieldHook } from "payload";
import { slugify } from "../utils";

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === "string") {
      return slugify(value);
    }

    if (operation === "create" || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback];

      if (fallbackData && typeof fallbackData === "string") {
        return slugify(fallbackData);
      }
    }

    return value;
  };
