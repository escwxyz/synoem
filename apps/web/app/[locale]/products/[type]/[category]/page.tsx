import {
  defaultLocale,
  type Locale,
  isValidProductCategory,
  isValidProductType,
  type ProductTypeId,
  PRODUCT_TYPES,
} from "@synoem/config";
import { notFound } from "next/navigation";
import { isValidLocale } from "~/utils/is-valid-locale";
import { ProductCategoryPage } from "@/app/layouts/product-category-layout.server";
import { getPageMetadata } from "@/app/data/get-page-metadata";

interface PageProps {
  params: Promise<{ category: string; locale: string; type: string }>;
}

// TODO: Need a better way to handle this
export async function generateMetadata({ params }: PageProps) {
  const { locale, type, category } = await params;

  if (!isValidProductType(type) || !isValidProductCategory(category) || !isValidLocale(locale)) {
    return;
  }

  const productType = PRODUCT_TYPES[type as ProductTypeId];

  const categoryLabel = productType.categories.find((c) => c.value === category)?.label;

  let pageTitle =
    locale === "de"
      ? `${productType.label} - ${categoryLabel}`
      : `${productType.label} - ${categoryLabel}`;

  if (categoryLabel) {
    pageTitle = locale === "de" ? `Produkte - ${pageTitle}` : `Products - ${pageTitle}`;
  }

  return getPageMetadata({ locale, pageTitle });
}

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
