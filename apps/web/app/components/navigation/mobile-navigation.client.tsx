"use client";

// TODO: better way to avoid scroll lock conflict with mobile menu (open => body shall be locked, menu shall be scrollable)

import type { MenuItems } from "@synoem/types";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { LanguageSwitcher } from "~/components/language-switcher.client";
import type { MenuItemProps, NavigationProps } from "./types";
import { ChevronDown } from "lucide-react";
import { cn } from "@synoem/ui/lib/utils";
import { getLinkConfig } from "~/utils";
import { MenuBanner } from "./menu-banner.client";
import { MenuLinkSection } from "./menu-link-section.client";

import { useLocale } from "next-intl";
import { defaultLocale, isValidLocale, type Locale } from "@synoem/config";
import { mobileNavigationOpenAtom, scrollLockAtom } from "~/atoms";
import { useAtom, useSetAtom } from "jotai";
import { useScrollLock } from "~/hooks";
import dynamic from "next/dynamic";
import { ThemeSwitcher } from "~/components/theme-switcher.client";
import { MenuLink } from "./menu-link.client";

const RequestQuoteButton = dynamic(
  () => import("~/components/request-quote-button").then((mod) => mod.RequestQuoteButton),
  {
    ssr: false,
  },
);

export const MobileNavigation = ({ items }: NavigationProps) => {
  const [isOpen, setIsOpen] = useAtom(mobileNavigationOpenAtom);
  const setScrollLock = useSetAtom(scrollLockAtom);

  useScrollLock();

  const toggle = () => {
    setIsOpen((prev) => !prev);
    setScrollLock(!isOpen);
  };

  const menuVariants: Variants = {
    open: {
      opacity: 1,
      visibility: "visible",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 0,
      visibility: "hidden",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="md:hidden flex justify-between items-center">
      <ThemeSwitcher />
      <button
        type="button"
        onClick={toggle}
        className="relative w-4 h-4 flex flex-col items-center justify-between"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <motion.span
          animate={!isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="block h-px w-full rounded-full bg-current"
        />
        <motion.span
          animate={!isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="block h-px w-full rounded-full bg-current"
        />
        <motion.span
          animate={!isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="block h-px w-full rounded-full bg-current"
        />

        <motion.span
          animate={{
            visibility: isOpen ? "visible" : "hidden",
            rotate: isOpen ? 45 : 0,
            opacity: isOpen ? 1 : 0,
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
          className="absolute left-[-1px] top-2 h-px w-[18px] rounded-full bg-current"
        />
        <motion.span
          animate={{
            visibility: isOpen ? "visible" : "hidden",
            rotate: isOpen ? -45 : 0,
            opacity: isOpen ? 1 : 0,
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
          className="absolute left-[-1px] top-2 h-px w-[18px] rounded-full bg-current"
        />
      </button>
      <MobileMenu items={items} isOpen={isOpen} />
    </div>
  );
};

const MobileMenu = (props: {
  items: NonNullable<MenuItems>;
  isOpen: boolean;
  onToggle?: () => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { items, isOpen, onToggle } = props;

  const locale = useLocale();

  const effectiveLocale = isValidLocale(locale) ? (locale as Locale) : defaultLocale;

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      onToggle?.();
    }
  }, [isOpen, onToggle]);

  if (!isMounted) return null;

  const menuContent = isOpen ? (
    <motion.div
      // TODO: need to add notification bar height if there is notification
      className="fixed inset-x-0 top-[var(--header-height)] h-[calc(100vh-var(--header-height))] bottom-0 z-40 bg-muted/50 backdrop-blur-2xl shadow-xl flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      <div className="pb-20 overflow-y-auto flex-1 p-4">
        {items.map((item) => (
          <MobileMenuItem key={item.id} item={item} />
        ))}
      </div>
      <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-primary/20 flex justify-between items-center">
        <LanguageSwitcher />
        <RequestQuoteButton locale={effectiveLocale} />
      </div>
    </motion.div>
  ) : null;

  return createPortal(<AnimatePresence>{menuContent}</AnimatePresence>, document.body);
};

type MenuExpandableProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

function MenuExpandable({ title, icon, children }: MenuExpandableProps) {
  const [expanded, setExpanded] = useState(false);

  const setScrollLock = useSetAtom(scrollLockAtom);

  const handleExpanded = () => {
    setExpanded((prev) => {
      const next = !prev;
      setScrollLock(next);
      return next;
    });
  };
  return (
    <>
      <button
        type="button"
        onClick={handleExpanded}
        className="flex w-full items-center justify-between gap-4"
        aria-expanded={expanded}
      >
        {icon}
        <h3 className="text-left text-base font-medium transition-colors duration-200">{title}</h3>
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
            className="grid gap-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenuItem({ item }: MenuItemProps) {
  if (item.type === "link") {
    const linkConfig = getLinkConfig(item.link);
    return (
      <div className="border-b border-muted space-y-2 p-2 w-full">
        <MenuLink
          href={linkConfig?.href || "#"}
          openInNewTab={linkConfig?.openInNewTab}
          className="w-full"
        >
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
    return <MenuLinkSection title={item.linksSection.title} items={item.linksSection.items} />;
  }

  return null;
}
