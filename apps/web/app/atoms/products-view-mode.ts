import { atomWithStorage } from "jotai/utils";

export const productsViewModeAtom = atomWithStorage<"grid" | "list">("products-view-mode", "grid");
