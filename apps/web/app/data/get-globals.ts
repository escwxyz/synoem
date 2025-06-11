import "server-only";

import type { Locale } from "@synoem/config";
import type { APIResponse } from "~/types/api-response";
import type {
  GlobalSlug,
  DataFromGlobalSlug,
  BasePayload,
  RevalidateGlobalTagName,
} from "@synoem/payload/types";
import { getPayloadClient } from "@synoem/payload/client";
import { unstable_cache } from "next/cache";

async function getGlobalHelper<T extends GlobalSlug>(
  input: {
    locale?: Locale;
    slug: T;
    depth?: number;
  },
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<DataFromGlobalSlug<T>>> {
  const { locale, slug, depth: rawDepth = 0 } = input;
  const depth = Math.max(0, Math.min(rawDepth, 3));

  const payload = await payloadPromise;

  try {
    const globalData = await payload.findGlobal({
      slug,
      locale,
      // TODO: this is not working as expected, it removes some other fields too
      // select: {
      //   createdAt: false,
      //   updatedAt: false,
      // },
      depth,
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

export const getHeaderCached = (locale: Locale) => {
  const tag: RevalidateGlobalTagName<typeof locale> = `global-header-${locale}`;

  return unstable_cache(
    async () => {
      return await getGlobalHelper({ locale, slug: "header", depth: 1 });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.NODE_ENV === "production" ? false : 30,
    },
  );
};

export const getFooterCached = (locale: Locale) => {
  const tag: RevalidateGlobalTagName<typeof locale> = `global-footer-${locale}`;

  return unstable_cache(
    async () => {
      return await getGlobalHelper({ locale, slug: "footer", depth: 1 });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.NODE_ENV === "production" ? false : 30,
    },
  );
};

export const getSocialLinksCached = () => {
  const tag: RevalidateGlobalTagName<undefined> = "global-social-links";

  return unstable_cache(
    async () => {
      return await getGlobalHelper({ slug: "social-links" });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.NODE_ENV === "production" ? false : 30,
    },
  );
};

export const getCompanyInfoCached = (locale: Locale) => {
  const tag: RevalidateGlobalTagName<typeof locale> = `global-company-info-${locale}`;

  return unstable_cache(
    async () => {
      return await getGlobalHelper({ locale, slug: "company-info", depth: 1 });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.NODE_ENV === "production" ? false : 30,
    },
  );
};

export const getContactInfoCached = () => {
  const tag: RevalidateGlobalTagName<undefined> = "global-contact-info";

  return unstable_cache(
    async () => {
      return await getGlobalHelper({ slug: "contact-info", depth: 0 });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.NODE_ENV === "production" ? false : 30,
    },
  );
};
