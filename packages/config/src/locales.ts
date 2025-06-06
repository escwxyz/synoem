export const locales = ["en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const;

export const mutableLocales = [...locales] as string[];

export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};
