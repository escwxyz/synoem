"use server";

import { actionClient } from "~/libs/safe-action";
import { newsletterFormSchema, unsubscribeNewsletterFormSchema } from "@synoem/schema";
import { getMetadata } from "~/utils/get-metadata";
import type { APIResponse } from "~/types/api-response";
import { getPayloadClient } from "@synoem/payload/client";

export const subscribeNewsletter = actionClient
  .schema(newsletterFormSchema)
  .action(async ({ parsedInput }): Promise<APIResponse<string>> => {
    const { email } = parsedInput;

    const metadata = await getMetadata();

    const payload = await getPayloadClient();

    try {
      const existingSubscriber = await payload.find({
        collection: "newsletter-subscribers",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (existingSubscriber.docs.length > 0) {
        return {
          status: "error",
          messageKey: "api.createNewsletter.emailAlreadySubscribed",
          error: {
            code: "BAD_REQUEST",
            details: "Email already subscribed",
          },
        };
      }

      const result = await payload.create({
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

      return {
        status: "success",
        data: result.id,
      };
    } catch (error) {
      console.warn(error);
      return {
        status: "error",
        messageKey: "api.createNewsletter.error",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: error,
        },
      };
    }
  });

export const unsubscribeNewsletter = actionClient
  .schema(unsubscribeNewsletterFormSchema)
  .action(async ({ parsedInput }): Promise<APIResponse<true>> => {
    const { email, token } = parsedInput;

    const payload = await getPayloadClient();

    try {
      const subscriber = await payload.find({
        collection: "newsletter-subscribers",
        where: {
          email: {
            equals: email,
          },
          token: {
            equals: token,
          },
        },
        limit: 1,
        pagination: false,
      });

      if (subscriber.docs.length === 0) {
        return {
          status: "error",
          messageKey: "api.unsubscribeNewsletter.invalidToken",
          error: {
            code: "BAD_REQUEST",
            details: "Invalid token",
          },
        };
      }

      if (subscriber.docs.length > 0 && subscriber.docs[0]?.status === "unsubscribed") {
        return {
          status: "error",
          messageKey: "api.unsubscribeNewsletter.alreadyUnsubscribed",
          error: {
            code: "BAD_REQUEST",
            details: "Email already unsubscribed",
          },
        };
      }

      await payload.update({
        collection: "newsletter-subscribers",
        where: {
          email: {
            equals: email,
          },
          token: {
            equals: token,
          },
        },
        data: {
          status: "unsubscribed",
        },
      });

      return {
        status: "success",
        data: true,
      };
    } catch (error) {
      console.warn(error);
      return {
        status: "error",
        messageKey: "api.unsubscribeNewsletter.error",
        error: {
          code: "INTERNAL_SERVER_ERROR",
          details: error,
        },
      };
    }
  });
