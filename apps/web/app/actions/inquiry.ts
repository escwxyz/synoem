"use server";

import { actionClient } from "~/libs/safe-action";
import { getMetadata } from "~/utils/get-metadata";
import { inquiryFormSchema } from "@synoem/schema";
import { getPayloadClient } from "@synoem/payload/client";
import type { APIResponse } from "~/types/api-response";
import { transformFileToBuffer } from "~/utils";
import type { QuantityUnit } from "@synoem/config";

export const sendInquiry = actionClient
  .inputSchema(inquiryFormSchema)
  .action(async ({ parsedInput }): Promise<APIResponse<string>> => {
    const {
      terms,
      name,
      email,
      phone,
      message,
      productTypeId,
      relatedProductId,
      attachments,
      token,
      quantity,
      quantityUnit,
      ...rest
    } = parsedInput;

    if (!terms) {
      return {
        status: "error",
        messageKey: "api.sendInquiry.acceptTerms",
        error: {
          code: "BAD_REQUEST",
          details: "Terms and conditions must be accepted",
        },
      };
    }

    if (!token) {
      return {
        status: "error",
        messageKey: "api.sendInquiry.tokenRequired",
        error: {
          code: "BAD_REQUEST",
          details: "Token is required",
        },
      };
    }

    const metadata = await getMetadata();

    const payload = await getPayloadClient();

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

      const response = await payload.create({
        collection: "inquiries",
        data: {
          token,
          name,
          email,
          phone,
          message,
          page: metadata.referer,
          ipAddress: metadata.ipAddress,
          userAgent: metadata.userAgent,
          relatedProduct,
          attachments: attachmentResults.length > 0 ? attachmentResults : undefined,
          qty: {
            value: quantity,
            unit: quantityUnit as QuantityUnit,
          },
          ...(rest as Record<string, unknown>),
        },
      });

      return {
        status: "success",
        data: response.id,
      };
    } catch (error) {
      console.error(`Error sending inquiry: ${error}`);
      return {
        status: "error",
        messageKey: "api.sendInquiry.error",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: error,
        },
      };
    }
  });
