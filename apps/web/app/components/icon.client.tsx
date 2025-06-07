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
  const iconName = name.split(":")[1];

  if (!iconName) {
    return null;
  }

  if (name.startsWith("lucide:")) {
    return <DynamicIcon size={size} name={iconName as LucideIconName} className={className} />;
  }

  return (
    <Image
      src={`${process.env.S3_ENDPOINT}/object/public/${process.env.S3_BUCKET_NAME}/icons/${iconName}.svg`}
      alt={name}
      width={size}
      height={size}
      unoptimized
      className={className}
    />
  );
};
