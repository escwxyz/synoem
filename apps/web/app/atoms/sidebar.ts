import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const sidebarOpenAtom = atomWithStorage<boolean>("sidebar_open", false);

export const sidebarMobileOpenAtom = atom<boolean>(false);

export const sidebarStateAtom = atom((get) => (get(sidebarOpenAtom) ? "expanded" : "collapsed"));
