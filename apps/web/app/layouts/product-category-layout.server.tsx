import type { Locale, ProductTypeId } from "@synoem/config";
import { ProductFiltersSidebar } from "~/components/product-filters/product-filters-sidebar.client";
import { ProductFiltersToggle } from "~/components/product-filters/product-filters-toggle.client";
import { ProductViewModeToggle } from "~/components/product-view-mode-toggle.client";
import { ProductCategoryHero } from "~/components/product-category-hero.server";
import { ProductsView } from "~/components/products-view.client";
import { Suspense } from "react";
import { ProductsViewSkeleton } from "~/components/products-view-skeleton.client";
import { unstable_cache } from "next/cache";
import { getProductCategory } from "~/data/get-product-category";
import { getProducts } from "~/data/get-products";
import { getProductFilterMetadata } from "~/data/get-product-filter-metadata";

interface ProductCategoryPageProps {
  categorySlug?: string;
  productTypeId: ProductTypeId;
  locale: Locale;
}

export const ProductCategoryPage = async ({
  categorySlug,
  productTypeId,
  locale,
}: ProductCategoryPageProps) => {
  let categoryData = undefined;

  if (categorySlug) {
    const productCategoryResponse = await getProductCategoryCached<ProductTypeId>(
      locale,
      productTypeId,
      categorySlug,
    )();

    if (productCategoryResponse?.data) {
      categoryData = productCategoryResponse.data;
    }
  }

  const productFilterMetadataPromiseResponse = getProductFilterMetadataCached<ProductTypeId>(
    locale,
    productTypeId,
  )();

  const allProductsPromiseResponse = getProductsCached<ProductTypeId>(locale, productTypeId)();

  return (
    <div className="flex flex-1">
      <Suspense fallback={<div>Loading</div>}>
        <ProductFiltersSidebar
          variant="inset"
          className="z-60"
          locale={locale}
          productTypeId={productTypeId}
          filterMetadataPromise={productFilterMetadataPromiseResponse}
        />
      </Suspense>
      <div className="flex flex-1 flex-col">
        <ProductCategoryHero productCategory={categoryData} productTypeId={productTypeId} />

        <div className="flex items-center justify-between mb-4">
          <ProductFiltersToggle />
          <ProductViewModeToggle />
        </div>

        <Suspense fallback={<ProductsViewSkeleton />}>
          <ProductsView
            productTypeId={productTypeId}
            categorySlug={categorySlug}
            locale={locale}
            filterMetadataPromise={productFilterMetadataPromiseResponse}
            allProductsPromise={allProductsPromiseResponse}
          />
        </Suspense>
      </div>
    </div>
  );
};

const getProductCategoryCached = <T extends ProductTypeId>(
  locale: Locale,
  productTypeId: T,
  slug: string,
) => {
  return unstable_cache(
    async () => {
      return await getProductCategory<T>({ locale, productTypeId, slug });
    },
    ["product-category", locale, productTypeId, slug],
    {
      tags: ["product-category", locale, productTypeId, slug],
      revalidate: DMNO_PUBLIC_CONFIG.WEB_APP_ENV === "production" ? 60 * 60 * 24 * 3 : 30,
    },
  );
};

const getProductFilterMetadataCached = <T extends ProductTypeId>(
  locale: Locale,
  productTypeId: T,
) => {
  return unstable_cache(
    async () => {
      return await getProductFilterMetadata<T>({ locale, productTypeId });
    },
    ["product-filter-metadata", locale, productTypeId],
    {
      tags: ["product-filter-metadata", locale, productTypeId],
      revalidate: DMNO_PUBLIC_CONFIG.WEB_APP_ENV === "production" ? 60 * 60 * 24 * 3 : 30,
    },
  );
};

const getProductsCached = <T extends ProductTypeId>(locale: Locale, productTypeId: T) => {
  return unstable_cache(
    async () => {
      return await getProducts<T>({ locale, productTypeId });
    },
    ["products", locale, productTypeId],
    {
      tags: ["products", locale, productTypeId],
      revalidate: DMNO_PUBLIC_CONFIG.WEB_APP_ENV === "production" ? 60 * 60 * 24 * 3 : 30,
    },
  );
};
