import type { Locale } from "@synoem/config";

import { Link } from "@/i18n/navigation";
import { NewsletterInput } from "~/components/newsletter-input.client";
import { LanguageSwitcher } from "~/components/language-switcher.client";
import { SocialLinks } from "~/components/social-links.server";
import { getFooterCached } from "~/data/get-globals";

import { Suspense } from "react";

export const Footer = ({ locale }: { locale: Locale }) => {
  return (
    <footer className="mt-auto border-t border-border z-50 relative">
      <Suspense fallback={<div>Loading...</div>}>
        <FooterInner locale={locale} />
      </Suspense>
    </footer>
  );
};

export const FooterInner = async ({ locale }: { locale: Locale }) => {
  const footerResponse = await getFooterCached(locale)();

  if (footerResponse.status === "error" || !footerResponse.data) {
    return <div>No footer data</div>;
  }

  const { copyright, links, companySection, columns } = footerResponse.data;

  // const showSocialLinks = companySection?.showSocialLinks ?? true;

  return (
    <div className="relative w-full flex flex-col">
      <div className="container flex flex-col justify-between p-12 gap-8 md:flex-row">
        <div className="md:flex-1/4 flex flex-col gap-4">
          <Link href="/">LOGO</Link>
          <div className="mt-6 flex space-x-4">
            <SocialLinks />
          </div>

          <NewsletterInput />
        </div>
      </div>
      <div className="flex items-center flex-col md:flex-row justify-between p-6 border-t border-border">
        {/* <div>
          <div className="text-sm">
            {`© ${new Date().getFullYear()} ${companyInfoData?.name}. ${copyright}`}
            </div>
          </div> */}

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};
