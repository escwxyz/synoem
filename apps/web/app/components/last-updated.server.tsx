import { convertDateString } from "@/app/utils/convert-datestring";
import type { Locale } from "@synoem/config";
import { getTranslations } from "next-intl/server";

export const LastUpdated = async ({ date, locale }: { date: string; locale: Locale }) => {
  const formattedDate = convertDateString(date, locale, "day");

  const t = await getTranslations("LastUpdated");

  return (
    <>
      {formattedDate && (
        <div className="text-sm text-muted-foreground italic">
          {t("lastUpdated")}: {formattedDate}
        </div>
      )}
    </>
  );
};
