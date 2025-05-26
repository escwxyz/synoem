"use client";

import type { MenuItems } from "@synoem/types";
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
  const [expanded, setExpanded] = useState<string | number | null>(null);
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
    } else {
      // TODO: close all expanded menus
      setExpanded(null); // close all expanded menus
    }
  }, [isOpen, onToggle]);

  if (!isMounted) return null;

  const handleToggle = (id: string | number) => {
    setExpanded(expanded === id ? null : id);
  };

  const menuContent = isOpen ? (
    <motion.div
      className="fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 bg-muted/50 backdrop-blur-2xl shadow-xl overflow-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
    >
      <div className="pb-20 overflow-y-auto">
        {items.map(({ id, type, link, text, megaItems }, index) => {
          if (type === "link") {
            const linkConfig = getMenuLinkConfig(link);

            return (
              <Link
                key={id}
                href={linkConfig?.href || "#"}
                target={linkConfig?.openInNewTab ? "_blank" : "_self"}
              >
                {text}
              </Link>
            );
          }

          if (type === "mega") {
            return (
              <MenuItem
                key={id || index}
                title={text}
                isExpandable
                isExpanded={expanded === id}
                onToggle={() => handleToggle(id || index)}
              >
                <div className="p-2 mb-2 bg-muted/80 rounded-md overflow-hidden">
                  {megaItems?.map((megaItem, idx) => {
                    if (megaItem.type === "links") {
                      return (
                        <div key={megaItem.id || idx} className="mb-4">
                          {megaItem.linksSection?.title && (
                            <div className="font-semibold mb-2">{megaItem.linksSection.title}</div>
                          )}
                          <ul>
                            {megaItem.linksSection?.items?.map((item, i) => {
                              const linkConfig = getMenuLinkConfig(item.link);
                              return (
                                <li key={item.id || i} className="flex items-center gap-2 py-1">
                                  {item.icon && (
                                    <span>
                                      {(() => {
                                        const Icon = getIconComponent(item.icon);
                                        return Icon && <Icon className="size-3 text-primary" />;
                                      })()}
                                    </span>
                                  )}
                                  <Link
                                    href={linkConfig?.href || "#"}
                                    target={linkConfig?.openInNewTab ? "_blank" : "_self"}
                                  >
                                    {item.title}
                                  </Link>

                                  {item.description && (
                                    <span className="text-xs text-muted-foreground">
                                      {item.description}
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    }
                    if (megaItem.type === "banner") {
                      const media = megaItem.banner?.media;

                      const hasMedia =
                        typeof media === "object" && typeof media?.value === "object";

                      const link = megaItem.banner?.link;

                      const linkConfig = getMenuLinkConfig(link);

                      return (
                        <div key={megaItem.id || idx} className="mb-4 p-3 bg-secondary rounded">
                          <div className="font-semibold">{megaItem.banner?.title}</div>
                          {megaItem.banner?.description && (
                            <div className="text-sm mb-2">{megaItem.banner.description}</div>
                          )}
                          {hasMedia && isImageType(media) && (
                            <Link
                              href={linkConfig?.href || "#"}
                              target={linkConfig?.openInNewTab ? "_blank" : "_self"}
                            >
                              <Image
                                src={getUrl(media.value.url || "")}
                                alt={media.value.alt}
                                width={160}
                                height={90}
                                priority
                                className="rounded-md w-full h-auto dark:brightness-70 object-cover"
                              />
                            </Link>
                          )}
                          {hasMedia && isVideoType(media) && (
                            <Link
                              href={linkConfig?.href || "#"}
                              target={linkConfig?.openInNewTab ? "_blank" : "_self"}
                            >
                              <span>Learn More</span>
                            </Link>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </MenuItem>
            );
          }

          return null;
        })}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary/20 flex justify-between items-center">
        <LanguageSwitcher />
        <InquiryButton />
      </div>
    </motion.div>
  ) : null;

  return createPortal(<AnimatePresence>{menuContent}</AnimatePresence>, document.body);
};

interface MenuItemProps {
  icon?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  href?: string;
  isExpandable?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const MenuItem = ({
  icon,
  title,
  children,
  href,
  isExpandable = false,
  isExpanded = false,
  onToggle,
}: MenuItemProps) => {
  return (
    <div className="border-b border-muted">
      {}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-2 gap-4"
      >
        {icon && <span>{icon}</span>}
        <h3
          className={cn(
            "text-left text-base font-medium transition-colors duration-200",
            "text-foreground/80",
            isExpanded && "text-foreground",
          )}
        >
          {title}
        </h3>
        {isExpandable && (
          <motion.div
            animate={{
              rotate: isExpanded ? 180 : 0,
              scale: isExpanded ? 1.1 : 1,
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
        )}
      </button>

      <AnimatePresence>
        {isExpanded && children && (
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
    </div>
  );
};

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} target="_blank">
      <div className="flex items-center justify-between">
        <div>{children}</div>
        <ExternalLinkIcon className="size-4" />
      </div>
    </Link>
  );
};
