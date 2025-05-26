import React from "react";
import Image from "next/image";

export const NavIcon = () => {
  return (
    <Image
      src="/logos/logo-transparent.svg"
      alt="Nav Icon"
      width={18}
      height={18}
      priority={true}
      unoptimized
    />
  );
};
