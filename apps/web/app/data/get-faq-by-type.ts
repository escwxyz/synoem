import { locales, PRODUCT_TYPES, type Locale, type ProductTypeId } from "@synoem/config";
import { getPayloadClient } from "@synoem/payload/client";
import type { BasePayload } from "@synoem/payload/types";
import type { Faq } from "@synoem/types";
import { unstable_cache } from "next/cache";
import { z } from "zod";
import type { APIResponse } from "~/types/api-response";

const schema = z.object({
  type: z.enum(["general", ...Object.entries(PRODUCT_TYPES).map(([, value]) => value.id)]),
  locale: z.enum(locales),
});

async function getFaqByType<T extends "general" | ProductTypeId>(
  input: z.infer<typeof schema>,
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<Pick<Faq, T>>> {
  const { type, locale } = input;
  const payload = await payloadPromise;

  try {
    const faq = await payload.findGlobal({
      slug: "faq",
      select: {
        [type]: true,
      },
      locale,
    });

    return {
      status: "success",
      data: faq,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      messageKey: "api.getFaqByType.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
      },
    };
  }
}

export const getFaqByTypeCached = <T extends "general" | ProductTypeId>(
  locale: Locale,
  type: T,
) => {
  const tag = `global-faq-${locale}`;

  return unstable_cache(
    async () => {
      return await getFaqByType<T>({ locale, type });
    },
    [tag],
    {
      tags: [tag],
      revalidate: DMNO_PUBLIC_CONFIG.WEB_APP_ENV === "production" ? false : 30,
    },
  );
};
