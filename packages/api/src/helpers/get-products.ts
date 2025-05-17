import type { z } from "zod";
import type { productFilterMetadataSchema } from "../schemas";
import type { BasePayload, DataFromCollectionSlug, PaginatedDocs } from "@synoem/payload/types";
import type { APIResponse } from "../types/api-response";
import { PRODUCT_TYPES, type ProductTypeId, type ProductTypeToSlugMap } from "@synoem/config";
import { PRODUCT_SELECT_OBJECT } from "../types/product-select-fields";

export async function getProductsHelper<T extends ProductTypeId>(
  input: z.infer<typeof productFilterMetadataSchema>,
  payload: BasePayload,
): Promise<APIResponse<PaginatedDocs<DataFromCollectionSlug<ProductTypeToSlugMap[T]>>>> {
  const { productTypeId, locale } = input;

  try {
    const collection = PRODUCT_TYPES[productTypeId].slug;
    const selectFields = PRODUCT_SELECT_OBJECT[productTypeId];

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
      limit: 0,
      pagination: true,
      depth: 1, // To populate the productCategory / coverImage etc.
    });

    return {
      status: "success",
      data: response as PaginatedDocs<DataFromCollectionSlug<ProductTypeToSlugMap[T]>>,
    };
  } catch (error) {
    console.warn(error);
    return {
      status: "error",
      messageKey: "api.getProducts.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}
