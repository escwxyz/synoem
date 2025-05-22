import "server-only";

import type { APIResponse } from "~/types/api-response";
import type { Notification } from "@synoem/types";
import type { z } from "zod";
import type { localeSchema } from "@synoem/schema";
import { getPayloadClient } from "@synoem/payload/client";
import type { BasePayload } from "@synoem/payload/types";

export async function getNotification(
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
