import {
  defaultLocale,
  type ProductTypeId,
  type Locale,
  isValidProductType,
  PRODUCT_TYPES,
  locales,
} from "@synoem/config";
import { isValidLocale } from "~/utils/is-valid-locale";
import { ProductDetailPage } from "~/layouts/product-detail-layout.server";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@synoem/payload/client";

// TODO: https://github.com/vercel/next.js/issues/72365
export const revalidate = 259200; // 3 days

export const dynamicParams = true;

export const dynamic = "force-static";

export const generateStaticParams = async () => {
  const params = [];

  const payload = await getPayloadClient();

  for (const productType of Object.values(PRODUCT_TYPES)) {
    const products = await payload.find({
      collection: productType.slug,
      where: {
        _status: {
          equals: "published",
        },
        visible: {
          equals: true,
        },
      },
      select: {
        slug: true,
        productCategory: true,
      },
      depth: 1,
      pagination: false,
      limit: 0,
    });

    for (const product of products.docs) {
      for (const locale of locales) {
        if (typeof product.productCategory === "object") {
          params.push({
            type: productType.id,
            locale,
            slug: product.slug,
            category: product.productCategory.slug,
          });
        } else {
          const category = await payload.findByID({
            collection: `${productType.id}-categories`,
            id: product.productCategory,
            select: {
              slug: true,
            },
          });

          params.push({
            type: productType.id,
            locale,
            slug: product.slug,
            category: category.slug,
          });
        }
      }
    }
  }

  return params;
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
