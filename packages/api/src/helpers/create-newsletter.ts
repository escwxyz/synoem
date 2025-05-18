import type { z } from "zod";
import type { BasePayload } from "@synoem/payload/types";
import type { APIResponse } from "../types/api-response";
import type { newsletterSchema } from "@synoem/schema";

export async function createNewsletterHelper(
  input: z.infer<typeof newsletterSchema>,
  payload: BasePayload,
): Promise<APIResponse<string>> {
  const { email, ...rest } = input;

  try {
    const existingSubscriber = await payload.find({
      collection: "newsletter-subscribers",
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existingSubscriber.docs.length > 0) {
      return {
        status: "error",
        messageKey: "api.createNewsletter.error",
        error: {
          code: "BAD_REQUEST",
          details: "Email already subscribed",
        },
      };
    }

    const result = await payload.create({
      collection: "newsletter-subscribers",
      data: { email, ...rest },
    });

    return {
      status: "success",
      data: result.id,
    };
  } catch (error) {
    console.warn(error);
    return {
      status: "error",
      messageKey: "api.createNewsletter.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}
