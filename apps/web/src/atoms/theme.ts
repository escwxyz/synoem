import { persistentAtom } from "@nanostores/persistent";

export const themeAtom = persistentAtom<"light" | "dark" | "system">("theme", "system");
