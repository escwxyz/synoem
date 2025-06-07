"use client";

import { DynamicIcon, type IconName as LucideIconName } from "lucide-react/dynamic";
import type { IconName } from "@synoem/types";
import Image from "next/image";

interface Props {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size = 20, className }: Props) => {
  const parts = name.split(":");
  const iconName = parts.length === 2 ? parts[1] : null;

  if (!iconName) {
    return null;
  }

  if (name.startsWith("lucide:")) {
    return <DynamicIcon size={size} name={iconName as LucideIconName} className={className} />;
  }

  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_S3_ENDPOINT}/object/public/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}/icons/${iconName}.svg`}
      alt={name}
      width={size}
      height={size}
      unoptimized
      className={className}
    />
  );
};
