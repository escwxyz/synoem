import "server-only";

import type { localeSchema } from "@synoem/schema";
import type { z } from "zod";
import type { BasePayload, RevalidateCollectionListTagName } from "@synoem/payload/types";
import { getPayloadClient } from "@synoem/payload/client";
import { unstable_cache } from "next/cache";
import type { Locale } from "@synoem/config";

async function getIndustries(
  input: z.infer<typeof localeSchema>,
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
) {
  const payload = await payloadPromise;

  try {
    const industries = await payload.find({
      collection: "industries",
      pagination: false,
      locale: input.locale,
    });

    return {
      status: "success",
      data: industries.docs,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      messageKey: "api.getIndustries.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}

export const getIndustriesCached = (locale: Locale) => {
  const tag: RevalidateCollectionListTagName<typeof locale> = `collections-industries-${locale}`;

  return unstable_cache(
    async () => {
      return await getIndustries({ locale });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.NODE_ENV === "production" ? false : 30,
    },
  );
};
