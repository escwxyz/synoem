import { Button, type ButtonProps } from "@synoem/ui/components/button";
import { cn } from "@synoem/ui/lib/utils";
import { Link } from "@/i18n/navigation";

import type { LinkType } from "@synoem/types";
import { getLinkConfig } from "@/app/utils";

type CMSLinkType = LinkType & {
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  size?: ButtonProps["size"] | null;
  url?: string | null;
};

export const CMSLink = (props: CMSLinkType) => {
  const {
    appearance = "inline",
    children,
    className,
    label,
    newTab,
    size: sizeFromProps,
    url,
  } = props;

  const href = getLinkConfig(props);

  if (!href) return null;

  const size = appearance === "default" ? null : sizeFromProps;
  const newTabProps = newTab ? { rel: "noopener noreferrer", target: "_blank" } : {};

  /* Ensure we don't break any styles set by richText */
  if (appearance === "inline") {
    return (
      <Link className={cn(className)} href={href || url || ""} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    );
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ""} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  );
};
