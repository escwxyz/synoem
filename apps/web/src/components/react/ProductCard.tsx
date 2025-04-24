"use client";

import type { Product } from "@synoem/payload/payload-types";
import { Image } from "@unpic/react";
import { getProductUrl } from "~/utils/get-product-url";
import { isPumpController, isSolarPanel } from "~/utils/check-product-type";
import { useMediaQuery } from "usehooks-ts";
import { RequestQuoteDesktop, RequestQuoteMobile } from "~/components/react";
import { Bolt, Sun, Zap } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import { Card, CardContent, CardFooter } from "@synoem/ui/components/card";
import { getEfficiencyRange } from "~/utils/get-efficiency-range";
import { getLocaleFromUrl, useTranslations } from "~/i18n/utils";
import type { Locale } from "@synoem/config";

export const ProductCard = ({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) => {
  const { t } = useTranslations(locale);

  const { coverImage, title, gallery, three } = product;

  const hasModel = three?.enabled && three?.model;

  const url = getProductUrl(product);

  const imageUrl =
    typeof gallery[0] === "number"
      ? typeof coverImage === "number"
        ? null
        : coverImage.url
      : gallery[0].url;

  const tagText = isSolarPanel(product)
    ? // biome-ignore lint/style/noNonNullAssertion: <explanation>
      product.solarPanel![0].type!.toUpperCase()
    : product.pumpController?.[0].type.toUpperCase();

  const excerpt = `${product.excerpt.slice(0, 70)}...`;

  const efficiencyRange = () => {
    if (isSolarPanel(product) && product.solarPanel?.[0].power?.points) {
      // biome-ignore lint/style/noNonNullAssertion: powerRange.points is not null
      const { min, max } = getEfficiencyRange(
        product.solarPanel?.[0].power?.points,
      )!;
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
            {hasModel && (
              <div className="absolute top-3 left-3">
                <span className="min-w-[72px] inline-flex justify-center items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-2xl text-muted-foreground bg-muted/50 shadow-sm">
                  3D
                </span>
              </div>
            )}
            <div className="absolute top-3 right-3">
              <span className="min-w-[72px] inline-flex justify-center items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-2xl text-muted-foreground bg-muted/50 shadow-sm">
                {tagText}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-grow p-4 gap-2">
            <h3 className="font-semibold text-lg line-clamp-2 mb-1">{title}</h3>

            {isSolarPanel(product) && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>
                    {product.solarPanel?.[0].power?.min}W ~{" "}
                    {product.solarPanel?.[0].power?.max}W
                  </span>
                </div>
                {product.solarPanel?.[0].power?.points?.[0]?.efficiency && (
                  <div className="flex items-center gap-2 text-sm">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <span>{efficiencyRange()}</span>
                  </div>
                )}
              </>
            )}

            {isPumpController(product) && (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>
                    {t("Component.ProductCard.maxVoltage")}:{" "}
                    {product.pumpController?.[0].maxVoltage}V
                  </span>
                </div>
                {product.pumpController?.[0].maxCurrent && (
                  <div className="flex items-center gap-2 text-sm">
                    <Bolt className="h-4 w-4 text-amber-500" />
                    <span>
                      {t("Component.ProductCard.maxCurrent")}:{" "}
                      {product.pumpController?.[0].maxCurrent}A
                    </span>
                  </div>
                )}
              </>
            )}
            <p className="text-sm line-clamp-2 mb-auto">{excerpt}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 w-full flex flex-col gap-2">
          {isDesktop ? (
            <RequestQuoteDesktop
              product={product}
              locale={locale}
              className="w-full"
              size="sm"
            />
          ) : (
            <RequestQuoteMobile
              product={product}
              locale={locale}
              className="w-full"
              size="sm"
            />
          )}
          <Button asChild size="sm" variant="outline" className="w-full">
            <a href={url}>{t("Component.ProductCard.viewDetails")}</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
