"use client";

import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import type { MenuLinkProps } from "./types";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@synoem/ui/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { Link } from "~/components/link.client";
import { useMemo } from "react";

export const MenuLink = ({ href, openInNewTab, children, className }: MenuLinkProps) => {
  const isMobile = useIsMobile();

  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (href === "/" || href.includes("?")) {
      return href === pathname;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }, [href, pathname]);

  const isExternal = /^(https?:)?\/\//i.test(href) || /^[a-z]+:/i.test(href);

  return (
    <Link
      href={href}
      className={cn(
        "opacity-80 hover:opacity-100 transition-opacity duration-200",
        isActive && !isMobile && "bg-muted/50 text-primary",
        className,
      )}
      target={openInNewTab || isExternal ? "_blank" : undefined}
      rel={openInNewTab || isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
      {isExternal && <ExternalLinkIcon className={cn(isMobile ? "size-3" : "size-4")} />}
    </Link>
  );
};
