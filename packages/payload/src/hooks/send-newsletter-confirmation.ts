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

    const { email, token } = result;

    payload.logger.info(`Sending newsletter confirmation email to ${email}`);

    const locale = i18n.language as Locale;

    const subject = translations[locale].preview;

    try {
      const response = await payload.findGlobal({
        slug: "company-info",
        depth: 1,
        select: {
          logo: true,
        },
      });

      if (typeof response.logo !== "object" || !response.logo.url) {
        req.payload.logger.error("No logo found for company info global");
        throw new Error("No logo found for company info global");
      }

      const url = response.logo.url;

      const logoUrl = url.startsWith("http") ? url : `${DMNO_CONFIG.CMS_SERVER_URL}${url}`;

      // TODO: utilize the payload job queue to send the email for more robust workflow

      const unsubscribeUrl = `${DMNO_CONFIG.WEB_SITE_URL}/${locale}/unsubscribe?email=${email}&token=${token}`;

      async () => {
        await payload.sendEmail({
          to: email,
          subject,
          html: await pretty(
            await render(
              React.createElement(NewsletterConfirmation, {
                subscriptionDate: new Date().toISOString(),
                unsubscribeUrl,
                language: locale,
                logoUrl,
                baseUrl: DMNO_CONFIG.WEB_SITE_URL,
              }),
            ),
          ),
        });
      };

      payload.logger.info(`Newsletter confirmation email sent to ${email}`);
    } catch (error) {
      console.warn("Error sending newsletter confirmation email:", error);

      payload.logger.error("Error sending newsletter confirmation email:", error);

      throw new Error(
        `Error sending newsletter confirmation email: \n${JSON.stringify(error, null, 2)}`,
      );
    }
  }

  return result;
};
