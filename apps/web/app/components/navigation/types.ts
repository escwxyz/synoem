import type { MegaMenuItems, MenuItems } from "@synoem/types";

export type MenuLinkProps = {
  href: string;
  openInNewTab?: boolean;
  children: React.ReactNode;
  className?: string;
};

export type LinksSectionProps = NonNullable<
  NonNullable<NonNullable<MegaMenuItems>[number]["linksSection"]>
>;

export type MenuItemProps = {
  item: NonNullable<MenuItems>[number] | NonNullable<MegaMenuItems>[number];
};

export type MenuBannerProps = {
  banner: NonNullable<NonNullable<MegaMenuItems>[number]["banner"]>;
};

export type NavigationProps = {
  items: NonNullable<MenuItems>;
};
