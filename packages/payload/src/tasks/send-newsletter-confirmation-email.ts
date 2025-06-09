import { APIError, type TaskHandler } from "payload";
import {
  translations,
  NewsletterConfirmation,
} from "@synoem/transactional/newsletter-confirmation";
import React from "react";

import type { Locale } from "@synoem/config";

import { render, pretty } from "@react-email/render";

export const sendNewsletterConfirmationEmail: TaskHandler<
  "send-newsletter-confirmation-email"
> = async ({ input, req }) => {
  const { email, token, createdAt } = input;
  const { i18n, payload } = req;

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

    if (typeof response.logo !== "object" || !response.logo?.url) {
      payload.logger.error("No logo found for company info global");
      throw new APIError("No logo found for company info global");
    }

    const url = response.logo.url;

    const logoUrl = url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_CMS_SERVER_URL || ""}${url}`;

    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_WEB_SITE_URL || ""}/${locale}/unsubscribe?email=${email}&token=${token}`;

    await payload.sendEmail({
      to: email,
      subject,
      html: await pretty(
        await render(
          React.createElement(NewsletterConfirmation, {
            subscriptionDate: createdAt || new Date().toISOString(),
            unsubscribeUrl,
            language: locale,
            logoUrl,
            baseUrl: process.env.NEXT_PUBLIC_WEB_SITE_URL || "",
          }),
        ),
      ),
    });

    payload.logger.info(`Successfully sent newsletter confirmation email to ${email}`);
  } catch (error) {
    payload.logger.error(`Error sending newsletter confirmation email to ${email}: ${error}`);
    throw new APIError("Error sending newsletter confirmation email");
  }

  return {
    output: "Email sent",
  };
};
