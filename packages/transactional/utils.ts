import type { Locale } from "@synoem/config";

export const formatDate = (date: string, language: Locale): string => {
  try {
    const dateObj = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat(getLocale(language), options).format(dateObj);
  } catch (error) {
    return date;
  }
};

const getLocale = (language: Locale): string => {
  const localeMap: Record<Locale, string> = {
    en: "en-US",
    de: "de-DE",
  };

  return localeMap[language] || "en-US";
};
