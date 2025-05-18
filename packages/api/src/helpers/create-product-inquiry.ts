import type { z } from "zod";
import type { BasePayload } from "@synoem/payload/types";
import type { APIResponse } from "../types/api-response";
import type { productInquirySchema } from "@synoem/schema";
import { transformFileToBuffer } from "../utils";

export async function createProductInquiryHelper(
  input: z.infer<typeof productInquirySchema>,
  payload: BasePayload,
): Promise<APIResponse<string>> {
  const {
    productTypeId,
    name,
    email,
    phone,
    requirements,
    page,
    ipAddress,
    userAgent,
    attachments,
    relatedProductId,

    ...rest
  } = input;

  const attachmentResults = [];

  let relatedProduct:
    | { relationTo: "solar-panels" | "pump-controllers"; value: string }
    | undefined;

  if (productTypeId === "solar-panel" && relatedProductId) {
    relatedProduct = {
      relationTo: "solar-panels",
      value: relatedProductId,
    };
  } else if (productTypeId === "pump-controller" && relatedProductId) {
    relatedProduct = {
      relationTo: "pump-controllers",
      value: relatedProductId,
    };
  }

  try {
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        if (attachment && attachment.size > 0 && attachment.size < 10 * 1024 * 1024) {
          const buffer = await transformFileToBuffer(attachment);

          const { name, type, size } = attachment;

          const payloadFile = {
            name,
            mimetype: type,
            size,
            data: buffer,
          };

          const uploadedFile = await payload.create({
            collection: "attachments",
            data: {
              filename: name,
            },
            file: payloadFile,
          });

          attachmentResults.push({
            file: uploadedFile,
            id: uploadedFile.id,
          });
        }
      }
    }

    const result = await payload.create({
      collection: "inquiries",
      data: {
        formType: "product",
        name,
        email,
        phone,
        requirements,
        page,
        ipAddress,
        userAgent,
        attachments: attachmentResults,
        relatedProduct,
        ...(rest as Record<string, unknown>),
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
      messageKey: "api.createProductInquiry.error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        details: error,
      },
    };
  }
}
