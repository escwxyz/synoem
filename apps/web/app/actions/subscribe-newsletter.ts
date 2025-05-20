"use server";

import { actionClient } from "~/libs/safe-action";
import { newsletterFormSchema } from "@synoem/schema";
import { getMetadata } from "~/utils/get-metadata";
import { apiClient } from "~/libs/api-client";
import type { APIResponse } from "@synoem/api";

export const subscribeNewsletter = actionClient
  .schema(newsletterFormSchema)
  .action(async ({ parsedInput }): Promise<APIResponse<string>> => {
    const { email } = parsedInput;

    const metadata = await getMetadata();

    try {
      const result = await apiClient.collections.createNewsletter({
        email,
        page: metadata.referer,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
      });

      return result;
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
