import { ContactUsForm } from "@/app/components/contact-us-form.client";
import { getPageMetadata } from "@/app/data/get-page-metadata";
import { isValidLocale } from "@/app/utils/is-valid-locale";
import { defaultLocale } from "@synoem/config";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const t = await getTranslations("ContactUsForm");

  const { locale } = await params;

  const effectiveLocale = isValidLocale(locale) ? locale : defaultLocale;

  const title = t("title");

  return getPageMetadata({ locale: effectiveLocale, pageTitle: title });
};

export default function ContactPage() {
  return (
    <>
      <ContactUsForm />
    </>
  );
}
