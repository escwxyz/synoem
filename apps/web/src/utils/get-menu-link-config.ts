interface LinkType {
  type?: "internal" | "external" | undefined | null;
  url?: string | null;
}

interface LinkConfig {
  href: string;
  isExternal: boolean;
}

export function getMenuLinkConfig(link: LinkType | undefined): LinkConfig {
  if (!link) {
    return {
      href: "#",
      isExternal: false,
    };
  }

  const isExternal = link?.type === "external";
  let href = "#";

  if (isExternal && link.url) {
    href = link.url.startsWith("http") ? link.url : `https://${link.url}`;
  }

  return {
    href,
    isExternal,
  };
}
