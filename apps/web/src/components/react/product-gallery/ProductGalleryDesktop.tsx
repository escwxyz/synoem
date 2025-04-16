"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@synoem/ui/components/carousel";
import type { CarouselApi } from "@synoem/ui/components/carousel";
import { Image } from "@unpic/react";
import { cn } from "@synoem/ui/lib/utils";
import { getUrl } from "~/utils/get-url";
import type { Props, GalleryImage } from "./types";

export function ProductGalleryDesktop({ images }: Props) {
  if (images.length === 0) {
    console.warn("ProductGalleryDesktop: No images provided");
    return null;
  }

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage>(images[0]);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrent(selectedIndex);
      setSelectedImage(images[selectedIndex]);
    });
  }, [api, images]);

  useEffect(() => {
    if (api && typeof current === "number") {
      api.scrollTo(current);
    }
  }, [current, api]);

  const handleThumbnailClick = (index: number) => {
    setCurrent(index);
    setSelectedImage(images[index]);
  };

  return (
    <div className="space-y-4 w-full">
      {/* 主图显示 */}
      <Image
        src={getUrl(selectedImage.url)}
        alt={selectedImage.alt}
        layout="constrained"
        aspectRatio={5 / 4}
        height={800}
        className="w-full object-contain rounded-lg"
      />
      {/* 缩略图轮播 */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
          containScroll: "trimSnaps",
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem
              key={image.id}
              className="pl-2 md:pl-4 basis-1/5 md:basis-1/6"
            >
              <button
                type="button"
                className={cn(
                  "relative aspect-square overflow-hidden rounded-md border cursor-pointer transition-all",
                  current === index
                    ? "opacity-100 border-muted"
                    : "opacity-50 hover:opacity-100",
                )}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={getUrl(image.url)}
                  alt={image.alt}
                  width={200}
                  aspectRatio={1}
                  className="h-full w-full object-cover"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
