import type { LinkType } from "@synoem/types";

export const getMenuLinkConfig = (
  link?: LinkType | null,
): {
  href: string;
  openInNewTab: boolean;
  appearance?: "default" | "outline";
} | null => {
  if (!link) return null;

  if (link.type === "external" && link.external) {
    return {
      href: link.external,
      openInNewTab: true,
      appearance: link.appearance ?? "default",
    };
  }

  if (link.type === "relative" && link.relative) {
    return {
      href: link.relative,
      openInNewTab: false,
      appearance: link.appearance ?? "default",
    };
  }

  if (link.type === "internal" && link.internal) {
    if (typeof link.internal.value !== "object") {
      console.warn("Internal link is not populated", link);
      return null;
    }

    const href = link.internal.value.slug;

    return {
      href,
      openInNewTab: false,
      appearance: link.appearance ?? "default",
    };
  }

  return null;
};
