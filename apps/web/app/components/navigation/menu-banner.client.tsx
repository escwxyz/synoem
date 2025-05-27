"use client";

import { MenuLink } from "./menu-link.client";
import type { MenuBannerProps } from "./types";
import { getMenuLinkConfig, getUrl, isImageType, isVideoType } from "~/utils";
import Image from "next/image";

export const MenuBanner = ({ banner }: MenuBannerProps) => {
  const media = banner.media;
  const hasMedia = typeof media === "object" && typeof media?.value === "object";
  const linkConfig = getMenuLinkConfig(banner.link);

  // const t = useTranslations("Menu");

  return (
    <div className="mb-2 p-4 bg-muted/80 rounded-md overflow-hidden">
      {banner.title && <div className="font-semibold">{banner.title}</div>}
      {banner.description && <div className="text-sm mb-2">{banner.description}</div>}
      {hasMedia && isImageType(media) && (
        <MenuLink
          href={linkConfig?.href || "#"}
          openInNewTab={linkConfig?.openInNewTab}
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            src={getUrl(media.value.url || "")}
            alt={media.value.alt}
            width={160}
            height={90}
            className="rounded-md w-full h-auto dark:brightness-70 object-cover"
          />
        </MenuLink>
      )}
      {hasMedia && isVideoType(media) && (
        <MenuLink href={linkConfig?.href || "#"} openInNewTab={linkConfig?.openInNewTab}>
          <video
            src={getUrl(media.value.url || "")}
            loop
            muted
            className="rounded-md w-full h-auto dark:brightness-70 object-cover"
          />
        </MenuLink>
      )}
    </div>
  );
};
