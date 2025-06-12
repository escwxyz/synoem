import {
  defaultLocale,
  type Locale,
  isValidProductType,
  isValidProductCategory,
} from "@synoem/config";
import { isValidLocale } from "~/utils/is-valid-locale";
import { ProductDetailPage } from "~/layouts/product-detail-layout.server";
import { notFound } from "next/navigation";
import { getProductCached } from "~/data/get-product";
import { generateProductPath } from "~/data/generate-product-path";
import { getPageMetadata } from "@/app/data/get-page-metadata";

export const dynamic = "force-static";

interface PageProps {
  params: Promise<{ locale: string; slug: string; type: string; category: string }>;
}

export const generateStaticParams = async () => {
  return await generateProductPath();
};

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug, type, category } = await params;

  if (!isValidProductType(type) || !isValidProductCategory(category) || !isValidLocale(locale)) {
    return;
  }

  const productResponse = await getProductCached({
    locale,
    slug,
    productTypeId: type,
  })();

  if (productResponse.error) {
    return;
  }

  const product = productResponse.data;

  if (!product) {
    return;
  }

  return getPageMetadata({ locale, pageTitle: product.title });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug, type, category } = await params;

  if (!isValidProductType(type) || !isValidProductCategory(category)) {
    notFound();
  }

  const effectiveLocale = isValidLocale(locale) ? (locale as Locale) : defaultLocale;

  const productResponse = await getProductCached({
    locale: effectiveLocale,
    slug,
    productTypeId: type,
  })();

  if (productResponse.error || !productResponse.data) {
    return notFound();
  }

  const product = productResponse.data;

  const productCategory = product.productCategory;

  if (typeof productCategory !== "object") {
    console.warn("Product Category is not populated properly");
  }

  return <ProductDetailPage product={product} productTypeId={type} locale={effectiveLocale} />;
}
