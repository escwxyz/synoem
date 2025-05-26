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
      depth: 1, // we've already set the default populated fields on the product category
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
          throw new Error(
            "Product category is not populated properly. Check the `defaultPopulate` field in Payload",
          );
        }
      }
    }
  }

  return params;
};
