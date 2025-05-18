import { createElement } from "react";
import * as LucideIcons from "@lucide/astro";
import type { AstroComponent } from "@lucide/astro";

export type IconProps = {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
};

export const getIconComponent = (iconName?: string): AstroComponent | null => {
  if (!iconName) return null;
  return (LucideIcons[iconName as keyof typeof LucideIcons] as AstroComponent) || null;
};

export const createIcon = (iconName?: string, props: IconProps = {}) => {
  const IconComponent = getIconComponent(iconName);
  if (!IconComponent) return null;
  return createElement(IconComponent, props);
};
