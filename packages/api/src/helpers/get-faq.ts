import type { z } from "zod";
import type { BasePayload } from "@synoem/payload/types";
import type { Faq } from "@synoem/payload/payload-types";
import type { APIResponse } from "../types/api-response";
import type { faqSchema } from "../schemas";

export async function getFaqHelper(
  input: z.infer<typeof faqSchema>,
  payload: BasePayload,
): Promise<APIResponse<Faq | null>> {
  const { type, locale } = input;

  try {
    const faq = await payload.find({
      collection: "faqs",
      locale,
      where: {
        type: {
          equals: type,
        },
      },
      limit: 1,
      pagination: false,
    });

    return {
      status: "success",
      data: faq.docs[0] || null,
    };
  } catch (error) {
    console.warn(error);
    return {
      status: "error",
      messageKey: "api.getFaq.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}
