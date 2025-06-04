"use client";

import { useAtom } from "jotai";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { scrollLockAtom } from "~/atoms/scroll-lock";

export const useScrollLock = () => {
  const [shouldLock] = useAtom(scrollLockAtom);
  const lenis = useLenis();

  useEffect(() => {
    if (shouldLock) {
      if (!document.body.classList.contains("overflow-hidden")) {
        document.body.classList.add("overflow-hidden");
      }
      lenis?.stop();
    } else {
      if (document.body.classList.contains("overflow-hidden")) {
        document.body.classList.remove("overflow-hidden");
      }
      lenis?.start();
    }
  }, [shouldLock, lenis]);

  return null;
};
