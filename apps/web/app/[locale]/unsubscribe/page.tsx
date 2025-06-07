import { getPageMetadata } from "@/app/data/get-page-metadata";
import { defaultLocale, isValidLocale } from "@synoem/config";
import { getTranslations } from "next-intl/server";
import { UnsubscribeEmailForm } from "~/components/unsubscribe-email-form.client";

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const effectiveLocale = isValidLocale(locale) ? locale : defaultLocale;
  const title = effectiveLocale === "de" ? "Abonnement abbestellen" : "Unsubscribe";
  return getPageMetadata({ locale: effectiveLocale, pageTitle: title });
};

export default async function UnsubscribePage() {
  const t = await getTranslations("UnsubscribePage");

  return (
    <div className="flex flex-col gap-8 max-w-md mx-auto items-center">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="text-sm text-muted-foreground">{t("description")}</p>
      <UnsubscribeEmailForm />
    </div>
  );
}
