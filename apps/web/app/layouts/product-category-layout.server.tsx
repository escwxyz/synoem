import type { Locale, ProductTypeId } from "@synoem/config";
import { ProductFiltersSidebar } from "~/components/product-filters/product-filters-sidebar.client";
import { ProductFiltersToggle } from "~/components/product-filters/product-filters-toggle.client";
import { ProductViewModeToggle } from "~/components/product-view-mode-toggle.client";
import { ProductCategoryHero } from "~/components/product-category-hero.server";
import { ProductsView } from "~/components/products-view.client";
import { Suspense } from "react";
import { ProductsViewSkeleton } from "~/components/products-view-skeleton.client";
import { apiClient } from "~/libs/api-client";
import { unstable_cache } from "next/cache";

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
    const productCategoryResponse = await apiClient.collections.getProductCategoryBySlug({
      locale,
      slug: categorySlug,
      productTypeId,
    });

    if (productCategoryResponse?.data) {
      categoryData = productCategoryResponse.data;
    }
  }
  return (
    <div className="flex flex-1">
      <ProductFiltersSidebar
        variant="inset"
        className="z-60"
        locale={locale}
        productTypeId={productTypeId}
      />
      <div className="flex flex-1 flex-col">
        <ProductCategoryHero productCategory={categoryData} productTypeId={productTypeId} />

        <div className="flex items-center justify-between mb-4">
          <ProductFiltersToggle />
          <ProductViewModeToggle />
        </div>

        <Suspense fallback={<ProductsViewSkeleton />}>
          <ProductsView productTypeId={productTypeId} categorySlug={categorySlug} locale={locale} />
        </Suspense>
      </div>
    </div>
  );
};
