import Image from "next/image";
import { getUrl } from "~/utils/get-url";
import type { SolarPanelCategory, PumpControllerCategory } from "@synoem/types";
import type { ProductTypeId } from "@synoem/config";
import { ProductBreadcrumbs } from "./product-breadcrumbs.server";
import { getTranslations } from "next-intl/server";
import { SocialShareButtons } from "./social-share-buttons.client";

const BASE_IMAGE_URL = (() => {
  const endpoint = process.env.NEXT_PUBLIC_S3_ENDPOINT;
  const bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;

  if (!endpoint || !bucket) {
    throw new Error("S3 endpoint and bucket name must be configured");
  }

  return `${endpoint}/object/public/${bucket}/images/seed`;
})();

export const ProductCategoryHero = async ({
  productCategory,
  productTypeId,
}: {
  productCategory:
    | Pick<SolarPanelCategory, "id" | "heroImage" | "slug" | "description">
    | Pick<PumpControllerCategory, "id" | "heroImage" | "slug" | "description">
    | undefined;
  productTypeId: ProductTypeId;
}) => {
  let title: string;
  let description: string;
  let imageUrl: string | null;

  const t = await getTranslations("ProductCategoryHero");

  if (!productCategory) {
    title = t(`${productTypeId}.title`);
    description = t(`${productTypeId}.description`);

    imageUrl =
      productTypeId === "solar-panel"
        ? `${BASE_IMAGE_URL}/solar-panel-hero.jpg`
        : `${BASE_IMAGE_URL}/pump-controller-hero.jpg`;
  } else {
    const { heroImage } = productCategory;

    imageUrl =
      heroImage && typeof heroImage === "object" && "url" in heroImage && heroImage.url
        ? heroImage.url
        : null;

    title = productCategory.slug;
    description = productCategory.description || "";
  }

  return (
    <div className="relative h-[600px] md:h-[600px] overflow-hidden text-primary-foreground rounded-xl mb-4">
      {imageUrl && (
        <Image
          src={productCategory ? getUrl(imageUrl) : imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={true}
          loading="eager"
          className="w-full h-full object-cover absolute inset-0"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/70 dark:from-black/70 dark:to-black/30 md:to-transparent" />
      <div className="absolute top-0 left-0 z-20 p-4 md:p-8">
        <ProductBreadcrumbs productCategory={productCategory} productTypeId={productTypeId} />
      </div>

      <div className="font-semibold text-white/70 max-w-2xl absolute left-4 top-1/2 -translate-y-1/2">
        <p className="text-sm md:text-lg mb-4 md:mb-6 whitespace-normal">{description}</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <SocialShareButtons />
      </div>
    </div>
  );
};
