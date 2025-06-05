"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { showInHeaderAtom } from "~/atoms";
import { useScroll } from "motion/react";

export function ScrollListener() {
  const setShowInHeader = useSetAtom(showInHeaderAtom);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setShowInHeader(latest > 0.2);
    });
  }, [scrollYProgress, setShowInHeader]);

  return null;
}
