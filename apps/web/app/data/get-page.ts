import "server-only";

import type { z } from "zod";
import type { APIResponse } from "~/types/api-response";
import type { Locale } from "@synoem/config";
import type { BasePayload, RevalidateCollectionTagName } from "@synoem/payload/types";
import { getPayloadClient } from "@synoem/payload/client";
import { unstable_cache } from "next/cache";
import type { Page } from "@synoem/types";
import type { pageSchema } from "@synoem/schema";

async function getPage(
  input: z.infer<typeof pageSchema>,
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<Page | null>> {
  const { locale, slug } = input;

  const payload = await payloadPromise;

  try {
    const page = await payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      pagination: false,
      locale,
    });

    return {
      status: "success",
      data: page.docs?.[0] ?? null,
    };
  } catch (error) {
    return {
      status: "error",
      messageKey: "api.getPage.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}

export const getPageCached = (locale: Locale, slug: string) => {
  const tag: RevalidateCollectionTagName<string, typeof locale> =
    `collection-pages-${locale}-${slug}`;

  return unstable_cache(
    async () => {
      return await getPage({ locale, slug });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.NODE_ENV === "production" ? false : 30,
    },
  );
};
