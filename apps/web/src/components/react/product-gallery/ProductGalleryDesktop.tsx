"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@synoem/ui/components/carousel";
import { Button } from "@synoem/ui/components/button";
import { Image } from "@unpic/react";
import { cn } from "@synoem/ui/lib/utils";
import { getUrl } from "~/utils/get-url";
import type { Props, GalleryImage } from "./types";
import { Play } from "lucide-react";
import { ProductModelViewer } from "../ProductModelViewer";

export function ProductGalleryDesktop({ images, three }: Props) {
  if (images.length === 0) {
    console.warn("ProductGalleryDesktop: No images provided");
    return null;
  }

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<GalleryImage>(images[0]);
  const [showModelView, setShowModelView] = useState(false);

  const hasModel =
    three?.model && typeof three.model !== "number" && three.model?.url;

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

  if (showModelView) {
    return (
      <div className="space-y-4 w-full">
        <div className="relative">
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden">
            <ProductModelViewer three={three} />
            <Button
              variant="outline"
              className="absolute top-4 right-4 max-w-fit rounded-full p-2 shadow-md backdrop-blur-sm transition-all"
              onClick={() => setShowModelView(false)}
            >
              Back to Photos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={getUrl(selectedImage.url)}
          alt={selectedImage.alt}
          layout="fullWidth"
          height={600}
          className="w-full object-cover rounded-lg"
        />
        {hasModel && (
          <Button
            variant="outline"
            className="absolute bottom-4 right-4 rounded-full p-2 shadow-md backdrop-blur-sm transition-all flex items-center gap-2"
            onClick={() => setShowModelView(true)}
          >
            <Play size={18} />
            <span>Play 3D View</span>
          </Button>
        )}
      </div>
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
            <CarouselItem key={image.id} className="ml-1 basis-1/6 py-1">
              <Button
                variant="ghost"
                className={cn(
                  "relative aspect-square overflow-hidden rounded-md p-0 h-auto w-full",
                  "transition-transform duration-200",
                  current === index
                    ? "ring-2 ring-primary opacity-100"
                    : "opacity-60 hover:opacity-100 ring-0",
                )}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={getUrl(image.url)}
                  alt={image.alt}
                  width={200}
                  aspectRatio={1}
                  className="h-full w-full object-cover rounded-md"
                />
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
