import "server-only";

import type { z } from "zod";
import type { APIResponse } from "~/types/api-response";
import type { ProductTypeId, ProductTypeToCategorySlugMap } from "@synoem/config";
import type { DataFromCollectionSlug } from "@synoem/payload/types";
import type { productSchema } from "@synoem/schema";
import { getPayloadClient } from "@synoem/payload/client";

export async function getProductCategory<T extends ProductTypeId>(
  input: z.infer<typeof productSchema>,
): Promise<
  APIResponse<Pick<
    DataFromCollectionSlug<ProductTypeToCategorySlugMap[T]>,
    "id" | "slug" | "description" | "heroImage"
  > | null>
> {
  const { slug, productTypeId, locale } = input;

  const collectionSlug =
    productTypeId === "solar-panel" ? "solar-panel-categories" : "pump-controller-categories";

  const payload = await getPayloadClient();
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
