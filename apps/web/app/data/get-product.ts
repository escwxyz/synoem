import "server-only";

import type { z } from "zod";
import type { APIResponse } from "~/types/api-response";
import { PRODUCT_TYPES, type ProductTypeToSlugMap, type ProductTypeId } from "@synoem/config";
import type {
  BasePayload,
  DataFromCollectionSlug,
  RevalidateCollectionTagName,
} from "@synoem/payload/types";
import type { productSchema } from "@synoem/schema";
import { getPayloadClient } from "@synoem/payload/client";
import { unstable_cache } from "next/cache";
import { webEnvs } from "@synoem/env";

async function getProduct<T extends ProductTypeId>(
  input: z.infer<typeof productSchema>,
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<DataFromCollectionSlug<ProductTypeToSlugMap[T]> | null>> {
  const { locale, slug, productTypeId } = input;

  const payload = await payloadPromise;

  try {
    const product = await payload.find({
      collection: PRODUCT_TYPES[productTypeId].slug,
      where: {
        _status: {
          equals: "published",
        },
        visible: {
          equals: true,
        },
        slug: {
          equals: slug,
        },
      },
      locale,
      depth: 2,
      pagination: false,
      limit: 1,
    });

    if (product.docs.length === 0) {
      return {
        status: "error",
        messageKey: "api.getProduct.error.notFound",
        error: {
          code: "NOT_FOUND",
          details: "Product not found",
        },
      };
    }

    return {
      status: "success",
      data: product.docs[0] as DataFromCollectionSlug<ProductTypeToSlugMap[T]>,
    };
  } catch (error) {
    console.warn(error);
    return {
      status: "error",
      messageKey: "api.getProduct.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}

export const getProductCached = (input: z.infer<typeof productSchema>) => {
  const { locale, slug, productTypeId } = input;

  const tag: RevalidateCollectionTagName<string, typeof locale> =
    `collection-${PRODUCT_TYPES[productTypeId].slug}-${locale}-${slug}`;

  return unstable_cache(
    async () => {
      return await getProduct(input);
    },
    [tag],
    {
      tags: [tag],
      revalidate: webEnvs.WEB_APP_ENV === "production" ? false : 30,
    },
  );
};
