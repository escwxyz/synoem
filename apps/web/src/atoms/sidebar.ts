import { persistentAtom } from "@nanostores/persistent";

export const sidebarOpenAtom = persistentAtom<boolean>("sidebar_open", false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const sidebarMobileOpenAtom = persistentAtom<boolean>("sidebar_mobile_open", false, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const getSidebarState = () => (sidebarOpenAtom.get() ? "expanded" : "collapsed");

export function toggleDesktopSidebar() {
  const currentValue = sidebarOpenAtom.get();
  sidebarOpenAtom.set(!currentValue);
}

export function toggleMobileSidebar() {
  const currentValue = sidebarMobileOpenAtom.get();
  sidebarMobileOpenAtom.set(!currentValue);
}
