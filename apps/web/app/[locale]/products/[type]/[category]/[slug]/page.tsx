import { defaultLocale, type ProductTypeId, type Locale, isValidProductType } from "@synoem/config";
import { isValidLocale } from "~/utils/is-valid-locale";
import { ProductDetailPage } from "~/layouts/product-detail-layout.server";
import { notFound } from "next/navigation";
import { getProductCached } from "~/data/get-product";
import { generateProductPath } from "~/data/generate-product-path";

export const dynamicParams = true;

export const dynamic = "force-static";

export const generateStaticParams = async () => {
  return await generateProductPath();
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

  const productResponse = await getProductCached({
    locale: effectiveLocale,
    slug,
    productTypeId: type,
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

  return <ProductDetailPage product={product} productTypeId={type} locale={effectiveLocale} />;
}
