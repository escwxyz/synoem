import {
  defaultLocale,
  type Locale,
  isValidProductCategory,
  isValidProductType,
  type ProductTypeId,
} from "@synoem/config";
import { notFound } from "next/navigation";
import { isValidLocale } from "~/utils/is-valid-locale";
import { ProductCategoryPage } from "@/app/layouts/product-category-layout.server";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; locale: string; type: string }>;
}) {
  const { category, locale, type } = await params;

  if (!isValidProductType(type) || !isValidProductCategory(category)) {
    notFound();
  }

  const effectiveLocale = isValidLocale(locale) ? (locale as Locale) : defaultLocale;

  return (
    <ProductCategoryPage
      productTypeId={type as ProductTypeId}
      categorySlug={category}
      locale={effectiveLocale}
    />
  );
}
