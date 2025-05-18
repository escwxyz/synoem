import type { z } from "zod";
import type { APIResponse } from "../types/api-response";
import { PRODUCT_FILTER_METADATA_SELECT_OBJECT } from "../types/product-filter-metadata";
import { PRODUCT_TYPES, type ProductTypeToSlugMap, type ProductTypeId } from "@synoem/config";
import type { BasePayload, DataFromCollectionSlug, PaginatedDocs } from "@synoem/payload/types";
import type { productFilterMetadataSchema } from "@synoem/schema";

export async function getProductFilterMetadataHelper<T extends ProductTypeId>(
  input: z.infer<typeof productFilterMetadataSchema>,
  payload: BasePayload,
): Promise<APIResponse<PaginatedDocs<DataFromCollectionSlug<ProductTypeToSlugMap[T]>>>> {
  const { productTypeId, locale } = input;

  const collection = PRODUCT_TYPES[productTypeId].slug;

  const selectFields = PRODUCT_FILTER_METADATA_SELECT_OBJECT[productTypeId];

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
