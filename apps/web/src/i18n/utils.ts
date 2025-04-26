import { type Locale, defaultLocale, locales } from "@synoem/config";

/**
 * Get the localized relative pathname
 * @param pathname - The pathname to get the localized pathname for
 * @param locale - The locale to get the localized pathname for
 * @returns The localized pathname
 */
export const getLocalizedPathname = (pathname: string, locale: Locale) => {
  const cleanPath = pathname.replace(/^\/[a-z]{2}(?:\/|$)/, "/");
  return `/${locale}${cleanPath}`;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const messages: Record<Locale, string | Record<string, any>> = {
  en: (await import("./messages/en.json")).default,
  de: (await import("./messages/de.json")).default,
};

interface TranslationOptions {
  locale?: Locale;
  params?: Record<string, string | number>;
}

export function useTranslations(locale: Locale = defaultLocale) {
  const t = (key: string, options?: TranslationOptions) => {
    const { locale: optLocale = locale, params = {} } = options || {};

    const keys = key.split(".");
    let value = messages[optLocale];

    if (!value) {
      console.warn(`Translation messages for locale "${optLocale}" not loaded yet`);
      return key;
    }

    for (const k of keys) {
      if (!value || typeof value !== "object") return key;
      value = value[k];
      if (value === undefined) {
        if (optLocale !== defaultLocale) {
          return t(key, { locale: defaultLocale, params });
        }
        return key;
      }
    }

    if (typeof value === "string") {
      return value.replace(/\{(\w+)\}/g, (_, param) => params[param]?.toString() || `{${param}}`);
    }

    return value?.toString() || key;
  };

  return {
    t,
  };
}

export const isValidLocale = (locale: string) => {
  return locales.includes(locale as Locale);
};

export const getLocaleFromUrl = (url: URL) => {
  const [, locale] = url.pathname.split("/");

  if (locale && isValidLocale(locale)) {
    return locale as Locale;
  }
  return defaultLocale;
};
