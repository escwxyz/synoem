"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@synoem/ui/components/carousel";
import { Button } from "@synoem/ui/components/button";
import { Image } from "@unpic/react";
import type { Props } from "./types";
import { getUrl } from "~/utils/get-url";
import { useEffect, useState } from "react";
import { cn } from "@synoem/ui/lib/utils";
import { Play } from "lucide-react";
import { ProductModelViewer } from "../ProductModelViewer";

export const ProductGalleryMobile = ({ images, three }: Props) => {
  if (images.length === 0) {
    console.warn("ProductGalleryMobile: No images provided");
    return null;
  }

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [showModelView, setShowModelView] = useState(false);

  const hasModel =
    three?.model && typeof three.model !== "number" && three.model?.url;

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrent(selectedIndex);
    });
  }, [api]);

  useEffect(() => {
    if (api && typeof current === "number") {
      api.scrollTo(current);
    }
  }, [current, api]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  if (showModelView) {
    return (
      <div className="w-full flex flex-col">
        <div className="relative w-full aspect-square">
          <ProductModelViewer three={three} />
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 z-10 rounded-full p-1.5 shadow-md backdrop-blur-sm"
            onClick={() => setShowModelView(false)}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <Carousel className="w-full h-full rounded-lg" setApi={setApi}>
          <CarouselContent className="rounded-lg h-full">
            {images.map((image) => (
              <CarouselItem key={image.id} className="w-full h-full rounded-lg">
                <Image
                  src={getUrl(image.url)}
                  alt={image.alt}
                  aspectRatio={1}
                  layout="fullWidth"
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-0 right-0 z-10 w-full flex justify-center">
            {new Array(images.length).fill(0).map((_, index) => (
              <button
                key={images[index].id}
                type="button"
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-3 h-3 rounded-full bg-white/50 mx-2",
                  current === index && "bg-white",
                )}
              />
            ))}
          </div>
        </Carousel>
        {hasModel && (
          <Button
            variant="outline"
            size="sm"
            className="absolute bottom-4 right-4 z-10 rounded-full p-1.5 shadow-md backdrop-blur-sm flex items-center gap-1"
            onClick={() => setShowModelView(true)}
          >
            <Play size={14} />
            <span className="text-xs">3D View</span>
          </Button>
        )}
      </div>
    </div>
  );
};
