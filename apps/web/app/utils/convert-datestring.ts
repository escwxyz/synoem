import type { Locale } from "@synoem/config";

export const convertDateString = (
  date: string,
  locale: Locale,
  precision: "year" | "month" | "day",
): string | null => {
  const dateObj = new Date(date);

  if (Number.isNaN(dateObj.getTime())) {
    return null;
  }
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");

  if (precision === "year") {
    return year.toString();
  }
  if (precision === "month") {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
    }).format(dateObj);
  }
  if (precision === "day") {
    return locale === "de"
      ? `${paddedDay}.${paddedMonth}.${year}`
      : `${paddedMonth}/${paddedDay}/${year}`;
  }
  return null;
};
