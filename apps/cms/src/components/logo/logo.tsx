"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LOGO_PATHS } from "@synoem/config";

export const Logo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.dataset.theme === "dark");
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Image
      src={isDarkMode ? LOGO_PATHS.dark : LOGO_PATHS.light}
      alt="Company Logo"
      width={160}
      height={160}
      priority={true}
    />
  );
};
