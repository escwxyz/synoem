"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@synoem/ui/components/tabs";
import type React from "react";
import type { Locale } from "@synoem/config";
import { useTranslations } from "~/i18n/utils";

interface Tab {
  value: string;
  labelKey: string;
}

interface Props {
  locale: Locale;
  defaultValue?: string;
  tabs: Tab[];
  [key: `${string}-tab`]: React.ReactNode;
}

export const ProductTabs: React.FC<Props> = ({
  locale,
  defaultValue = "overview",
  tabs,
  ...props
}) => {
  const { t } = useTranslations(locale);

  return (
    <Tabs defaultValue={defaultValue} className="flex flex-col gap-4">
      <TabsList className="overflow-x-auto bg-muted text-muted-foreground inline-flex w-full items-center justify-center rounded-md p-1 min-h-12">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-lg cursor-pointer whitespace-nowrap"
          >
            {t(tab.labelKey)}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={tab.value === "documents" ? "space-y-2" : ""}
        >
          {props[`${tab.value}-tab`]}
        </TabsContent>
      ))}
    </Tabs>
  );
};
