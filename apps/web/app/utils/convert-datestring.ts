import type { Locale } from "@synoem/config";

export const convertDateString = (
  date: string,
  locale: Locale,
  precision: "year" | "month" | "day",
) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");

  if (precision === "year") {
    return year.toString();
  }
  if (precision === "month") {
    return locale === "de" ? `${paddedMonth}.${year}` : `${paddedMonth}/${year}`;
  }
  if (precision === "day") {
    return locale === "de"
      ? `${paddedDay}.${paddedMonth}.${year}`
      : `${paddedMonth}/${paddedDay}/${year}`;
  }
  return null;
};
