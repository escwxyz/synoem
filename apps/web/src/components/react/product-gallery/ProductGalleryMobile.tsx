"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@synoem/ui/components/carousel";
import { Image } from "@unpic/react";
import type { Props } from "./types";
import { getUrl } from "~/utils/get-url";

export const ProductGalleryMobile = ({ images }: Props) => {
  if (images.length === 0) {
    console.warn("ProductGalleryMobile: No images provided");
    return null;
  }

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent className="rounded-lg">
        {images.map((image) => (
          <CarouselItem key={image.id} className="w-full h-full">
            <Image
              src={getUrl(image.url)}
              alt={image.alt}
              aspectRatio={1}
              width={500}
              layout="constrained"
              className="w-full h-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden" />
      <CarouselNext className="hidden" />
    </Carousel>
  );
};
