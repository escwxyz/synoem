import { defaultLocale, type Locale, isValidProductType, type ProductTypeId } from "@synoem/config";
import { notFound } from "next/navigation";
import { isValidLocale } from "~/utils/is-valid-locale";
import { ProductCategoryPage } from "@/app/layouts/product-category-layout.server";
import { getPageMetadata } from "@/app/data/get-page-metadata";

interface PageProps {
  params: Promise<{ locale: string; type: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, type } = await params;

  if (!isValidProductType(type) || !isValidLocale(locale)) {
    return;
  }

  let pageTitle =
    locale === "de"
      ? type === "solar-panel"
        ? "Solarmodule"
        : "Pumpcontroller"
      : type === "solar-panel"
        ? "Solar Panels"
        : "Pump Controllers";

  pageTitle = locale === "de" ? `Produkte - ${pageTitle}` : `Products - ${pageTitle}`;

  return getPageMetadata({ locale, pageTitle });
}

export default async function Page({ params }: PageProps) {
  const { locale, type } = await params;

  if (!isValidProductType(type)) {
    notFound();
  }

  const effectiveLocale = isValidLocale(locale) ? (locale as Locale) : defaultLocale;

  return <ProductCategoryPage productTypeId={type as ProductTypeId} locale={effectiveLocale} />;
}
