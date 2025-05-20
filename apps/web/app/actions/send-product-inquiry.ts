"use server";

// might need migration to https://orpc.unnoq.com/docs/server-action#createformaction-utility

import { actionClient } from "~/libs/safe-action";
import { productInquiryFormSchema } from "@synoem/schema";
import { getMetadata } from "~/utils/get-metadata";
import { apiClient } from "~/libs/api-client";

export const sendProductInquiry = actionClient
  .schema(productInquiryFormSchema)
  .action(async ({ parsedInput }) => {
    const {
      name,
      email,
      phone,
      requirements,
      terms,
      attachments,
      relatedProductId,
      productTypeId,
      ...rest
    } = parsedInput;

    if (!terms) {
      return {
        status: "error",
        messageKey: "action.product.sendProductInquiry.error.terms",
        error: {
          code: "BAD_REQUEST",
          details: "Terms and conditions must be accepted",
        },
      };
    }

    const metadata = await getMetadata();

    try {
      const result = await apiClient.collections.createProductInquiry({
        terms,
        name,
        email,
        phone,
        requirements,
        attachments,
        productTypeId,
        relatedProductId,
        page: metadata.referer,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
        ...rest,
      });

      return result;
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        messageKey: "action.product.sendProductInquiry.error",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: error,
        },
      };
    }
  });
