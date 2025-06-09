import { Link } from "@/i18n/navigation";
import type { Locale } from "@synoem/config";
import { LanguageSwitcher } from "~/components/language-switcher.client";
import { getCompanyInfoCached, getContactInfoCached, getFooterCached } from "~/data/get-globals";
import { SocialLinks } from "~/components/social-links.server";
import { NewsletterInput } from "~/components/newsletter-input.client";
import { Logo, LogoSkeleton } from "~/components/logo.server";
import { Suspense } from "react";
import { getLinkConfig } from "../utils";
import { AddressInfo } from "../components/address-info.server";

interface Props {
  locale: Locale;
}

export const Footer = async ({ locale }: Props) => {
  const companyInfoResponse = await getCompanyInfoCached(locale)();

  const hasLongDescription =
    companyInfoResponse.data?.longDescription &&
    companyInfoResponse.data.longDescription.length > 0;

  const footerDataResponse = await getFooterCached(locale)();

  const contactInfoResponse = await getContactInfoCached()();

  if (companyInfoResponse.status === "error") {
    console.warn("Failed to fetch company info:", companyInfoResponse.error);
    return null;
  }

  return (
    <footer className="relative overflow-hidden border-t bg-muted/30">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/30 blur-3xl dark:bg-primary/10" />
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-primary/30 blur-3xl dark:bg-primary/10" />
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <div className="mb-4 flex items-center justify-start gap-2">
              <Suspense fallback={<LogoSkeleton size={80} />}>
                <Logo locale={locale} size={80} />
              </Suspense>
              <span className="bg-primary from-foreground via-bg-muted to-primary bg-clip-text text-2xl font-semibold text-transparent dark:bg-gradient-to-b">
                {companyInfoResponse?.data?.name}
              </span>
            </div>
            <p className="mb-6 text-muted-foreground">
              {hasLongDescription &&
              companyInfoResponse?.data?.longDescription?.length &&
              companyInfoResponse?.data?.longDescription.length <= 100
                ? companyInfoResponse?.data?.longDescription
                : companyInfoResponse?.data?.shortDescription}
            </p>
            <div className="flex space-x-3">
              <SocialLinks />
            </div>
            <div className="mt-6">
              <NewsletterInput />
            </div>
          </div>
          {footerDataResponse.status === "success" && footerDataResponse.data ? (
            <>
              {footerDataResponse.data?.columns?.map((column) => (
                <div key={column.id} className="col-span-1">
                  {column.blockType === "linkGroup" && (
                    <>
                      <h3 className="mb-4 font-semibold">{column?.linkGroup?.title}</h3>
                      <ul className="space-y-2">
                        {column?.linkGroup?.links?.map((link) => {
                          const linkConfig = getLinkConfig(link.link);

                          if (!linkConfig) return null;

                          const { href, openInNewTab } = linkConfig;

                          return (
                            <li key={link.id}>
                              <Link
                                href={href}
                                {...(openInNewTab && { target: "_blank" })}
                                className="text-sm text-muted-foreground hover:text-primary"
                              >
                                {link.link?.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                  {column.blockType === "contactInfo" && contactInfoResponse.data && (
                    <div>
                      <h3 className="mb-4 font-semibold">Contact Us</h3>
                      <div className="mb-4 flex flex-col gap-2">
                        {contactInfoResponse.data?.phone && (
                          <Link
                            href={`tel:${contactInfoResponse.data?.phone}`}
                            className="text-sm text-muted-foreground"
                          >
                            {contactInfoResponse.data?.phone}
                          </Link>
                        )}
                        {contactInfoResponse.data?.email && (
                          <Link
                            href={`mailto:${contactInfoResponse.data?.email}`}
                            className="text-sm text-muted-foreground"
                          >
                            {contactInfoResponse.data?.email}
                          </Link>
                        )}
                      </div>
                      {contactInfoResponse.data?.addresses?.[0] && (
                        <AddressInfo
                          address={contactInfoResponse.data?.addresses?.[0]}
                          locale={locale}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div>Error fetching footer data</div>
          )}
        </div>
        <div className="relative border-t border-muted/50 pt-8">
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent dark:via-primary/30" />
          <div className="flex flex-col items-center justify-between text-sm text-muted-foreground md:flex-row">
            <p>
              © {new Date().getFullYear()} {companyInfoResponse?.data?.name}.{" "}
              {footerDataResponse?.data?.copyright ?? "All rights reserved."}
            </p>

            {footerDataResponse.data?.links && (
              <div className="flex items-center gap-2 md:gap-4">
                {footerDataResponse.data?.links.map((link) => {
                  const linkConfig = getLinkConfig(link.link);

                  if (!linkConfig) return null;

                  const { href, openInNewTab } = linkConfig;

                  return (
                    <Link
                      key={link.id}
                      href={href}
                      {...(openInNewTab && { target: "_blank" })}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {link.link?.label}
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="hidden mt-4 md:flex items-center space-x-1 md:mt-0">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
