"use client";

// TODO: pointer events

import type { MegaMenuItems, MenuItems } from "@synoem/types";
import { cn } from "@synoem/ui/lib/utils";
import { getLinkConfig } from "~/utils";
import { type Dispatch, type SetStateAction, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronDownIcon } from "lucide-react";
import { MenuLinkSection } from "./menu-link-section.client";
import { MenuBanner } from "./menu-banner.client";
import { MenuLink } from "./menu-link.client";
import { useAtom } from "jotai";
import { desktopNavigationActiveAtom } from "@/app/atoms/desktop-navigation";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

interface Props {
  items: NonNullable<MenuItems>;
}

export const DesktopNavigation = ({ items }: Props) => {
  const [active, setActive] = useAtom(desktopNavigationActiveAtom);

  const handleMouseLeave = () => {
    setActive(null);
  };

  return (
    <nav
      aria-label="Primary"
      onMouseLeave={handleMouseLeave}
      className={cn("hidden justify-center space-x-4 px-8 py-6 md:flex")}
    >
      {items.map((item) => {
        return <DesktopMenuItem key={item.id} item={item} setActive={setActive} active={active} />;
      })}
    </nav>
  );
};

type MenuItemProps = {
  item: NonNullable<MenuItems>[number] | NonNullable<MegaMenuItems>[number];
  setActive: Dispatch<SetStateAction<string | null>>;
  active: string | null;
};

function DesktopMenuItem({ item, active, setActive }: MenuItemProps) {
  let content: React.ReactNode;

  const indicator = useMemo(() => {
    return (
      <motion.div
        layoutId="hovered"
        className="absolute inset-0 h-full w-full rounded-full bg-accent/50 pointer-events-none"
      />
    );
  }, []);

  if (item.type === "link") {
    const linkConfig = getLinkConfig(item.link);
    content = (
      <>
        <MenuLink
          href={linkConfig?.href || "#"}
          openInNewTab={linkConfig?.openInNewTab}
          className={cn(
            "inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-muted-foreground",
            active === item.id && "text-foreground",
          )}
        >
          {item.text}
        </MenuLink>
        {active === item.id && indicator}
      </>
    );
  }

  if (item.type === "mega") {
    content = (
      <>
        <motion.div className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium">
          {item.text}
          <ChevronDownIcon
            className={cn(
              "relative top-[1px] ml-1 size-3 transition-transform duration-200",
              active === item.id ? "rotate-180" : "",
            )}
            aria-hidden="true"
          />
        </motion.div>
        {active === item.id && indicator}

        {active !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={transition}
          >
            {active === item.id && (
              <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  {/* TODO: This border indicator is keeping rerendering after the animation */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent dark:via-primary/30 transition-opacity duration-200",
                      active === item.id ? "opacity-100" : "opacity-0 pointer-events-none",
                    )}
                  />
                  <motion.div
                    transition={transition}
                    layoutId="active"
                    className="bg-muted/99 backdrop-blur-4xl rounded-xl w-max border"
                  >
                    <motion.div layout className="w-max h-full p-4">
                      <ul className="relative grid grid-cols-[repeat(2,minmax(0,auto))] gap-x-8 gap-y-6 p-2">
                        {item.megaItems?.map((section) => {
                          if (section.type === "links" && section.linksSection) {
                            return (
                              <li key={section.id}>
                                <MenuLinkSection
                                  title={section.linksSection.title}
                                  items={section.linksSection.items}
                                  isExtended={section.linksSection.isExtended}
                                />
                              </li>
                            );
                          }
                          if (section.type === "banner" && section.banner) {
                            return (
                              <li key={section.id} className="row-span-3 mt-1 md:-order-1 md:mt-0">
                                <MenuBanner banner={section.banner} />
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </>
    );
  }

  return (
    <div onMouseEnter={() => setActive(item.id || null)} className="relative ">
      {content}
    </div>
  );
}
