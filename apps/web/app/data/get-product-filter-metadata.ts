import "server-only";

import type { z } from "zod";
import type { APIResponse } from "~/types/api-response";
import { PRODUCT_FILTER_METADATA_SELECT_OBJECT } from "~/types/product-filter-metadata";
import {
  PRODUCT_TYPES,
  type ProductTypeToSlugMap,
  type ProductTypeId,
  type Locale,
} from "@synoem/config";
import type { BasePayload, DataFromCollectionSlug, PaginatedDocs } from "@synoem/payload/types";
import type { productFilterMetadataSchema } from "@synoem/schema";
import { getPayloadClient } from "@synoem/payload/client";
import { unstable_cache } from "next/cache";

async function getProductFilterMetadata<T extends ProductTypeId>(
  input: z.infer<typeof productFilterMetadataSchema>,
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<PaginatedDocs<DataFromCollectionSlug<ProductTypeToSlugMap[T]>>>> {
  const { productTypeId, locale } = input;

  const collection = PRODUCT_TYPES[productTypeId].slug;

  const selectFields = PRODUCT_FILTER_METADATA_SELECT_OBJECT[productTypeId];

  const payload = await payloadPromise;

  try {
    const response = await payload.find({
      collection,
      locale,
      where: {
        _status: {
          equals: "published",
        },
        visible: {
          equals: true,
        },
      },
      select: selectFields,
      limit: 0, // fetch all products
      depth: 1,
      pagination: true, // to get total docs
    });

    return {
      status: "success",
      data: response as PaginatedDocs<DataFromCollectionSlug<ProductTypeToSlugMap[T]>>,
    };
  } catch (error) {
    return {
      status: "error",
      messageKey: "api.getProductFilterMetadata.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}

export const getProductFilterMetadataCached = <T extends ProductTypeId>(
  locale: Locale,
  productTypeId: T,
) => {
  const tag = `product-filter-metadata-${productTypeId}-${locale}`;

  return unstable_cache(
    async () => {
      return await getProductFilterMetadata<T>({ locale, productTypeId });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.NODE_ENV === "production" ? 60 * 60 * 24 * 7 : 30, // Weekly update, instead of manual revalidation
    },
  );
};
