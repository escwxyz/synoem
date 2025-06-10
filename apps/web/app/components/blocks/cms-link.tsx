import { Button, type ButtonProps } from "@synoem/ui/components/button";
import { cn } from "@synoem/ui/lib/utils";
import { Link } from "@/i18n/navigation";

import type { LinkType } from "@synoem/types";
import { getLinkConfig } from "@/app/utils";

type CMSLinkType = LinkType & {
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
} & Omit<ButtonProps, "href" | "type">;

export const CMSLink = (props: CMSLinkType) => {
  const { appearance = "inline", children, className, label, type, ...rest } = props;

  const linkConfig = getLinkConfig(props);

  if (!linkConfig) return null;

  const { href, openInNewTab } = linkConfig;

  const newTabProps = openInNewTab ? { rel: "noopener noreferrer", target: "_blank" } : {};

  /* Ensure we don't break any styles set by richText */
  if (appearance === "inline") {
    return (
      <Link className={cn(className)} href={href || ""} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    );
  }

  return (
    <Button asChild className={className} variant={appearance} {...rest}>
      <Link className={cn(className)} href={href || ""} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  );
};
