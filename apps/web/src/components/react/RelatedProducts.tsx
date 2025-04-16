// TODO

"use client";

import { Card, CardContent } from "@synoem/ui/components/card";
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

type Props = {
  relatedProducts: (SolarPanel | number)[] | (PumpController | number)[];
};

export function RelatedProducts({ relatedProducts }: Props) {
  if (relatedProducts.length === 0) {
    return null;
  }

  if (relatedProducts.some((product) => typeof product === "number")) {
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
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            id="prev-related"
            aria-label="Previous related products"
            onClick={() => api?.scrollPrev()}
            disabled={current === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            id="next-related"
            aria-label="Next related products"
            onClick={() => api?.scrollNext()}
            disabled={current === count - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {relatedProducts.map((relatedProduct) => {
            const product = relatedProduct as SolarPanel | PumpController;
            const { cover } = product;

            return (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/4"
              >
                <Card className="h-full">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {typeof cover === "number" ? (
                        <div>TODO</div>
                      ) : (
                        <Image
                          src={getUrl(cover.url || "")}
                          aspectRatio={4 / 3}
                          height={400}
                        />
                      )}
                      <div className="space-y-1 text-center">
                        <h3 className="font-medium text-sm">{product.title}</h3>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <a href={getProductUrl(product)}>View Details</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
