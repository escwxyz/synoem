import type { Image as ImageType } from "@synoem/types";
import { atom } from "jotai";
import { productModelViewAtom } from "./product-model-view";

export const galleryIndexAtom = atom<number>(0);

export const selectedImageAtom = atom<ImageType | null>(null);

export const galleryStateAtom = atom(
  (get) => ({
    currentIndex: get(galleryIndexAtom),
    selectedImage: get(selectedImageAtom),
    showModelView: get(productModelViewAtom),
  }),
  (get, set, update: { currentIndex?: number; selectedImage?: ImageType | null }) => {
    if (update.currentIndex !== undefined) {
      set(galleryIndexAtom, update.currentIndex);
    }
    if (update.selectedImage !== undefined) {
      set(selectedImageAtom, update.selectedImage);
    }
  },
);
