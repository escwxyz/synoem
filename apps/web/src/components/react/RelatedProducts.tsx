// TODO

"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@synoem/ui/components/button";

import type { PumpController, SolarPanel } from "@synoem/payload/payload-types";
import { getProductUrl } from "~/utils/get-product-url";
import { Image } from "@unpic/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@synoem/ui/components/carousel";
import { getUrl } from "~/utils/get-url";
import { cn } from "@synoem/ui/lib/utils";

type Props = {
  relatedProducts: (SolarPanel | PumpController)[];
};

export const RelatedProducts = ({ relatedProducts }: Props) => {
  if (relatedProducts.length === 0) {
    return null;
  }

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="mt-16 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Maybe you'll like these</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            id="prev-related"
            aria-label="Previous related products"
            onClick={() => api?.scrollPrev()}
            disabled={current === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            id="next-related"
            aria-label="Next related products"
            onClick={() => api?.scrollNext()}
            disabled={current === count - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Carousel
        className="w-full max-w-[400px] md:max-w-[100vw] rounded-lg"
        setApi={setApi}
      >
        <CarouselContent className="md:-ml-4 rounded-lg">
          {relatedProducts.map((relatedProduct) => {
            const product = relatedProduct as SolarPanel | PumpController;
            const { cover } = product;

            return (
              <CarouselItem
                key={product.id}
                className={cn(
                  relatedProducts.length === 1 && "lg:basis-full",
                  relatedProducts.length === 2 && "lg:basis-1/2",
                  relatedProducts.length === 3 && "lg:basis-1/3",
                  relatedProducts.length === 4 && "lg:basis-1/4",
                )}
              >
                <div className="space-y-3">
                  {typeof cover === "number" ? (
                    <div>TODO</div>
                  ) : (
                    <Image
                      src={getUrl(cover.url || "")}
                      alt={cover.alt || ""}
                      aspectRatio={1}
                      width={400}
                      layout="constrained"
                      className="w-full h-full object-cover rounded-lg max-w-[400px]"
                    />
                  )}
                  <div className="space-y-1 text-center">
                    <h3 className="font-medium text-sm">{product.title}</h3>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <a href={getProductUrl(product)}>View Details</a>
                  </Button>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
