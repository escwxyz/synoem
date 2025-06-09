"use client";

import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import type { LinksSectionProps } from "./types";
import { cn } from "@synoem/ui/lib/utils";
import { getMenuLinkConfig } from "@/app/utils";
import { MenuLink } from "./menu-link.client";
import { Icon } from "~/components/icon.client";

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
        <span
          className={cn("block text-xs font-medium uppercase leading-none text-muted-foreground")}
        >
          {title}
        </span>
      )}
      <ul className={cn("flex flex-col gap-4", isMobile ? "mt-2" : "mt-4")}>
        {items?.map((item) => {
          const linkConfig = getMenuLinkConfig(item.link);

          if (!linkConfig || typeof item.id !== "string") return null;

          return (
            <li key={item.id} className="flex items-center gap-2 py-1">
              <MenuLink
                href={linkConfig.href}
                openInNewTab={linkConfig.openInNewTab}
                className={cn("flex items-center gap-2")}
              >
                {item.icon && (
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border">
                    <Icon
                      name={item.icon}
                      className="size-4 text-muted-foreground dark:[&_stop:not([stop-opacity])]:gradient-stop-opacity-40 dark:[&_stop[stop-opacity=&quot;0.6&quot;]]:gradient-stop-opacity-100"
                    />
                  </div>
                )}

                <div>
                  <span className="block text-sm leading-none tracking-snug transition-colors duration-200 text-muted-foreground">
                    {item.title}
                  </span>
                  {item.description && (
                    <span
                      className={cn(
                        "mt-1.5 block font-light leading-none tracking-extra-tight text-muted-foreground",
                        isMobile ? "text-[10px]" : "text-xs",
                      )}
                    >
                      {item.description}
                    </span>
                  )}
                </div>
              </MenuLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
