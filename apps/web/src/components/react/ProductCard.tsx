"use client";

import type { Product } from "~/types/product";
import { Image } from "@unpic/react";
import { getProductUrl } from "~/utils/get-product-url";
import { isPumpController, isSolarPanel } from "~/utils/check-product-type";
import { useMediaQuery } from "usehooks-ts";
import { RequestQuoteDesktop, RequestQuoteMobile } from "~/components/react";
import { Bolt, Sun, Zap } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import type { ProductCategoryPluralSlug } from "@synoem/config";
import { Card, CardContent, CardFooter } from "@synoem/ui/components/card";
import { getEfficiencyRange } from "~/utils/get-efficiency-range";

export const ProductCard = ({
  product,
  category,
}: {
  product: Product;
  category: ProductCategoryPluralSlug;
}) => {
  const { cover, title } = product; // TODO: 3d model or video

  const url = getProductUrl(product);
  const imageUrl = typeof cover === "number" ? null : cover.url;

  const tagText = isSolarPanel(product)
    ? product.cell.type.toUpperCase()
    : product.type.toUpperCase();

  const description = `${product.desc.slice(0, 70)}...`;

  const efficiencyRange = () => {
    if (isSolarPanel(product) && product.powerRange.points) {
      // biome-ignore lint/style/noNonNullAssertion: powerRange.points is not null
      const { min, max } = getEfficiencyRange(product.powerRange.points)!;
      return `${min}% ~ ${max}%`;
    }
    return null;
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="group h-full flex flex-col overflow-hidden bg-muted rounded-lg shadow-sm hover:translate-y-[-5px] hover:shadow-md transition-all duration-300">
      <Card className="overflow-hidden h-full flex flex-col rounded-lg p-0 gap-4">
        <CardContent className="p-0 rounded-lg">
          <div className="relative aspect-[4/3] overflow-hidden">
            <a href={url} className="block w-full h-full">
              {imageUrl ? (
                <Image
                  src={imageUrl ?? ""}
                  alt={title}
                  height={300}
                  aspectRatio={4 / 3}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>{" "}
                  {/** TODO: placeholder image */}
                </div>
              )}
            </a>
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-xl text-muted-foreground bg-muted/50 shadow-sm">
                {tagText}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-grow p-4 gap-2">
            <h3 className="font-semibold text-lg line-clamp-2 mb-1">{title}</h3>

            {category === "solar-panels" && isSolarPanel(product) && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>
                    {product.powerRange?.min}W ~ {product.powerRange?.max}W
                  </span>
                </div>
                {product.powerRange?.points?.[0]?.efficiency && (
                  <div className="flex items-center gap-2 text-sm">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <span>{efficiencyRange()}</span>
                  </div>
                )}
              </>
            )}

            {category === "pump-controllers" && isPumpController(product) && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>Max Voltage: {product.maxVoltage}V</span>
                </div>
                {product.maxCurrent && (
                  <div className="flex items-center gap-2 text-sm">
                    <Bolt className="h-4 w-4 text-amber-500" />
                    <span>Max Current: {product.maxCurrent}A</span>
                  </div>
                )}
              </>
            )}
            <p className="text-sm line-clamp-2 mb-auto">{description}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 w-full flex flex-col gap-2">
          {isDesktop ? (
            <RequestQuoteDesktop
              product={product}
              className="w-full"
              size="sm"
            />
          ) : (
            <RequestQuoteMobile
              product={product}
              className="w-full"
              size="sm"
            />
          )}
          <Button asChild size="sm" variant="outline" className="w-full">
            <a href={url}>View Details</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
