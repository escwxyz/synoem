import "server-only";

import type { Locale } from "@synoem/config";
import type { APIResponse } from "~/types/api-response";
import type { GlobalSlug, DataFromGlobalSlug, BasePayload } from "@synoem/payload/types";
import { getPayloadClient } from "@synoem/payload/client";
import { unstable_cache } from "next/cache";

async function getGlobalHelper<T extends GlobalSlug>(
  input: {
    locale?: Locale;
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

export const getHeaderCached = (locale: Locale) => {
  const tag = `global-header-${locale}`;

  return unstable_cache(
    async () => {
      return await getGlobalHelper({ locale, slug: "header" });
    },
    [tag],
    {
      tags: [tag],
      revalidate: DMNO_PUBLIC_CONFIG.CMS_APP_ENV === "production" ? false : 30,
    },
  );
};

export const getFooterCached = (locale: Locale) => {
  const tag = `global-footer-${locale}`;

  return unstable_cache(
    async () => {
      return await getGlobalHelper({ locale, slug: "footer" });
    },
    [tag],
    {
      tags: [tag],
      revalidate: DMNO_PUBLIC_CONFIG.CMS_APP_ENV === "production" ? false : 30,
    },
  );
};

export const getSocialLinksCached = () => {
  const tag = "global-social-links";

  return unstable_cache(
    async () => {
      return await getGlobalHelper({ slug: "social-links" });
    },
    [tag],
    {
      tags: [tag],
      revalidate: DMNO_PUBLIC_CONFIG.CMS_APP_ENV === "production" ? false : 30,
    },
  );
};

export const getCompanyInfoCached = (locale: Locale) => {
  const tag = `global-company-info-${locale}`;

  return unstable_cache(
    async () => {
      return await getGlobalHelper({ locale, slug: "company-info" });
    },
    [tag],
    {
      tags: [tag],
      revalidate: DMNO_PUBLIC_CONFIG.CMS_APP_ENV === "production" ? false : 30,
    },
  );
};
