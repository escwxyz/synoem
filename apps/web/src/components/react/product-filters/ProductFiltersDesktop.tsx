"use client";

import { Button } from "@synoem/ui/components/button";
import { useTranslations } from "~/i18n/utils";
import type { Locale } from "@synoem/config";

export const ProductFiltersDesktop = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) => {
  const resetFilters = () => {
    window.location.href = window.location.pathname;
  };

  const { t } = useTranslations(locale);

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          {t("Component.ProductFiltersBar.filters")}
        </h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          {t("Component.ProductFiltersBar.reset")}
        </Button>
      </div>
      {children}
    </aside>
  );
};
