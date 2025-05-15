import type { BasePayload } from "@synoem/payload/types";
import type { z } from "zod";
import type { APIResponse } from "../types/api-response";
import type { simpleInquirySchema } from "../schemas";

export async function createSimpleInquiryHelper(
  input: z.infer<typeof simpleInquirySchema>,
  payload: BasePayload,
): Promise<APIResponse<string>> {
  const { name, email, phone, requirements, page, ipAddress, userAgent } = input;

  try {
    const result = await payload.create({
      collection: "inquiries",
      data: {
        formType: "simple",
        name,
        email,
        phone,
        requirements,
        page,
        ipAddress,
        userAgent,
      },
    });

    return {
      status: "success",
      data: result.id,
    };
  } catch (error) {
    console.warn(error);
    return {
      status: "error",
      messageKey: "api.createSimpleInquiry.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}
