"use client";

import { CookieIcon } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import { useEffect, useState } from "react";
import { cn } from "@synoem/ui/lib/utils";
import { getLocaleFromUrl, useTranslations } from "~/i18n/utils";

export const CookieConsent = ({
  mode = false,
  onAcceptCallback = () => {},
  onDeclineCallback = () => {},
}: {
  mode?: boolean;
  onAcceptCallback?: () => void;
  onDeclineCallback?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  const accept = () => {
    setIsOpen(false);
    document.cookie = "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptCallback?.();
  };

  const decline = () => {
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
    onDeclineCallback?.();
  };

  useEffect(() => {
    try {
      setIsOpen(true);
      if (document.cookie.includes("cookieConsent=true")) {
        if (!mode) {
          setIsOpen(false);
          setTimeout(() => {
            setHide(true);
          }, 700);
        }
      }
    } catch (error) {
      console.error("Error checking cookie consent:", error);
    }
  }, [mode]);

  const url = new URL(window.location.href);

  const locale = getLocaleFromUrl(url);

  const { t } = useTranslations(locale);

  return (
    <div
      className={cn(
        "fixed z-[200] bottom-0 right-0 p-4 sm:p-0 sm:right-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden",
      )}
    >
      <div className="m-0 sm:m-3 dark:bg-card bg-background border border-border rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-3">
          <h1 className="text-base sm:text-lg font-medium">{t("CookieConsent.title")}</h1>
          <CookieIcon className="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem]" />
        </div>
        <div className="p-3 -mt-2">
          <p className="text-xs sm:text-sm text-left text-muted-foreground">
            {t("CookieConsent.description")}{" "}
            <a href={`${locale}/privacy-policy`} className="underline">
              {t("CookieConsent.privacyPolicy")}
            </a>
            .
          </p>
        </div>
        <div className="p-3 flex flex-col sm:flex-row items-center sm:justify-between gap-2 mt-2 border-t">
          <Button
            // onClick={decline}
            className="w-full sm:w-32 h-8 sm:h-9 text-xs sm:text-sm"
            variant="outline"
          >
            {t("CookieConsent.decline")}
          </Button>
          <Button
            //  onClick={accept}
            className="w-full sm:w-32 h-8 sm:h-9 text-xs sm:text-sm"
          >
            {t("CookieConsent.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
};
