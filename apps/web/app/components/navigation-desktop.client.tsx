"use client";

import type { Header } from "@synoem/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@synoem/ui/components/navigation-menu";
import { cn } from "@synoem/ui/lib/utils";
import { Button } from "@synoem/ui/components/button";

import type { Locale } from "@synoem/config";
import { getMenuLinkConfig } from "~/utils/get-menu-link-config";
import { Link, usePathname } from "@/i18n/navigation";

const MenuLink = ({ href, ...props }: React.ComponentProps<typeof Link>) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenuLink asChild active={isActive}>
      <Link className={cn(isActive && "underline")} href={href} {...props} />
    </NavigationMenuLink>
  );
};

interface ListItemProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  href: string;
  isExtended?: boolean;
  openInNewTab?: boolean;
  appearance?: string;
}

// TODO
const ListItem = ({
  title,
  description,
  icon,
  href,
  isExtended,
  openInNewTab,
  appearance,
}: ListItemProps) => (
  <li>
    <MenuLink
      href={href}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
        navigationMenuTriggerStyle(),
        appearance === "outline" && "border border-primary",
      )}
      {...(openInNewTab
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
    >
      {!isExtended && icon && (
        <div className="relative z-10 shrink-0 text-muted-foreground">{icon}</div>
      )}
      <div className="relative z-10">
        <span className="block text-sm font-medium leading-none tracking-tight">{title}</span>
        {description && (
          <span className="mt-1.5 block text-xs font-light leading-none text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </MenuLink>
  </li>
);

export const NavigationDesktop = ({
  items,
  locale,
}: {
  items: Header["items"];
  locale: Locale;
}) => {
  return (
    <NavigationMenu viewport={false} className="hidden lg:flex lg:flex-1 lg:items-center">
      <NavigationMenuList className="flex gap-x-10">
        {items?.map(({ id, type, link, text, sections }) => {
          // 如果类型是链接且没有子菜单，则呈现简单链接
          if (type === "link" && !sections?.length) {
            const linkConfig = getMenuLinkConfig(link);

            if (!linkConfig && !link) {
              return (
                <NavigationMenuItem key={id} asChild>
                  <Button variant="link" className="text-sm bg-transparent">
                    {text}
                  </Button>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={id} asChild={!linkConfig}>
                {linkConfig ? (
                  <MenuLink
                    href={linkConfig.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      linkConfig.appearance === "outline" && "border border-primary",
                    )}
                    {...(linkConfig.openInNewTab
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    {text}

                    {/* <Link href={linkConfig.href} passHref legacyBehavior>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        linkConfig.appearance === "outline" && "border border-primary",
                      )}
                      {...(linkConfig.openInNewTab
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                    >
                      {text}
                    </NavigationMenuLink>
                  </Link> */}
                  </MenuLink>
                ) : (
                  <Button variant="link" className="text-sm bg-transparent">
                    {text}
                  </Button>
                )}
              </NavigationMenuItem>
            );
          }

          // 处理带有子菜单的导航项
          return (
            <NavigationMenuItem key={id} className="relative">
              <NavigationMenuTrigger className="text-sm bg-transparent">
                {text}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-0 top-0 w-auto">
                <ul
                  className={cn(
                    sections && sections.length > 1
                      ? "grid w-max grid-cols-[repeat(2,minmax(0,auto));] gap-x-14 gap-y-9 px-7 py-6"
                      : "p-4",
                  )}
                >
                  {sections?.map(({ type, id, banner, linksSection }) => {
                    // 处理横幅类型的子菜单
                    if (type === "banner" && banner) {
                      const linkConfig = getMenuLinkConfig(banner.link);
                      if (!linkConfig) return null;

                      return (
                        <li key={id} className="row-span-3">
                          <Link href={linkConfig.href} passHref legacyBehavior>
                            <NavigationMenuLink
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md",
                                linkConfig.appearance === "outline" && "border border-primary",
                              )}
                              {...(linkConfig.openInNewTab
                                ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                : {})}
                            >
                              {banner.media && (
                                <div className="mb-2 mt-4">{/* 媒体组件将在这里添加 */}</div>
                              )}
                              <div className="mb-2 text-lg font-medium">{banner.title}</div>
                              {banner.desc && (
                                <p className="text-sm leading-tight text-muted-foreground">
                                  {banner.desc}
                                </p>
                              )}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      );
                    }

                    // 处理链接列表类型的子菜单
                    if (type === "links" && linksSection) {
                      const { isExtended, title, items } = linksSection;

                      return (
                        <li
                          key={id}
                          className={cn(
                            "min-w-[94px]",
                            sections &&
                              sections.length > 1 && [isExtended ? "w-[216px]" : "w-[196px]"],
                          )}
                        >
                          {title && (
                            <span className="mb-5 block text-xs font-medium uppercase leading-none text-muted-foreground">
                              {title}
                            </span>
                          )}
                          <ul className={cn("flex flex-col", isExtended ? "gap-5" : "gap-[18px]")}>
                            {items?.map((item) => {
                              const linkConfig = getMenuLinkConfig(item.link);
                              if (!linkConfig) return null;

                              return (
                                <ListItem
                                  key={item.id}
                                  title={item.title}
                                  href={linkConfig.href}
                                  description={item.desc || ""}
                                  isExtended={isExtended || false}
                                  openInNewTab={linkConfig.openInNewTab}
                                  appearance={linkConfig.appearance}
                                />
                              );
                            })}
                          </ul>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
