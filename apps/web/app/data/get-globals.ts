import { z } from "zod";
import { type Locale, locales } from "@synoem/config";
import type { APIResponse } from "~/types/api-response";
import type { GlobalSlug, DataFromGlobalSlug, BasePayload } from "@synoem/payload/types";
import type { Footer, Header, SocialLink } from "@synoem/types";
import { getPayloadClient } from "@synoem/payload/client";

function createGlobalSchema<T extends GlobalSlug>(slug: T) {
  return z.object({
    locale: z.enum(locales),
    slug: z.literal(slug),
  });
}

async function getGlobalHelper<T extends GlobalSlug>(input: {
  locale: Locale;
  slug: T;
}): Promise<APIResponse<Omit<DataFromGlobalSlug<T>, "createdAt" | "updatedAt">>> {
  const { locale, slug } = input;

  const payload = await getPayloadClient();

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
