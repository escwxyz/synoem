"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@synoem/ui/components/button";

import type {
  Image as ImageType,
  Product,
} from "@synoem/payload/payload-types";
import { getProductUrl } from "~/utils/get-product-url";
import { Image } from "@unpic/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@synoem/ui/components/carousel";
import { getUrl } from "~/utils/get-url";
import { useTranslations } from "~/i18n/utils";

type Props = {
  relatedProducts: Product[];
};

export const RelatedProducts = ({ relatedProducts }: Props) => {
  const { t } = useTranslations();

  if (
    relatedProducts.length === 0 ||
    relatedProducts.some((product) => typeof product.coverImage === "number")
  ) {
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
        <h2 className="text-2xl font-bold">
          {t("Component.RelatedProducts.title")}
        </h2>
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
            const { coverImage } = relatedProduct;

            return (
              <CarouselItem
                key={relatedProduct.id}
                className="basis-1 md:basis-1/3"
              >
                <div className="space-y-3">
                  <a href={getProductUrl(relatedProduct)}>
                    <Image
                      src={getUrl((coverImage as ImageType).url || "")}
                      alt={(coverImage as ImageType).alt || ""}
                      aspectRatio={1}
                      width={400}
                      layout="constrained"
                      className="w-full h-full object-cover rounded-lg max-w-[400px]"
                    />
                  </a>

                  <div className="space-y-1 text-center">
                    <h3 className="font-medium text-sm">
                      {relatedProduct.title}
                    </h3>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <a href={getProductUrl(relatedProduct)}>
                      {t("Component.RelatedProducts.viewDetails")}
                    </a>
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
