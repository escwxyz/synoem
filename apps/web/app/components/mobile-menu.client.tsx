"use client";

import type { MegaMenuItems, MenuItems } from "@synoem/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getMenuLinkConfig } from "../utils/get-menu-link-config";
import { ChevronDown, ExternalLinkIcon } from "lucide-react";
import { cn } from "@synoem/ui/lib/utils";
import { getIconComponent, getUrl } from "../utils";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLenis } from "lenis/react";
import { isImageType, isVideoType } from "../utils/check-media-type";
import { LanguageSwitcher } from "./language-switcher.client";
import { InquiryButton } from "./inquiry-button.client";

interface Props {
  items: NonNullable<MenuItems>;
  isOpen: boolean;
  onToggle?: () => void;
}

export const MobileMenu = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { items, isOpen, onToggle } = props;

  const lenis = useLenis();

  useEffect(() => {
    setIsMounted(true);

    if (isOpen) {
      document.body.style.overflow = "hidden";

      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "";
      setIsMounted(false);
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (isOpen) {
      onToggle?.();
    }
  }, [isOpen, onToggle]);

  if (!isMounted) return null;

  const menuContent = isOpen ? (
    <motion.div
      className="fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 bg-muted/50 backdrop-blur-2xl shadow-xl overflow-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      <div className="pb-20 overflow-y-auto">
        {items.map((item) => (
          <MobileMenuItem key={item.id} item={item} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/20 flex justify-between items-center">
        <LanguageSwitcher />
        <InquiryButton />
      </div>
    </motion.div>
  ) : null;

  return createPortal(<AnimatePresence>{menuContent}</AnimatePresence>, document.body);
};

type MenuLinkProps = {
  href: string;
  openInNewTab?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function MenuLink({ href, openInNewTab, children, className }: MenuLinkProps) {
  const isExternal = href.startsWith("http");
  if (isExternal || openInNewTab) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("flex items-center justify-between", className)}
      >
        {children}
        <ExternalLinkIcon className="size-4" />
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

type MenuExpandableProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export function MenuExpandable({ title, icon, children }: MenuExpandableProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between gap-4"
        aria-expanded={expanded}
      >
        {icon}
        <h3
          className={cn(
            "text-left text-base font-medium transition-colors duration-200",
            "text-foreground/80",
            expanded && "text-foreground",
          )}
        >
          {title}
        </h3>
        <motion.div
          animate={{
            rotate: expanded ? 180 : 0,
            scale: expanded ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "shrink-0 rounded-full p-0.5",
            "transition-colors duration-200",
            "text-muted-foreground",
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {expanded && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function LinksSection({
  title,
  items,
  // isExtended,
}: NonNullable<NonNullable<NonNullable<MegaMenuItems>[number]["linksSection"]>>) {
  return (
    <div className="mb-4">
      {title && <div className="font-semibold mb-2 text-muted-foreground text-sm">{title}</div>}
      <ul>
        {items?.map((item, i) => {
          const linkConfig = getMenuLinkConfig(item.link);
          const Icon = item.icon ? getIconComponent(item.icon) : null;
          return (
            <li key={item.id || i} className="flex items-center gap-2 py-1">
              {Icon && <Icon className="size-3 text-primary" />}
              <MenuLink
                href={linkConfig?.href || "#"}
                openInNewTab={linkConfig?.openInNewTab}
                className="flex flex-col gap-1"
              >
                {item.title}
                {item.description && (
                  <span className="text-[10px] text-muted-foreground">{item.description}</span>
                )}
              </MenuLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function MenuBanner({
  banner,
}: { banner: NonNullable<NonNullable<MegaMenuItems>[number]["banner"]> }) {
  const media = banner.media;
  const hasMedia = typeof media === "object" && typeof media?.value === "object";
  const linkConfig = getMenuLinkConfig(banner.link);

  // reusable?

  return (
    <div className="mb-2 p-2 bg-muted/80 rounded-md overflow-hidden">
      {banner.title && <div className="font-semibold">{banner.title}</div>}
      {banner.description && <div className="text-sm mb-2">{banner.description}</div>}
      {hasMedia && isImageType(media) && (
        <MenuLink href={linkConfig?.href || "#"} openInNewTab={linkConfig?.openInNewTab}>
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
          <span>Learn More</span>
        </MenuLink>
      )}
    </div>
  );
}

type MobileMenuItemProps = {
  item: NonNullable<MenuItems>[number] | NonNullable<MegaMenuItems>[number];
};

export function MobileMenuItem({ item }: MobileMenuItemProps) {
  if (item.type === "link") {
    const linkConfig = getMenuLinkConfig(item.link);
    return (
      <div className="border-b border-muted space-y-2 p-2 w-full">
        <MenuLink href={linkConfig?.href || "#"} openInNewTab={linkConfig?.openInNewTab}>
          {item.text}
        </MenuLink>
      </div>
    );
  }

  if (item.type === "mega") {
    return (
      <div className="border-b border-muted space-y-2 p-2 w-full">
        <MenuExpandable title={item.text}>
          {item.megaItems?.map((megaItem, idx) => (
            <MobileMenuItem key={megaItem.id || idx} item={megaItem} />
          ))}
        </MenuExpandable>
      </div>
    );
  }

  if (item.type === "banner" && item.banner) {
    return <MenuBanner banner={item.banner} />;
  }

  if (item.type === "links" && item.linksSection) {
    return <LinksSection title={item.linksSection.title} items={item.linksSection.items} />;
  }
}
