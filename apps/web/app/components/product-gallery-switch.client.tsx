"use client";

import { Button } from "@synoem/ui/components/button";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import { Play } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export const ProductGallerySwitch = ({
  onClick,
  isActive = false,
}: {
  onClick: () => void;
  isActive: boolean;
}) => {
  const t = useTranslations("ProductGallerySwitch");

  const isMobile = useIsMobile();

  return (
    <Button
      variant="outline"
      size={isMobile ? "sm" : "default"}
      className="rounded-full border-none shadow-md backdrop-blur-sm flex items-center gap-2 overflow-hidden min-w-fit"
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
            ? t("back")
            : t("backToPhotos")
          : isMobile
            ? t("3DView")
            : t("view3DModel")}
      </span>
    </Button>
  );
};
