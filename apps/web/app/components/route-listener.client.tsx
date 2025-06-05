"use client";

import { usePathname } from "@/i18n/navigation";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { showInHeaderAtom } from "~/atoms";

export function RouteListener() {
  const pathname = usePathname();
  const setShowInHeader = useSetAtom(showInHeaderAtom);

  useEffect(() => {
    setShowInHeader(pathname !== "/");
  }, [pathname, setShowInHeader]);

  return null;
}
