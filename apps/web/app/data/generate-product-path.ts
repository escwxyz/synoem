import "server-only";

import { locales, PRODUCT_TYPES } from "@synoem/config";
import { getPayloadClient } from "@synoem/payload/client";

export const generateProductPath = async () => {
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
