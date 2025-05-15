import type { CollectionAfterOperationHook } from "payload";
import NewsletterConfirmation, {
  translations,
} from "@synoem/transactional/newsletter-confirmation";
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

    const subject = translations[locale].preview;

    try {
      await payload.sendEmail({
        from: "info@updates.synoem.com",
        to: email,
        subject,
        html: await pretty(
          await render(
            React.createElement(NewsletterConfirmation, {
              subscriptionDate: new Date().toISOString(),
              unsubscribeUrl: "https://synoem.com/unsubscribe",
              language: locale,
            }),
          ),
        ),
      });
    } catch (error) {
      console.warn("Error sending newsletter confirmation email:", error);

      throw new Error(
        `Error sending newsletter confirmation email: \n${JSON.stringify(error, null, 2)}`,
      );
    }

    // TODO
  }

  return result;
};
