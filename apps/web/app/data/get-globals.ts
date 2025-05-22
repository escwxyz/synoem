import type { Locale } from "@synoem/config";
import type { APIResponse } from "~/types/api-response";
import type { GlobalSlug, DataFromGlobalSlug, BasePayload } from "@synoem/payload/types";
import { getPayloadClient } from "@synoem/payload/client";

async function getGlobalHelper<T extends GlobalSlug>(
  input: {
    locale: Locale;
    slug: T;
  },
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<Omit<DataFromGlobalSlug<T>, "createdAt" | "updatedAt">>> {
  const { locale, slug } = input;

  const payload = await payloadPromise;

  try {
    const globalData = await payload.findGlobal({
      slug,
      locale,
      select: {
        createdAt: false,
        updatedAt: false,
      },
    });

    return {
      status: "success",
      data: globalData as Omit<DataFromGlobalSlug<T>, "createdAt" | "updatedAt">,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      messageKey: "api.getGlobal.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}

export const getHeader = getGlobalHelper<"header">;
export const getFooter = getGlobalHelper<"footer">;
export const getSocialLinks = getGlobalHelper<"social-links">;
