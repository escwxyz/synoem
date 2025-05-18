// TODO: populate backend api error

import { ActionError, defineAction } from "astro:actions";
import { getMetadata } from "~/utils/get-metadata";
import { apiClient } from "~/lib/api";
import { newsletterFormSchema } from "@synoem/schema";

const subscribeNewsletterAction = defineAction({
  accept: "form",
  input: newsletterFormSchema,
  handler: async ({ email }, context) => {
    try {
      const metadata = getMetadata(context.request.headers);

      const result = await apiClient.collections.createNewsletter({
        email,
        page: metadata.referer,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
      });

      return result;
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }

      console.error(error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "action.newsletter.error",
      });
    }
  },
});

export const newsletter = {
  subscribeNewsletterAction,
};
