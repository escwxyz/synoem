import { newsletterSchema } from "~/schemas/newsletter";
import { ActionError, defineAction } from "astro:actions";
import { getPayloadClient } from "@synoem/payload/client";
import { getMetadata } from "~/utils/get-metadata";

const subscribeNewsletterAction = defineAction({
  accept: "form",
  input: newsletterSchema,
  handler: async ({ email }, context) => {
    try {
      const payload = await getPayloadClient();

      const metadata = getMetadata(context.request.headers);

      const existingSubscriber = await payload.find({
        collection: "newsletter-subscribers",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (existingSubscriber.docs.length > 0) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "action.newsletter.alreadySubscribed",
        });
      }

      await payload.create({
        collection: "newsletter-subscribers",
        data: {
          email,
          metadata: {
            page: metadata.referer,
            ipAddress: metadata.ipAddress,
            userAgent: metadata.userAgent,
          },
        },
      });
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
