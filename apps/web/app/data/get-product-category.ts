import "server-only";

import type { z } from "zod";
import type { APIResponse } from "~/types/api-response";
import type { Locale, ProductTypeId, ProductTypeToCategorySlugMap } from "@synoem/config";
import type {
  BasePayload,
  DataFromCollectionSlug,
  RevalidateCollectionTagName,
} from "@synoem/payload/types";
import type { productSchema } from "@synoem/schema";
import { getPayloadClient } from "@synoem/payload/client";
import { unstable_cache } from "next/cache";

async function getProductCategory<T extends ProductTypeId>(
  input: z.infer<typeof productSchema>,
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<
  APIResponse<Pick<
    DataFromCollectionSlug<ProductTypeToCategorySlugMap[T]>,
    "id" | "slug" | "description" | "heroImage"
  > | null>
> {
  const { slug, productTypeId, locale } = input;

  const collectionSlug =
    productTypeId === "solar-panel" ? "solar-panel-categories" : "pump-controller-categories";

  const payload = await payloadPromise;

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

export const getProductCategoryCached = <T extends ProductTypeId>(
  locale: Locale,
  productTypeId: T,
  slug: string,
) => {
  const tag: RevalidateCollectionTagName<string, typeof locale> =
    `collection-${productTypeId}-categories-${locale}-${slug}`;

  return unstable_cache(
    async () => {
      return await getProductCategory<T>({ locale, productTypeId, slug });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.NODE_ENV === "production" ? false : 30, // We don't need to revalidate because we have to change the config file for this to work
    },
  );
};
