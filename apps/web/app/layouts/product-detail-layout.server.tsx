import type { Locale, ProductTypeId } from "@synoem/config";
import type {
  SolarPanelCategory,
  PumpControllerCategory,
  SolarPanel,
  PumpController,
} from "@synoem/types";
import { ProductHero } from "~/components/product-hero.server";
import { ProductTabs } from "~/components/product-tabs";

interface ProductDetailPageProps {
  productTypeId: ProductTypeId;
  locale: Locale;
  product: SolarPanel | PumpController;
}

export const ProductDetailPage = ({ product, productTypeId, locale }: ProductDetailPageProps) => {
  return (
    <>
      <ProductHero
        product={product}
        productCategory={product.productCategory as SolarPanelCategory | PumpControllerCategory}
        productTypeId={productTypeId}
        locale={locale}
      />

      <ProductTabs productTypeId={productTypeId} product={product} />
    </>
  );
};
