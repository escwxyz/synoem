import "server-only";

import type { APIResponse } from "~/types/api-response";
import type { Notification } from "@synoem/types";
import type { z } from "zod";
import type { localeSchema } from "@synoem/schema";
import { getPayloadClient } from "@synoem/payload/client";
import type { BasePayload, RevalidateCollectionListTagName } from "@synoem/payload/types";
import { unstable_cache } from "next/cache";
import type { Locale } from "@synoem/config";

async function getNotification(
  input: z.infer<typeof localeSchema>,
  payloadPromise: Promise<BasePayload> = getPayloadClient(),
): Promise<APIResponse<Notification | null>> {
  const { locale } = input;

  const payload = await payloadPromise;

  try {
    const response = await payload.find({
      collection: "notifications",
      locale,
      where: {
        state: {
          equals: "active",
        },
      },
      limit: 1,
      pagination: false,
    });

    return {
      status: "success",
      data: response.docs[0] || null,
    };
  } catch (error) {
    console.warn(error);
    return {
      status: "error",
      messageKey: "api.getNotication.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}

export const getNotificationCached = (locale: Locale) => {
  const tag: RevalidateCollectionListTagName<typeof locale> = `collections-notifications-${locale}`;

  return unstable_cache(
    async () => {
      return await getNotification({ locale });
    },
    [tag],
    {
      tags: [tag],
      revalidate: process.env.WEB_APP_ENV === "production" ? false : 30,
    },
  );
};
