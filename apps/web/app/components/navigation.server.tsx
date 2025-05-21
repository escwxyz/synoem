import { NavigationMobile } from "./navigation-mobile.client";
import { NavigationDesktop } from "./navigation-desktop.client";
import { unstable_cache } from "next/cache";
import { apiClient } from "~/libs/api-client";
import { locales, type Locale } from "@synoem/config";
import { Suspense } from "react";
import { z } from "zod";

export const Navigation = async ({ locale }: { locale: Locale }) => {
  return (
    <Suspense fallback={<NavigationSkeleton />}>
      <NavigationInner locale={locale} />
    </Suspense>
  );
};

const NavigationInner = async ({ locale }: { locale: Locale }) => {
  const headerResponse = await getNavigationCached(locale)();

  const hasNavigation =
    headerResponse.status === "success" &&
    headerResponse.data?.items &&
    headerResponse.data.items.length > 0;

  if (!hasNavigation) {
    return <div>No navigation found</div>;
  }

  const items = headerResponse.data?.items;

  return (
    <>
      <div className="hidden md:block">
        <NavigationDesktop items={items} locale={locale} />
      </div>
      <div className="block md:hidden">
        <NavigationMobile items={items} locale={locale} />
      </div>
    </>
  );
};

const NavigationSkeleton = () => {
  return <div>TODO</div>;
};

const getNavigationCached = (locale: Locale) => {
  return unstable_cache(
    async () => {
      return await apiClient.globals.getHeader({ locale, slug: "header" });
    },
    ["navigation"],
    {
      tags: ["navigation"],
    },
  );
};
