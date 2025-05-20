import { locales } from "@synoem/config";
import { hasLocale } from "next-intl";

export const isValidLocale = (locale: string) => {
  return hasLocale(locales, locale);
};
