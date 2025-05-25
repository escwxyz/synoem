import type { Locale, ProductTypeId } from "@synoem/config";
import type {
  SolarPanelCategory,
  PumpControllerCategory,
  SolarPanel,
  PumpController,
} from "@synoem/types";
import { ProductHero } from "~/components/product-hero.server";
import { ProductTabs } from "~/components/product-tabs";
import { getFaqByTypeCached } from "~/data/get-faq-by-type";
import { Suspense } from "react";
import { FaqSection } from "~/components/faqs.client";

interface ProductDetailPageProps {
  productTypeId: ProductTypeId;
  locale: Locale;
  product: SolarPanel | PumpController;
}

export const ProductDetailPage = ({ product, productTypeId, locale }: ProductDetailPageProps) => {
  const faqs = getFaqByTypeCached(locale, productTypeId)();

  return (
    <>
      <ProductHero
        product={product}
        productCategory={product.productCategory as SolarPanelCategory | PumpControllerCategory}
        productTypeId={productTypeId}
        locale={locale}
      />

      <ProductTabs productTypeId={productTypeId} product={product} />
      <Suspense fallback={<div>Loading...</div>}>
        <FaqSection faqsPromise={faqs} type={productTypeId} />
      </Suspense>
    </>
  );
};
