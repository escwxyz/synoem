"use client";

import { Button } from "@synoem/ui/components/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const InquiryButton = () => {
  const t = useTranslations("InquiryButton");

  return (
    <>
      <Button
        asChild
        className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
      >
        <Link href="/inquiry">{t("label")}</Link>
      </Button>
    </>
  );
};
