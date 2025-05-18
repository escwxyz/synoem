// TODO: populate backend api error

import { defineAction, ActionError } from "astro:actions";
import { simpleInquiryFormSchema, productInquiryFormSchema } from "@synoem/schema";
import { getMetadata } from "~/utils/get-metadata";
import { apiClient } from "~/lib/api";

const sendSimpleInquiryAction = defineAction({
  accept: "form",
  input: simpleInquiryFormSchema,
  handler: async ({ terms, name, email, phone, requirements }, context) => {
    if (!terms) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "inquiry.action.acceptTerms",
      });
    }

    try {
      const metadata = getMetadata(context.request.headers);

      const result = await apiClient.collections.createSimpleInquiry({
        name,
        email,
        phone,
        requirements,
        page: metadata.referer,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
        terms: true,
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error(error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "inquiry.action.error",
      });
    }
  },
});

const sendProductInquiryAction = defineAction({
  accept: "form",
  input: productInquiryFormSchema,
  handler: async (
    {
      terms,
      name,
      email,
      phone,
      requirements,
      attachments,
      productTypeId,
      relatedProductId,
      ...rest
    },
    context,
  ) => {
    if (!terms) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "inquiry.action.acceptTerms",
      });
    }

    try {
      const metadata = getMetadata(context.request.headers);

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

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error(error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "inquiry.action.error",
      });
    }
  },
});

export const inquiry = {
  sendSimpleInquiryAction,
  sendProductInquiryAction,
};
