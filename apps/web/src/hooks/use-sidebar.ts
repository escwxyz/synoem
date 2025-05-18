import { useStore } from "@nanostores/react";
import { sidebarOpenAtom, sidebarMobileOpenAtom } from "~/atoms/sidebar";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";

export function useSidebar() {
  const open = useStore(sidebarOpenAtom);
  const openMobile = useStore(sidebarMobileOpenAtom);

  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    console.log("toggleSidebar");

    if (isMobile) {
      sidebarMobileOpenAtom.set(!openMobile);
    } else {
      sidebarOpenAtom.set(!open);
    }
  };

  const setOpenMobile = (value: boolean) => {
    sidebarMobileOpenAtom.set(value);
  };

  return {
    isMobile,
    open,
    openMobile,
    state: open ? "expanded" : "collapsed",
    toggleSidebar,
    setOpenMobile,
  };
}
