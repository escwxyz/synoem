"use client";

import { Image } from "@unpic/react/nextjs";
import { PlugZap, Sun, Zap } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import { useTranslations } from "next-intl";
import { RequestQuoteButton } from "./request-quote-button.client";
import { Link } from "@/i18n/navigation";
import { getEfficiencyRange, getUrl, getProductLink } from "~/utils";
import { useSidebar } from "~/hooks/useSidebar";
import { cn } from "@synoem/ui/lib/utils";
import { productsViewModeAtom } from "~/atoms/products-view-mode";
import { useAtomValue } from "jotai";
import { motion, type Variants } from "motion/react";
import { ImagePlaceholder } from "@synoem/ui/components/image-placeholder";
import type { ProductTypeId, Locale } from "@synoem/config";
import type { ProductWithSelectFields } from "@synoem/api";
import type { PumpController, SolarPanel } from "@synoem/types";

export const ProductCard = <T extends ProductTypeId>({
  productTypeId,
  product,
  locale,
}: {
  productTypeId: T;
  product: ProductWithSelectFields<T> & { id: string };
  locale: Locale;
}) => {
  const t = useTranslations("ProductCard");

  const { coverImage, title, three } = product;

  const productsViewMode = useAtomValue(productsViewModeAtom);
  const isList = productsViewMode === "list";

  const hasModel = three?.enabled && three?.model;

  const hasImage = typeof coverImage === "object" && coverImage.url;

  const getBadgeText = () => {
    if (typeof product.productCategory !== "object") {
      console.warn("Product Category is not populated properly");
      return null;
    }

    return product.productCategory.slug.toUpperCase();
  };

  const excerpt = `${product.excerpt.slice(0, isList ? 150 : 70)}...`;

  const efficiencyRange = () => {
    if (productTypeId === "solar-panel" && (product as SolarPanel).power?.points) {
      //   biome-ignore lint/style/noNonNullAssertion: powerRange.points is not null
      const { min, max } = getEfficiencyRange((product as SolarPanel).power.points)!;
      return `${min}% ~ ${max}%`;
    }
    return null;
  };

  const voltageRange = () => {
    if (productTypeId === "pump-controller" && (product as PumpController).wideAmplitudeVoltage) {
      const { min, max } = (product as PumpController).wideAmplitudeVoltage;
      return `${min}V ~ ${max}V`;
    }
  };

  const maxCurrent = () => {
    if (productTypeId === "pump-controller" && (product as PumpController).maxCurrent) {
      return `${(product as PumpController).maxCurrent}A`;
    }
  };

  const { isOpen, isMobile } = useSidebar();

  const isDesktopAndSidebarClosed = !isMobile && !isOpen;

  const buttonContainerVariants: Variants = {
    grid: {
      flexDirection: isDesktopAndSidebarClosed ? "row" : "column",
      padding: isDesktopAndSidebarClosed ? "1rem" : "1rem",
      justifyContent: isDesktopAndSidebarClosed ? "space-between" : "flex-start",
      transition: { type: "spring", duration: 0.5, delay: 0.1 },
    },
    list: {
      flexDirection: "row",
      padding: "0",
      paddingTop: "1rem",
      justifyContent: "flex-start",
      transition: { type: "spring", duration: 0.5, delay: 0.1 },
    },
  };

  const itemVariants: Variants = {
    grid: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 0.3 },
    },
    list: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", duration: 0.3 },
    },
  };

  const cardVariants: Variants = {
    grid: {
      flexDirection: "column",
      height: "100%",
      transition: { type: "spring", duration: 0.5 },
    },
    list: {
      flexDirection: "row",
      height: "auto",
      transition: { type: "spring", duration: 0.5 },
    },
  };

  const imageContainerVariants: Variants = {
    grid: {
      width: "100%",
      flex: "0 0 auto",
      transition: { type: "spring", duration: 0.5 },
    },
    list: {
      width: "33.33%",
      flex: "0 0 33.33%",
      transition: { type: "spring", duration: 0.5 },
    },
  };

  const contentContainerVariants: Variants = {
    grid: {
      width: "100%",
      padding: "1rem",
      transition: { type: "spring", duration: 0.5 },
    },
    list: {
      width: "66.66%",
      padding: "1rem 1rem 1rem 0",
      transition: { type: "spring", duration: 0.5 },
    },
  };

  const specsVariants: Variants = {
    grid: {
      flexDirection: "column",
      gap: "0.5rem",
      opacity: 1,
      transition: { type: "spring", staggerChildren: 0.05, duration: 0.4 },
    },
    list: {
      flexDirection: "row",
      gap: "1.5rem",
      opacity: 1,
      transition: { type: "spring", staggerChildren: 0.05, duration: 0.4 },
    },
  };

  const productLink = getProductLink(productTypeId, product);

  return (
    <div
      className={cn(
        "group h-full flex flex-col overflow-hidden bg-muted rounded-lg shadow-sm hover:translate-y-[-5px] hover:shadow-md transition-all duration-300",
        isList && "h-auto",
      )}
    >
      <motion.div
        className="overflow-hidden h-full flex rounded-lg p-0 gap-4"
        initial={false}
        animate={isList ? "list" : "grid"}
        variants={cardVariants}
        layoutId={`card-${product.id}`}
      >
        <motion.div
          className={cn(
            "p-0 overflow-hidden rounded-tl-lg",
            isList ? "rounded-bl-lg" : "rounded-tr-lg",
          )}
          variants={imageContainerVariants}
          layoutId={`image-container-${product.id}`}
          whileTap={{ scale: 1.05 }}
        >
          <div className={cn("relative overflow-hidden", isList ? "h-full" : "aspect-[4/3]")}>
            <Link href={productLink || "#"} className="block w-full h-full">
              {hasImage ? (
                <Image
                  src={getUrl(coverImage.url || "")}
                  alt={title}
                  height={300}
                  layout="fullWidth"
                  // background={blurhashstring}
                  // TODO: add placeholder image using https://unpic.pics/placeholder/#blurhash after we add support in payload cms
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 dark:brightness-60"
                />
              ) : (
                <ImagePlaceholder height={300} className="w-full h-fullr" />
              )}
            </Link>
            {hasModel && (
              <motion.div className="absolute top-3 left-3" layoutId={`model-tag-${product.id}`}>
                <span className="min-w-[72px] inline-flex justify-center items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-2xl text-muted-foreground bg-muted/50 shadow-sm">
                  3D
                </span>
              </motion.div>
            )}
            <motion.div className="absolute top-3 right-3" layoutId={`type-tag-${product.id}`}>
              <span className="min-w-[72px] inline-flex justify-center items-center px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-2xl text-muted-foreground bg-muted/50 shadow-sm">
                {getBadgeText()}
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col flex-grow"
          variants={contentContainerVariants}
          layoutId={`content-${product.id}`}
        >
          <div className="flex flex-col flex-grow gap-2">
            <motion.h3
              className={cn("font-semibold line-clamp-2 mb-1", isList ? "text-xl" : "text-lg")}
              layoutId={`title-${product.id}`}
            >
              {title}
            </motion.h3>

            <motion.div
              className="flex"
              style={{
                flexDirection: isList ? "row" : "column",
                gap: isList ? "1.5rem" : "0.5rem",
              }}
              variants={specsVariants}
              layoutId={`specs-${product.id}`}
            >
              {productTypeId === "solar-panel" && (
                <>
                  <motion.div
                    className="flex items-center gap-2 text-sm"
                    variants={itemVariants}
                    layoutId={`power-${product.id}`}
                  >
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>
                      {(product as SolarPanel).power?.min}W ~ {(product as SolarPanel).power?.max}W
                    </span>
                  </motion.div>
                  {(product as SolarPanel).power?.points?.[0]?.efficiency && (
                    <motion.div
                      className="flex items-center gap-2 text-sm"
                      variants={itemVariants}
                      layoutId={`efficiency-${product.id}`}
                    >
                      <Sun className="h-4 w-4 text-amber-500" />
                      <span>{efficiencyRange()}</span>
                    </motion.div>
                  )}
                </>
              )}

              {productTypeId === "pump-controller" && (
                <>
                  {(product as PumpController).wideAmplitudeVoltage && (
                    <motion.div
                      className="flex items-center gap-2 text-sm"
                      variants={itemVariants}
                      layoutId={`voltage-${product.id}`}
                    >
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>
                        {t("ProductCard.wideAmplitudeVoltage")}: {voltageRange()}
                      </span>
                    </motion.div>
                  )}

                  {(product as PumpController).maxCurrent && (
                    <motion.div
                      className="flex items-center gap-2 text-sm"
                      variants={itemVariants}
                      layoutId={`current-${product.id}`}
                    >
                      <PlugZap className="h-4 w-4 text-amber-500" />
                      <span>
                        {t("ProductCard.maxCurrent")}: {maxCurrent()}
                      </span>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>

            <motion.p
              className={cn("text-sm mb-auto", isList ? "mt-2 line-clamp-3" : "line-clamp-2")}
              layoutId={`excerpt-${product.id}`}
            >
              {excerpt}
            </motion.p>
            {
              // TODO: add variants information to the product card
            }
            {isList && (
              <p className="text-sm mb-auto text-muted-foreground">
                {product.modelName} / {product.variants.length} variants /{" "}
                {product.variants.map((v) => v.sku).join(", ")}
              </p>
            )}
          </div>

          <motion.div
            className="w-full flex gap-2 overflow-hidden mt-auto"
            style={{
              flexDirection: isList ? "row" : isDesktopAndSidebarClosed ? "row" : "column",
              padding: isList ? "0" : "1rem",
              paddingTop: isList ? "1rem" : undefined,
              justifyContent: isList
                ? "flex-start"
                : isDesktopAndSidebarClosed
                  ? "space-between"
                  : "flex-start",
            }}
            variants={buttonContainerVariants}
            layoutId={`buttons-${product.id}`}
          >
            <RequestQuoteButton
              product={product}
              productTypeId={productTypeId}
              locale={locale}
              className={cn(
                isDesktopAndSidebarClosed && !isList
                  ? "w-[calc(50%-4px)]"
                  : isList
                    ? "w-auto"
                    : "w-full",
              )}
            />
            <Button
              asChild
              variant="outline"
              className={cn(
                isDesktopAndSidebarClosed && !isList
                  ? "w-[calc(50%-4px)]"
                  : isList
                    ? "w-auto"
                    : "w-full",
              )}
            >
              <Link href={productLink || "#"}>{t("ProductCard.viewDetails")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
