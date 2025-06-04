"use client";

import { useTranslations } from "next-intl";
import { CheckField, EmailField, MessageField, NameField, PhoneField } from "./fields";

export const BasicInquiryForm = () => {
  const t = useTranslations("InquiryFormFields");
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("basicInformation.title")}</h3>
      <NameField name="name" label={t("name.label")} />
      <EmailField name="email" label={t("email.label")} />
      <PhoneField name="phone" label={t("phone.label")} />
      <MessageField name="message" label={t("message.label")} />
      <h3 className="text-lg font-semibold">{t("contactPreferences.label")}</h3>
      <div className="grid grid-cols-3 gap-4">
        <CheckField name="contactEmail" label={t("contactPreferences.options.email")} />
        <CheckField name="contactPhone" label={t("contactPreferences.options.phone")} />
        <CheckField name="contactWhatsapp" label={t("contactPreferences.options.whatsapp")} />
      </div>
    </div>
  );
};
