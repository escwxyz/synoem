import type { BasePayload } from "@synoem/payload/types";
import type { APIResponse } from "../types/api-response";
import type { Notification } from "@synoem/payload/payload-types";
import type { z } from "zod";
import type { localeSchema } from "@synoem/schema";

export async function getNotificationHelper(
  input: z.infer<typeof localeSchema>,
  payload: BasePayload,
): Promise<APIResponse<Notification | null>> {
  const { locale } = input;

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
