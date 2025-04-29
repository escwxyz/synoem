"use client";

import * as React from "react";
import { cn } from "@synoem/ui/lib/utils";
import { useTranslations, getLocalizedPathname } from "~/i18n/utils";
import { locales, type Locale } from "@synoem/config";

interface LanguageSwitchProps {
  currentLocale: Locale;
  pathname: string;
  className?: string;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  currentLocale,
  pathname,
  className,
}) => {
  const { t } = useTranslations(currentLocale);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleLanguageChange = React.useCallback(
    (locale: Locale, index: number) => {
      if (locale === currentLocale) return;

      const container = containerRef.current;
      if (!container) return;

      const indicator = container.querySelector(
        "#language-indicator",
      ) as HTMLElement;
      const buttons = container.querySelectorAll("button");

      if (indicator) {
        indicator.style.transform = `translateX(${index * 100}%)`;
      }

      for (const btn of buttons) {
        btn.classList.remove("text-primary-foreground");
        btn.classList.add("text-muted-foreground");
      }

      buttons[index].classList.remove("text-muted-foreground");
      buttons[index].classList.add("text-primary-foreground");

      document.body.style.opacity = "0.8";
      document.body.style.transition = "opacity 0.2s ease-in-out";

      setTimeout(() => {
        const targetUrl = getLocalizedPathname(pathname, locale);
        window.location.href = targetUrl;
      }, 150);
    },
    [currentLocale, pathname],
  );

  return (
    <div className={cn("flex items-center", className)}>
      <div
        ref={containerRef}
        className="relative flex h-8 min-w-[120px] rounded-full bg-secondary p-[3px] dark:bg-white/10"
      >
        {locales.map((locale, index) => (
          <button
            key={locale}
            type="button"
            className={cn(
              "relative z-10 flex flex-1 items-center justify-center rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors",
              currentLocale === locale && "text-primary-foreground",
            )}
            onClick={() => handleLanguageChange(locale, index)}
            aria-current={currentLocale === locale ? "true" : "false"}
            disabled={currentLocale === locale}
          >
            {t(`Component.LanguageSwitch.${locale}`)}
          </button>
        ))}
        <div
          id="language-indicator"
          className="absolute left-[3px] top-[3px] bottom-[3px] rounded-full bg-primary transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: `calc((100% - 6px) / ${locales.length})`,
            transform: `translateX(${locales.indexOf(currentLocale) * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};
