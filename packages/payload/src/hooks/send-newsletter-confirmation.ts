import type { CollectionAfterOperationHook } from "payload";
// import type { Locale } from "@synoem/config";

// TODO:
export const sendNewsletterConfirmation: CollectionAfterOperationHook<
  "newsletter-subscribers"
> = async ({ operation, req, result }) => {
  if (operation === "create") {
    // const { payload, i18n } = req;
    // const { email, name } = result;
    // const locale = i18n.language as Locale;
    // try {
    //   const template = emailTemplates.welcome;
    //   const emailData = {
    //     name: name || "",
    //     locale: locale || "en",
    //   };
    //   const html = await renderEmailTemplate(template, emailData);
    //   await payload.sendEmail({
    //     from: "info@updates.synoem.com",
    //     to: email,
    //     subject:
    //       typeof template.subject === "function" ? template.subject(emailData) : template.subject,
    //     html,
    //   });
    // } catch (error) {
    //   console.error("Error sending newsletter confirmation email:", error);
    // }
  }

  return result;
};
