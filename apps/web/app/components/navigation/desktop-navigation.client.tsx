"use client";

import type { MegaMenuItems, MenuItems } from "@synoem/types";

import { cn } from "@synoem/ui/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import { getMenuLinkConfig, isVideoType, getUrl, isImageType } from "~/utils";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDownIcon } from "lucide-react";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";

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
  const [active, setActive] = useState<string | null>(null);

  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <nav onMouseLeave={() => setActive(null)} className=" flex justify-center space-x-4 px-8 py-6 ">
      {items.map((item) => {
        return <DesktopMenuItem key={item.id} item={item} setActive={setActive} active={active} />;
      })}
    </nav>
  );
};

type MenuItemProps = {
  item: NonNullable<MenuItems>[number] | NonNullable<MegaMenuItems>[number];
  setActive: (item: string) => void;
  active: string | null;
};

function DesktopMenuItem({ item, active, setActive }: MenuItemProps) {
  let content: React.ReactNode;

  if (item.type === "link") {
    const linkConfig = getMenuLinkConfig(item.link);
    content = (
      <>
        <MenuLink
          href={linkConfig?.href || "#"}
          openInNewTab={linkConfig?.openInNewTab}
          className={cn(
            "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground",
            active === item.id && "text-foreground",
          )}
        >
          {item.text}
        </MenuLink>
        {active === item.id && (
          <motion.div
            layoutId="hovered"
            className="absolute inset-0 h-full w-full rounded-full bg-muted/50"
          />
        )}
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
        {active === item.id && (
          <motion.div
            layoutId="hovered"
            className="absolute inset-0 h-full w-full rounded-full bg-muted/50"
          />
        )}

        {active !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={transition}
          >
            {active === item.id && (
              <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
                <motion.div
                  transition={transition}
                  layoutId="active"
                  className="bg-muted backdrop-blur-2xl rounded-xl p-4"
                >
                  <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary/30 blur-3xl dark:bg-primary/10" />
                  <motion.div layout className="w-max h-full p-4">
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {item.megaItems?.map((section) => {
                        if (section.type === "links" && section.linksSection) {
                          return (
                            <li key={section.id}>
                              <LinksSection
                                title={section.linksSection.title}
                                items={section.linksSection.items}
                                isExtended={section.linksSection.isExtended}
                              />
                            </li>
                          );
                        }
                        if (section.type === "banner" && section.banner) {
                          return (
                            <li key={section.id} className="row-span-3">
                              <MenuBanner banner={section.banner} />
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </motion.div>
                  <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent dark:via-primary/30" />
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </>
    );
  }

  return (
    // @ts-expect-error
    <div onMouseEnter={() => setActive(item.id)} className="relative ">
      {content}
    </div>
  );
}

type MenuLinkProps = {
  href: string;
  openInNewTab?: boolean;
  children: React.ReactNode;
  className?: string;
};

function MenuLink({ href, openInNewTab, children, className }: MenuLinkProps) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={cn(isActive && "underline", className)}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

function MenuBanner({
  banner,
}: { banner: NonNullable<NonNullable<MegaMenuItems>[number]["banner"]> }) {
  const media = banner.media;
  const hasMedia = typeof media === "object" && typeof media?.value === "object";
  const linkConfig = getMenuLinkConfig(banner.link);

  // const t = useTranslations("Menu");

  // reusable?

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
}

function LinksSection({
  title,
  items,
  isExtended,
}: NonNullable<NonNullable<NonNullable<MegaMenuItems>[number]["linksSection"]>>) {
  return (
    <div className={cn("min-w-[94px]", isExtended ? "w-[216px]" : "w-[196px]")}>
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
            <li key={item.id}>
              <MenuLink href={linkConfig.href} openInNewTab={linkConfig.openInNewTab}>
                {item.title}
                {item.description && (
                  <span className="block text-xs text-muted-foreground">{item.description}</span>
                )}
              </MenuLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
