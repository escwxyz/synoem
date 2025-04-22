import type { Product } from "@synoem/payload/payload-types";

export interface GalleryImage {
  id: number | string;
  url: string;
  alt: string;
}

export interface Props {
  images: GalleryImage[];
  three?: Product["three"];
}
