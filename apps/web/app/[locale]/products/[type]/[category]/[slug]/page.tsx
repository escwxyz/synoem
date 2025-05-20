import { defaultLocale, type ProductTypeId, type Locale, isValidProductType } from "@synoem/config";
import { isValidLocale } from "~/utils/is-valid-locale";
import { ProductDetailPage } from "~/layouts/product-detail-layout.server";
import { notFound } from "next/navigation";
import { apiClient } from "~/libs/api-client";

// TODO: https://github.com/vercel/next.js/issues/72365
export const revalidate = 259200; // 3 days

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const paths = await apiClient.paths.generateProductParams();

  return paths.map((p) => ({
    locale: p.locale,
    type: p.type,
    category: p.category,
    slug: p.slug,
  }));
};

export default async function Page({
  params,
}: {
  params: Promise<{
    locale: Locale;
    category: string;
    slug: string;
    type: ProductTypeId;
  }>;
}) {
  const { locale, slug, type } = await params;

  if (!isValidProductType(type)) {
    notFound();
  }

  const effectiveLocale = isValidLocale(locale) ? (locale as Locale) : defaultLocale;

  return (
    <ProductDetailPage slug={slug} locale={effectiveLocale} productTypeId={type as ProductTypeId} />
  );
}
