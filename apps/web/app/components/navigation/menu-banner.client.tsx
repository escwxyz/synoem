"use client";

import { MenuLink } from "./menu-link.client";
import type { MenuBannerProps } from "./types";
import { getMenuLinkConfig, getUrl, isImageType, isVideoType } from "~/utils";
import Image from "next/image";

export const MenuBanner = ({ banner }: MenuBannerProps) => {
  const media = banner.media;
  const hasMedia = typeof media === "object" && typeof media?.value === "object";
  const linkConfig = getMenuLinkConfig(banner.link);

  return (
    // NOTE: for multiple banners, there might be scaling issues, need to check in detail
    <div className="relative rounded-lg overflow-hidden">
      <MenuLink
        href={linkConfig?.href || "#"}
        openInNewTab={linkConfig?.openInNewTab}
        className="opacity-90 hover:opacity-100 transition-opacity duration-200"
      >
        {hasMedia && isImageType(media) && (
          <Image
            src={getUrl(media.value.url || "")}
            alt={media.value.alt}
            width={200}
            height={112}
            className="rounded-md w-full h-auto dark:brightness-70 object-cover aspect-video"
            loading="lazy"
            priority={false}
            {...(media.value.blurDataUrl
              ? {
                  placeholder: "blur",
                  blurDataURL: media.value.blurDataUrl,
                }
              : {})}
          />
        )}
        {hasMedia && isVideoType(media) && (
          <video
            src={getUrl(media.value.url || "")}
            loop
            muted
            autoPlay
            playsInline
            aria-label="Banner video"
            className="rounded-md w-full h-auto dark:brightness-70 object-cover"
          />
        )}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 py-3.5 md:p-3 xs:p-4 bg-gradient-to-t from-black/50 to-black/10">
          {banner.title && (
            <h3 className="text-md leading-none tracking-snug text-primary-foreground">
              {banner.title}
            </h3>
          )}
          {banner.description && (
            <p className="mt-1.5 text-sm font-light leading-none tracking-extra-tight text-primary-foreground transition-colors duration-200">
              {banner.description}
            </p>
          )}
        </div>
      </MenuLink>
    </div>
  );
};
