import { orpc } from "../orpc";
import { z } from "zod";
import type { APIResponse } from "../types/api-response";
import { PRODUCT_FILTER_METADATA_SELECT_OBJECT } from "../types/product-filter-metadata";
import type { Faq, Notification } from "@synoem/payload/payload-types";
import {
  locales,
  PRODUCT_TYPES,
  type ProductTypeToSlugMap,
  type ProductTypeId,
  type ProductTypeToCategorySlugMap,
} from "@synoem/config";
import type { BasePayload, DataFromCollectionSlug, PaginatedDocs } from "@synoem/payload/types";

// ------------- Zod Schemas -------------

const localeSchema = z.object({
  locale: z.enum(locales),
});

const productSchema = z
  .object({
    slug: z.string(),
    productTypeId: z.enum(
      Object.values(PRODUCT_TYPES).map((productType) => productType.id) as [
        ProductTypeId,
        ...ProductTypeId[],
      ],
    ),
  })
  .merge(localeSchema);

const productFilterMetadataSchema = z
  .object({
    productTypeId: z.enum(
      Object.values(PRODUCT_TYPES).map((productType) => productType.id) as [
        ProductTypeId,
        ...ProductTypeId[],
      ],
    ),
  })
  .merge(localeSchema);

const faqSchema = z
  .object({
    type: z.enum(["general", ...Object.values(PRODUCT_TYPES).map((category) => category.id)]),
  })
  .merge(localeSchema);

// ------------- Procedures -------------

export const getNotification = orpc
  .input(localeSchema)
  .handler(async ({ input, context }): Promise<APIResponse<Notification | null>> => {
    const { locale } = input;

    try {
      const response = await context.payload.find({
        collection: "notifications",
        locale,
        where: {
          state: {
            equals: "active",
          },
        },
        limit: 1,
        pagination: false,
      });

      return {
        status: "success",
        data: response.docs[0] || null,
      };
    } catch (error) {
      console.warn(error);
      return {
        status: "error",
        messageKey: "api.getNotication.error",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: error,
        },
      };
    }
  });

export const getProductBySlug = orpc.input(productSchema).handler(async ({ input, context }) => {
  return getProductHelper<ProductTypeId>(input, context.payload);
});

async function getProductHelper<T extends ProductTypeId>(
  input: z.infer<typeof productSchema>,
  payload: BasePayload,
): Promise<APIResponse<DataFromCollectionSlug<ProductTypeToSlugMap[T]> | null>> {
  const { locale, slug, productTypeId } = input;

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

export const getProductCategoryBySlug = orpc
  .input(productSchema)
  .handler(async ({ input, context }) => {
    return getProductCategoryHelper<ProductTypeId>(input, context.payload);
  });

async function getProductCategoryHelper<T extends ProductTypeId>(
  input: z.infer<typeof productSchema>,
  payload: BasePayload,
): Promise<
  APIResponse<Pick<
    DataFromCollectionSlug<ProductTypeToCategorySlugMap[T]>,
    "id" | "slug" | "description" | "heroImage"
  > | null>
> {
  const { slug, productTypeId, locale } = input;

  const collectionSlug =
    productTypeId === "solar-panel" ? "solar-panel-categories" : "pump-controller-categories";

  try {
    const category = await payload.find({
      collection: collectionSlug,
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 1,
      select: {
        heroImage: true,
        slug: true,
        description: true,
      },
      pagination: false,
      limit: 1,
      locale,
    });

    return {
      status: "success",
      data: category.docs[0] || null,
    };
  } catch (error) {
    console.warn(error);
    return {
      status: "error",
      messageKey: "api.getProductCategory.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}

export const getProductFilterMetadata = orpc
  .input(productFilterMetadataSchema)
  .handler(async ({ input, context }) => {
    return getProductFilterMetadataHelper<ProductTypeId>(input, context.payload);
  });

async function getProductFilterMetadataHelper<T extends ProductTypeId>(
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

export const getFaq = orpc.input(faqSchema).handler(async ({ input, context }) => {
  return getFaqHelper(input, context.payload);
});

async function getFaqHelper(
  input: z.infer<typeof faqSchema>,
  payload: BasePayload,
): Promise<APIResponse<Faq | null>> {
  const { type, locale } = input;

  try {
    const faq = await payload.find({
      collection: "faqs",
      locale,
      where: {
        type: {
          equals: type,
        },
      },
      limit: 1,
      pagination: false,
    });

    return {
      status: "success",
      data: faq.docs[0] || null,
    };
  } catch (error) {
    console.warn(error);
    return {
      status: "error",
      messageKey: "api.getFaq.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}
