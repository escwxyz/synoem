import type { Locale } from "@synoem/config";
import { InquiryButton } from "~/components/inquiry-button.client";
import { NotificationBar } from "~/components/notification-bar.server";
import { ThemeSwitcher } from "~/components/theme-switcher.client";
import { Logo, LogoSkeleton } from "~/components/logo.server";
import { Suspense } from "react";
import { getCompanyInfoCached, getHeaderCached } from "../data/get-globals";
import { MobileNavigation } from "../components/mobile-navigation.client";

export const Header = async ({ locale }: { locale: Locale }) => {
  const companyInfoResponse = await getCompanyInfoCached(locale)();

  const headerResponse = await getHeaderCached(locale)();

  const items = headerResponse.data?.items;

  const hasNavigation = Array.isArray(items) && items.length > 0;

  return (
    <header
      id="site-header"
      className="sticky top-0 z-100 flex w-full max-h-[calc(var(--header-height)+1.5rem)] flex-col border-b border-border bg-background/50 backdrop-blur-xl transition-all duration-500"
    >
      <NotificationBar locale={locale} />
      <div className="flex justify-between items-center h-(--header-height) w-full px-4">
        <div className="flex w-full md:flex-1/2 justify-between gap-4 items-center">
          <div className="flex items-center gap-2">
            <Suspense fallback={<LogoSkeleton size={40} />}>
              <Logo locale={locale} size={40} />
            </Suspense>
            <span className="bg-primary from-foreground via-bg-muted to-primary bg-clip-text text-xl font-semibold text-transparent dark:bg-gradient-to-r">
              {companyInfoResponse?.data?.name}
            </span>
          </div>
          {/* <Navigation locale={locale} /> */}
          {/* <Suspense fallback={<DesktopNavigationSkeleton />}>
            {hasNavigation && <div>Desktop Navigation</div>}
          </Suspense> */}
        </div>
        <div className="hidden md:flex flex-1/2 justify-end items-center gap-4">
          <ThemeSwitcher />
          <InquiryButton />
        </div>
        <div className="block md:hidden">
          <ThemeSwitcher />
        </div>
        {hasNavigation && (
          <div className="block md:hidden">
            <MobileNavigation items={items} />
          </div>
        )}
      </div>
    </header>
  );
};
