"use client";

import dynamic from "next/dynamic";
import type { SolarPanel, PumpController } from "@synoem/types";
import { Button } from "@synoem/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@synoem/ui/components/carousel";
import { ProductGallerySwitch } from "./product-gallery-switch.client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { cn } from "@synoem/ui/lib/utils";
import { getUrl } from "~/utils/get-url";
import type { Image as ImageType } from "@synoem/types";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useAtom } from "jotai";

import { galleryIndexAtom, selectedImageAtom, productModelViewAtom } from "~/atoms";

const ProductModelViewer = dynamic(
  () => import("./product-model-viewer.client").then((mod) => mod.ProductModelViewer),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);

interface Props {
  images: ImageType[];
  three: SolarPanel["three"] | PumpController["three"];
}

export const ProductGalleryMobile = ({ images, three }: Props) => {
  if (images.length === 0) {
    console.warn("ProductGalleryMobile: No images provided");
    return null;
  }

  const [api, setApi] = useState<CarouselApi>();
  const [galleryIndex, setGalleryIndex] = useAtom(galleryIndexAtom);
  const [, setSelectedImage] = useAtom(selectedImageAtom);
  const [showModelView, setShowModelView] = useAtom(productModelViewAtom);

  const hasModel = three?.model && typeof three.model === "object" && three.model?.url;

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      setGalleryIndex(selectedIndex);
      setSelectedImage(images[selectedIndex] ?? null);
    });
  }, [api, images, setGalleryIndex, setSelectedImage]);

  useEffect(() => {
    if (api && typeof galleryIndex === "number") {
      api.scrollTo(galleryIndex);
    }
  }, [galleryIndex, api]);

  const handleDotClick = (index: number) => {
    setGalleryIndex(index);
    setSelectedImage(images[index] ?? null);
  };
  const toggleModelView = () => {
    setShowModelView(!showModelView);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        {hasModel && showModelView ? (
          <ProductModelViewer three={three} />
        ) : (
          <Carousel className="w-full h-full rounded-lg" setApi={setApi}>
            <CarouselContent className="rounded-lg h-full">
              {images.map((image) => (
                <CarouselItem key={image.id} className="w-full h-full rounded-lg">
                  <Image
                    src={getUrl(image.url ?? "")}
                    alt={image.alt}
                    fill
                    className="w-full h-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-4 left-0 right-0 z-10 w-full flex justify-center">
              {new Array(images.length).fill(0).map((_, index) => (
                <button
                  key={images[index]?.id}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    "w-3 h-3 rounded-full bg-muted/50 mx-2 shadow-sm",
                    galleryIndex === index && "bg-accent",
                  )}
                />
              ))}
            </div>
          </Carousel>
        )}

        {hasModel && (
          <div className="absolute bottom-4 right-4 z-10">
            <ProductGallerySwitch onClick={toggleModelView} isActive={showModelView} />
          </div>
        )}
      </div>
    </div>
  );
};

export const ProductGalleryDesktop = ({ images, three }: Props) => {
  if (images.length === 0) {
    console.warn("ProductGalleryDesktop: No images provided");
    return null;
  }

  const [api, setApi] = useState<CarouselApi>();
  const [galleryIndex, setGalleryIndex] = useAtom(galleryIndexAtom);
  const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom);
  const [showModelView, setShowModelView] = useAtom(productModelViewAtom);

  const hasModel = three?.model && typeof three.model === "object" && three.model?.url;

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      setGalleryIndex(selectedIndex);
      setSelectedImage(images[selectedIndex] ?? null);
    });
  }, [api, images, setGalleryIndex, setSelectedImage]);

  useEffect(() => {
    if (api && typeof galleryIndex === "number") {
      api.scrollTo(galleryIndex);
    }
  }, [galleryIndex, api]);

  useEffect(() => {
    // Initialize gallery state if not set
    if (!selectedImage && images.length > 0) {
      setSelectedImage(images[0] as ImageType);
      setGalleryIndex(0);
    }
  }, [selectedImage, images, setGalleryIndex, setSelectedImage]);

  const handleThumbnailClick = (index: number) => {
    setGalleryIndex(index);
    setSelectedImage(images[index] ?? null);
  };

  const toggleModelView = () => {
    setShowModelView(!showModelView);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="relative rounded-lg overflow-hidden">
        {hasModel && showModelView ? (
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden">
            <ProductModelViewer three={three} key={`gallery-model-${Date.now()}`} />
          </div>
        ) : (
          <Image
            src={getUrl(selectedImage?.url ?? "")}
            alt={selectedImage?.alt ?? ""}
            layout="fullWidth"
            height={500}
            className="w-full object-cover rounded-lg"
          />
        )}

        {hasModel && (
          <div className="absolute bottom-4 right-4 z-10">
            <ProductGallerySwitch onClick={toggleModelView} isActive={showModelView} />
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
                        galleryIndex === index
                          ? "ring-2 ring-primary opacity-100"
                          : "opacity-60 hover:opacity-100 ring-0",
                      )}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <Image
                        src={getUrl(image.url ?? "")}
                        alt={image.alt}
                        width={200}
                        height={200}
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
};
