"use client";

import { Button } from "@synoem/ui/components/button";
import { ArrowLeft, Play } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { getLocaleFromUrl, useTranslations } from "~/i18n/utils";

export const ViewSwitch = ({
  onClick,
  isActive = false,
}: {
  onClick: () => void;
  isActive: boolean;
}) => {
  const locale = getLocaleFromUrl(new URL(window.location.href));

  const { t } = useTranslations(locale);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Button
      variant="outline"
      size={isMobile ? "sm" : "default"}
      className="rounded-full shadow-md backdrop-blur-sm flex items-center gap-2 overflow-hidden min-w-fit"
      onClick={onClick}
    >
      <div className="relative w-[18px] h-[18px] flex items-center justify-center">
        {!isActive ? (
          <div key="play" className="absolute">
            <Play size={18} />
          </div>
        ) : (
          <div key="back" className="absolute">
            <ArrowLeft size={18} />
          </div>
        )}
      </div>

      <span>
        {isActive
          ? isMobile
            ? t("Component.ProductGallery.back")
            : t("Component.ProductGallery.backToPhotos")
          : isMobile
            ? t("Component.ProductGallery.3DView")
            : t("Component.ProductGallery.view3DModel")}
      </span>
    </Button>
  );
};
