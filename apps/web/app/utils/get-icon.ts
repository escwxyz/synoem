import { createElement } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconProps = {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
};

export const getIconComponent = (iconName?: string): LucideIcon | null => {
  if (!iconName) return null;
  return (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon) || null;
};

export const createIcon = (iconName?: string, props: IconProps = {}) => {
  const IconComponent = getIconComponent(iconName);
  if (!IconComponent) return null;
  return createElement(IconComponent, props);
};
