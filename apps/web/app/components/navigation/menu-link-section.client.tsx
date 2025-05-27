"use client";

import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import type { LinksSectionProps } from "./types";
import { cn } from "@synoem/ui/lib/utils";
import { getIconComponent, getMenuLinkConfig } from "@/app/utils";
import { MenuLink } from "./menu-link.client";

export const MenuLinkSection = ({ title, items, isExtended }: LinksSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        isMobile ? "mb-4" : "min-w-[94px]",
        !isMobile && isExtended ? "w-[216px]" : "w-[196px]",
      )}
    >
      {title && (
        <div
          className={cn(
            "text-xs font-medium uppercase leading-none text-muted-foreground",
            isMobile ? "mb-2" : "mb-5",
          )}
        >
          {title}
        </div>
      )}
      <ul>
        {items?.map((item) => {
          const linkConfig = getMenuLinkConfig(item.link);
          const Icon = item.icon ? getIconComponent(item.icon) : null;

          if (!linkConfig || typeof item.id !== "string") return null;

          return (
            <li key={item.id} className="flex items-center gap-2 py-1">
              {Icon && <Icon className={cn("text-primary", isMobile ? "size-3" : "size-4")} />}
              <MenuLink
                href={linkConfig.href}
                openInNewTab={linkConfig.openInNewTab}
                className={cn("flex flex-col", isMobile ? "gap-1" : "gap-2")}
              >
                {item.title}
                {item.description && (
                  <span
                    className={cn("text-muted-foreground", isMobile ? "text-[10px]" : "text-xs")}
                  >
                    {item.description}
                  </span>
                )}
              </MenuLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
