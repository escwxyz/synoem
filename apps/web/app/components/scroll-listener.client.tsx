"use client";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { showInHeaderAtom } from "~/atoms";

export function ScrollListener() {
  const setShowInHeader = useSetAtom(showInHeaderAtom);

  useEffect(() => {
    const onScroll = () => {
      setShowInHeader(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [setShowInHeader]);

  return null;
}
