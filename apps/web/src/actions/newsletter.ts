import { newsletterSchema } from "~/schemas/newsletter";
import { ActionError, defineAction } from "astro:actions";
import { getPayload } from "payload";
import config from "@synoem/payload/payload-config";
import { getMetadata } from "~/utils/get-metadata";

const subscribeNewsletterAction = defineAction({
  accept: "form",
  input: newsletterSchema,
  handler: async ({ email, name, terms }, context) => {
    if (!terms) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "newsletter.action.acceptTerms",
      });
    }

    try {
      const payload = await getPayload({ config });

      const metadata = getMetadata(context.request.headers);

      await payload.create({
        collection: "newsletter-subscribers",
        data: {
          email,
          name,
          metadata: {
            page: metadata.referer,
            ipAddress: metadata.forwardedFor,
            userAgent: metadata.userAgent,
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "newsletter.action.error",
      });
    }
  },
});

export const newsletter = {
  subscribeNewsletterAction,
};
