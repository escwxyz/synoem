"use client";

import type { SolarPanel, PumpController, Image as ImageType } from "@synoem/types";
import { cn } from "@synoem/ui/lib/utils";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import {
  galleryIndexAtom,
  productModelViewAtom,
  selectedImageAtom,
  selectedVariantStore,
} from "~/atoms";
import { ProductGallerySwitch } from "../product-gallery-switch.client";
import { ProductVariantSwatch } from "./product-variant-swatch.client";
import { ProductVariantInfo } from "./product-variant-info";
import { useTranslations } from "next-intl";
import { getUrl } from "~/utils/get-url";
import { RichText } from "~/components/rich-text.client";
import ImageCarousel_Basic from "~/components/image-carousel.client";

import dynamic from "next/dynamic";

const ProductModelViewer = dynamic(
  () => import("~/components/product-model-viewer.client").then((mod) => mod.ProductModelViewer),
  {
    ssr: false,
  },
);

const OemInfo = dynamic(() => import("~/components/oem-info.client").then((mod) => mod.OemInfo), {
  ssr: false,
});

interface Props {
  product: SolarPanel | PumpController;
}

export const ProductOverviewTab = ({ product }: Props) => {
  const { description, gallery, three, variants } = product;

  const [selectedVariant] = useAtom(selectedVariantStore);
  const [, setGalleryIndex] = useAtom(galleryIndexAtom);
  const [, setSelectedImage] = useAtom(selectedImageAtom);
  const [showModelView, setShowModelView] = useAtom(productModelViewAtom);

  const toggleModelView = () => {
    setShowModelView(!showModelView);
  };

  const allImages = useMemo(() => {
    const baseImages =
      gallery && gallery.length > 0
        ? gallery.filter((image): image is ImageType => typeof image === "object" && !!image.url)
        : [];

    if (!selectedVariant) {
      const variantFirstImages =
        variants
          .map((variant) => {
            if (variant.gallery && variant.gallery.length > 0) {
              const firstImage = variant.gallery.find(
                (image): image is ImageType => typeof image === "object" && !!image.url,
              );
              return firstImage;
            }
            return null;
          })
          .filter(Boolean) ?? [];

      return [...baseImages, ...(variantFirstImages as ImageType[])];
    }

    const variant = variants.find((v) => v.sku === selectedVariant.sku);
    if (!variant || !variant.gallery) return baseImages;

    const variantImages = variant.gallery.filter(
      (image): image is ImageType => typeof image === "object" && !!image.url,
    );

    return [...baseImages, ...variantImages];
  }, [gallery, variants, selectedVariant]);

  useEffect(() => {
    if (allImages.length > 0) {
      setGalleryIndex(0);
      setSelectedImage(allImages[0] as ImageType);
    }
  }, [allImages, setGalleryIndex, setSelectedImage]);

  const hasImages = allImages.length > 0;

  if (!hasImages) {
    console.warn("ProductGallery: No images provided");
    return null;
  }

  const handleVariantChange = (
    variant: SolarPanel["variants"][number] | PumpController["variants"][number] | null,
  ) => {
    if (variant?.gallery && variant.gallery.length > 0) {
      setGalleryIndex(0);
      setSelectedImage(variant.gallery[0] as ImageType);
    }
  };

  const hasModel = three?.model && typeof three.model === "object" && three.model?.url;

  const hasPackagingConfig = product.packagingConfig;

  const t = useTranslations("ProductOverview");

  return (
    <>
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div
            className={cn(
              "order-1",
              variants && variants.length > 0 ? "md:col-span-3" : "md:col-span-5",
            )}
          >
            <div className="relative">
              {hasModel && showModelView ? (
                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden">
                  <ProductModelViewer three={three} key={`gallery-model-${Date.now()}`} />
                </div>
              ) : (
                <ImageCarousel_Basic
                  images={allImages.map((image) => ({
                    url: getUrl(image.url || ""),
                    title: image.alt || "",
                  }))}
                  showCarouselControls={false}
                  imageFit="cover"
                />
              )}

              {hasModel && (
                <div className="absolute top-8 left-8 z-10">
                  <ProductGallerySwitch onClick={toggleModelView} isActive={showModelView} />
                </div>
              )}
            </div>
            {/* {isMobile ? (
            <ProductGalleryMobile images={allImages} three={three} />
          ) : (
            <ProductGalleryDesktop images={allImages} three={three} />
          )} */}
          </div>
          <div className="order-2 md:col-span-2 flex flex-col gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("productDescription")}</h2>
              <RichText data={description} />
            </div>
            {variants && variants.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Customize your product</h2>
                <ProductVariantSwatch variants={variants} onVariantChange={handleVariantChange} />

                <ProductVariantInfo />
              </div>
            )}
          </div>
        </div>
      </section>
      {hasPackagingConfig && (
        <OemInfo productTypeId={"solar-panel"} oemInfo={product as SolarPanel} />
      )}
    </>
  );
};
