import { atom } from "nanostores";

export const modelViewerStateStore = atom<{
  galleryModelActive: boolean;
}>({
  galleryModelActive: false,
});
