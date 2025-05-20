import type { Locale } from "@synoem/config";
import { InquiryButton } from "~/components/inquiry-button.client";
import { Navigation } from "~/components/navigation.server";
import { NotificationBar } from "~/components/notification-bar.server";
import { ThemeSwitcher } from "~/components/theme-switcher.client";
import { Link } from "@/i18n/navigation";

export const Header = ({ locale }: { locale: Locale }) => {
  return (
    <header
      id="site-header"
      className="sticky top-0 z-100 flex w-full max-h-[calc(var(--header-height)+1.5rem)] flex-col border-b border-border bg-background/50 backdrop-blur-xl transition-all duration-500"
    >
      <NotificationBar locale={locale} />
      <div className="flex justify-between items-center h-(--header-height) w-full px-4">
        <div className="flex w-full md:flex-1/2 justify-between gap-4 items-center">
          <Link href="/">LOGO</Link>
          <Navigation locale={locale} />
        </div>
        <div className="hidden md:flex flex-1/2 justify-end items-center gap-4">
          <ThemeSwitcher />
          <InquiryButton />
        </div>
      </div>
    </header>
  );
};
