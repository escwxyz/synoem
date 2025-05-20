import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "@synoem/config";

export const routing = defineRouting({
  locales,
  defaultLocale,
});
