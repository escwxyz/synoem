import { useAtom, useAtomValue } from "jotai";
import { sidebarOpenAtom, sidebarStateAtom, sidebarMobileOpenAtom } from "~/atoms/sidebar";
import { useCallback } from "react";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom);

  const [openMobile, setOpenMobile] = useAtom(sidebarMobileOpenAtom);

  const state = useAtomValue(sidebarStateAtom);

  const isMobile = useIsMobile();

  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((prev) => !prev) : setIsOpen((prev) => !prev);
  }, [isMobile, setOpenMobile, setIsOpen]);

  return {
    state,
    isOpen,
    setIsOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  };
};
