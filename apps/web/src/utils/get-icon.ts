import { createElement } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

// 定义图标组件类型
export type IconProps = {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
};

// 获取图标组件函数 - 返回组件而不是JSX元素
export const getIconComponent = (iconName?: string): LucideIcon | null => {
  if (!iconName) return null;
  return (LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon) || null;
};

// 创建图标JSX元素
export const createIcon = (iconName?: string, props: IconProps = {}) => {
  const IconComponent = getIconComponent(iconName);
  if (!IconComponent) return null;
  return createElement(IconComponent, props);
};
