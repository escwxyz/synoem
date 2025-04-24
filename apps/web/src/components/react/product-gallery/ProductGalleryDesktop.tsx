// TODO: animation

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
import { ProductModelViewer } from "../ProductModelViewer";
import { ViewSwitch } from "./ViewSwitch";
import { motion, AnimatePresence } from "motion/react";
import { modelViewerStateStore } from "~/stores/model-view";

export function ProductGalleryDesktop({ images, three, locale }: Props) {
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

  useEffect(() => {
    return () => {
      modelViewerStateStore.set({
        galleryModelActive: false,
      });
    };
  }, []);

  const handleThumbnailClick = (index: number) => {
    setCurrent(index);
    setSelectedImage(images[index]);
  };

  const toggleModelView = () => {
    const newState = !showModelView;

    modelViewerStateStore.set({
      galleryModelActive: newState,
    });

    setShowModelView(newState);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="relative rounded-lg overflow-hidden">
        {showModelView ? (
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden">
            <ProductModelViewer
              three={three}
              key={`gallery-model-${Date.now()}`}
              locale={locale}
            />
          </div>
        ) : (
          <Image
            src={getUrl(selectedImage.url)}
            alt={selectedImage.alt}
            layout="fullWidth"
            height={600}
            className="w-full object-cover rounded-lg"
          />
        )}

        {hasModel && (
          <div className="absolute bottom-4 right-4 z-10">
            <ViewSwitch onClick={toggleModelView} isActive={showModelView} />
          </div>
        )}
      </div>
      <AnimatePresence initial={false}>
        {!showModelView && (
          <motion.div
            key="thumbnails"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
