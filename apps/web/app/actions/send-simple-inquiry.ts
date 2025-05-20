"use server";

import { actionClient } from "~/libs/safe-action";
import { simpleInquiryFormSchema } from "@synoem/schema";
import { getMetadata } from "~/utils/get-metadata";
import { apiClient } from "../libs/api-client";
import type { APIResponse } from "@synoem/api";

export const sendSimpleInquiry = actionClient
  .schema(simpleInquiryFormSchema)
  .action(async ({ parsedInput }): Promise<APIResponse<string>> => {
    const { terms, name, email, phone, requirements } = parsedInput;

    if (!terms) {
      return {
        status: "error",
        messageKey: "api.action.acceptTerms",
      };
    }

    const metadata = await getMetadata();

    try {
      const response = await apiClient.collections.createSimpleInquiry({
        name,
        email,
        phone,
        requirements,
        terms,
        page: metadata.referer,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
      });

      return response;
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        messageKey: "api.action.error",
        error: {
          code: "INTERNAL_SERVER_ERROR",
        },
      };
    }
  });
