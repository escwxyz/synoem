import type {
  SolarPanel,
  PumpController,
  SolarPanelCategory,
  PumpControllerCategory,
} from "@synoem/types";
import Image from "next/image";
import { getUrl } from "~/utils/get-url";
import { SocialShareButtons } from "./social-share-buttons.client";
import { ImagePlaceholder } from "@synoem/ui/components/image-placeholder";
import { ProductBreadcrumbs } from "./product-breadcrumbs.server";
import type { Locale, ProductTypeId } from "@synoem/config";
import dynamic from "next/dynamic";
import { FeatureCard } from "./blocks/feature-card";

const ProductHeroModel = dynamic(() =>
  import("./product-hero-model.client").then((mod) => mod.ProductHeroModel),
);

const RequestQuoteButton = dynamic(() =>
  import("./request-quote-button").then((mod) => mod.RequestQuoteButton),
);

interface ProductHeroProps {
  productCategory:
    | Pick<SolarPanelCategory, "id" | "heroImage" | "slug" | "description">
    | Pick<PumpControllerCategory, "id" | "heroImage" | "slug" | "description">;
  productTypeId: ProductTypeId;
  product: SolarPanel | PumpController;
  locale: Locale;
}

export const ProductHero = ({
  product,
  productTypeId,
  productCategory,
  locale,
}: ProductHeroProps) => {
  const { title, heroImage, excerpt, features, three } = product;

  const hasHeroImage = typeof heroImage === "object" && heroImage?.url;

  return (
    <section className="relative h-[600px] md:h-[600px] overflow-hidden text-white rounded-xl mb-4">
      {hasHeroImage ? (
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          src={getUrl(heroImage?.url ?? "")}
          alt="Product cover image"
          className="w-full h-full absolute inset-0 object-cover"
          priority={true}
          loading="eager"
        />
      ) : (
        <ImagePlaceholder
          height={600}
          width={600}
          className="w-full h-full object-cover absolute inset-0"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 md:to-transparent" />

      <div className="hidden md:block absolute top-0 left-0 z-20 p-4 md:p-8 backdrop-blur-sm md:backdrop-blur-none">
        <div className="font-semibold text-primary-foreground">
          <ProductBreadcrumbs productCategory={productCategory} productTypeId={productTypeId} />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-4 md:px-8 h-full">
          <div className="flex flex-col md:flex-row h-full items-center">
            <div className="w-full md:w-1/2 py-12 md:py-0 mt-8 md:mt-0 overflow-y-auto max-h-[550px]">
              <div className="flex flex-col justify-center pr-0 md:pr-8">
                <h1 className="text-xl md:text-4xl font-bold mb-2 md:mb-4">{title}</h1>
                <p className="text-sm md:text-lg mb-4 md:mb-6 whitespace-normal">{excerpt}</p>
                <div className="w-full mb-4">
                  {features && features.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12">
                        {features?.map((feature) => (
                          <FeatureCard key={feature.id} {...feature} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center">
                  <div className="w-full flex flex-col md:flex-row gap-2">
                    <RequestQuoteButton
                      product={product}
                      productTypeId={productTypeId}
                      locale={locale}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block md:w-1/2 h-full">
              <ProductHeroModel three={three} />

              <div className="hidden md:block md:absolute bottom-4 right-4 z-10">
                <SocialShareButtons className="justify-end gap-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
