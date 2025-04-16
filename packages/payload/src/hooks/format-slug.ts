import type { FieldHook } from "payload";

export const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .toLowerCase();

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === "string") {
      return format(value);
    }

    if (operation === "create" || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback];

      if (fallbackData && typeof fallbackData === "string") {
        return format(fallbackData);
      }
    }

    return value;
  };
