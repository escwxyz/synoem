import type { CollectionBeforeChangeHook } from "payload";
import crypto from "node:crypto";
import type { NewsletterSubscriber } from "@synoem/types";

export const generateNewsletterToken: CollectionBeforeChangeHook<NewsletterSubscriber> = async ({
  operation,
  data,
}) => {
  if (operation === "create" && !data.token) {
    data.token = crypto.randomBytes(32).toString("hex");
  }
  return data;
};
