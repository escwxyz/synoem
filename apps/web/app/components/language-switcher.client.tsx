"use client";

import * as React from "react";
import { cn } from "@synoem/ui/lib/utils";
import { defaultLocale, locales, type Locale } from "@synoem/config";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { isValidLocale } from "~/utils/is-valid-locale";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";

interface LanguageSwitcherProps {
  onLocaleChange?: (locale: Locale) => void;
}

export const LanguageSwitcher = ({ onLocaleChange }: LanguageSwitcherProps) => {
  const router = useRouter();

  const pathname = usePathname();

  const currentLocale = isValidLocale(useLocale()) ? (useLocale() as Locale) : defaultLocale;

  const [language, setLanguage] = useState<Locale>(currentLocale);

  useEffect(() => {
    setLanguage(currentLocale);
  }, [currentLocale]);

  const handleLanguageChange = (newLanguage: Locale) => {
    if (newLanguage === language) return;

    setLanguage(newLanguage);

    onLocaleChange?.(newLanguage);

    setTimeout(() => {
      router.replace(pathname, { locale: newLanguage, scroll: false });
    }, 100);
  };

  const optionWidth = 100 / locales.length;

  const activeIndex = locales.findIndex((locale) => locale === language);

  const t = useTranslations("LanguageSwitcher");

  const isMobile = useIsMobile();

  return (
    <div
      className="inline-flex items-center rounded-full border p-1 shadow-sm relative"
      role="radiogroup"
      aria-label="Select language"
    >
      {locales.map((locale) => (
        <LanguageOption
          key={locale}
          label={isMobile ? locale.toUpperCase() : t(`${locale}`)}
          isActive={language === locale}
          onClick={() => handleLanguageChange(locale)}
        />
      ))}

      <motion.div
        className="absolute inset-y-1 rounded-full bg-primary z-0"
        initial={false}
        animate={{
          left: `${activeIndex * optionWidth}%`,
          width: `${optionWidth}%`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

interface LanguageOptionProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function LanguageOption({ label, isActive, onClick }: LanguageOptionProps) {
  return (
    <motion.button
      type="button"
      aria-checked={isActive}
      disabled={isActive}
      className={cn(
        "relative z-10 flex-1 px-3 py-1.5 text-sm font-medium transition-colors rounded-full",
        isActive ? "text-primary-foreground" : "text-foreground cursor-pointer",
      )}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.button>
  );
}
