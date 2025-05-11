import type { CollectionAfterOperationHook } from "payload";
import SubscriptionConfirmation from "@synoem/transactional/SubscriptionConfirmation";
import SubscriptionNotification from "@synoem/transactional/SubscriptionNotification";
import type { Locale } from "@synoem/config";
import { render, pretty } from "@react-email/render";
import React from "react";

export const sendNewsletterConfirmation: CollectionAfterOperationHook<
  "newsletter-subscribers"
> = async ({ operation, req, result }) => {
  if (operation === "create") {
    const { payload, i18n } = req;
    const { email } = result;
    const locale = i18n.language as Locale;
    try {
      await payload.sendEmail({
        from: "info@updates.synoem.com",
        to: email,
        subject: "Welcome to our newsletter",
        html: await pretty(await render(React.createElement(SubscriptionConfirmation, { locale }))),
      });

      await payload.sendEmail({
        from: "info@updates.synoem.com",
        to: "info@system.com",
        subject: "A new user has subscribed to your website",
        html: await pretty(await render(React.createElement(SubscriptionNotification, { email }))),
      });
    } catch (error) {
      console.error("Error sending newsletter confirmation email:", error);
    }
  }

  return result;
};
