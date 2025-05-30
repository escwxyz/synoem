import type { FieldHook } from "payload";
import { format } from "@synoem/utils";

export const formatSku: FieldHook = ({ value }) => {
  if (typeof value === "string") {
    return format(value).toUpperCase();
  }

  return value;
};
