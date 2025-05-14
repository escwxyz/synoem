import { z } from "zod";
import { type Locale, locales } from "@synoem/config";
import { orpc } from "../orpc";
import type { APIResponse } from "../types/api-response";
import type { GlobalSlug, DataFromGlobalSlug, BasePayload } from "@synoem/payload/types";
import type { Footer, Header, SocialLink } from "@synoem/payload/payload-types";

function createGlobalSchema<T extends GlobalSlug>(slug: T) {
  return z.object({
    locale: z.enum(locales),
    slug: z.literal(slug),
  });
}

async function getGlobalHelper<T extends GlobalSlug>(
  input: {
    locale: Locale;
    slug: T;
  },
  payload: BasePayload,
): Promise<APIResponse<DataFromGlobalSlug<T>>> {
  const { locale, slug } = input;

  try {
    const globalData = await payload.findGlobal({
      slug,
      locale,
      // TODO: remove unneeded fields
    });

    return {
      status: "success",
      data: globalData,
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

export const getHeader = orpc
  .input(createGlobalSchema("header"))
  .handler(async ({ input, context }): Promise<APIResponse<Header>> => {
    return getGlobalHelper(input, context.payload);
  });

export const getFooter = orpc
  .input(createGlobalSchema("footer"))
  .handler(async ({ input, context }): Promise<APIResponse<Footer>> => {
    return getGlobalHelper(input, context.payload);
  });

export const getSocialLinks = orpc
  .input(createGlobalSchema("social-links"))
  .handler(async ({ input, context }): Promise<APIResponse<SocialLink>> => {
    return getGlobalHelper(input, context.payload);
  });
