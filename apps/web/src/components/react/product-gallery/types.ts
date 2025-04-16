export interface GalleryImage {
  id: number | string;
  url: string;
  alt: string;
}

export interface Props {
  images: GalleryImage[];
}
