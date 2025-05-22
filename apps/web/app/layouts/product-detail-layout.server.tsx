import type { Locale, ProductTypeId } from "@synoem/config";
import { notFound } from "next/navigation";
import type { SolarPanelCategory, PumpControllerCategory } from "@synoem/types";
import { ProductHero } from "~/components/product-hero.server";
import { ProductTabs } from "~/components/product-tabs";
import { unstable_cache } from "next/cache";
import { getProduct } from "~/data/get-product";
import type { productSchema } from "@synoem/schema";
import type { z } from "zod";

interface ProductDetailPageProps {
  slug: string;
  locale: Locale;
  productTypeId: ProductTypeId;
}

export const ProductDetailPage = async ({
  slug,
  locale,
  productTypeId,
}: ProductDetailPageProps) => {
  const productResponse = await getProductCached({
    locale,
    slug,
    productTypeId,
  })();

  if (productResponse.error) {
    // TODO: handle error
    return <div>Error</div>;
  }

  if (!productResponse.data) {
    return notFound();
  }

  const product = productResponse.data;

  const productCategory = product.productCategory;

  if (typeof productCategory !== "object") {
    console.warn("Product Category is not populated properly");
  }

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

const getProductCached = (input: z.infer<typeof productSchema>) => {
  return unstable_cache(
    async () => {
      return await getProduct(input);
    },
    ["product"],
    {
      tags: ["product"],
      revalidate: DMNO_PUBLIC_CONFIG.WEB_APP_ENV === "production" ? 60 * 60 * 24 * 7 : 30,
    },
  );
};
