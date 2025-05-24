import "server-only";

import { z } from "zod";
import type { APIResponse } from "~/types/api-response";
import { locales, type Locale } from "@synoem/config";
import type { BasePayload } from "@synoem/payload/types";
import { getPayloadClient } from "@synoem/payload/client";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import type { Page } from "@synoem/types";

const schema = z.object({
  locale: z.enum(locales),
  slug: z.string(),
});

async function getPage(
  input: z.infer<typeof schema>,
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<Page | null>> {
  const { locale, slug } = input;

  const { isEnabled: draft } = await draftMode();

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
      draft,
      overrideAccess: draft,
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
  const tag = `page-${slug}-${locale}`;

  return unstable_cache(
    async () => {
      return await getPage({ locale, slug });
    },
    [tag],
    {
      tags: [tag],
      revalidate: DMNO_PUBLIC_CONFIG.WEB_APP_ENV === "production" ? false : 30,
    },
  );
};
