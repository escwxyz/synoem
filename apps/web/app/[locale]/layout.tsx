import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { JotaiProvider } from "~/components/jotai-provider.client";
import { CookieConsent } from "~/components/cookie-consent.client";
import { ThemeProvider } from "~/components/theme-provider.client";
import { SidebarInset, SidebarProvider } from "~/components/sidebar.client";
import { Header } from "~/layouts/header-layout.server";
import { Footer } from "~/layouts/footer-layout.server";
import { WebVitals } from "~/components/web-vitals.client";
import GoogleAnalytics from "~/components/google-analytics.client";
import { Inter } from "next/font/google";
import { isValidLocale } from "~/utils/is-valid-locale";
import { getCompanyInfoCached } from "~/data/get-globals";
import { defaultLocale, type Locale, locales } from "@synoem/config";
import { NotificationBar } from "~/components/notification-bar.server";

import "@synoem/ui/web.css";
import { getUrl } from "../utils/get-url";

const inter = Inter({
  preload: true,
  subsets: ["latin"],
});

export const generateMetadata = async ({
  params,
}: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await params;

  const effectiveLocale: Locale = isValidLocale(locale) ? (locale as Locale) : defaultLocale;

  const languages = locales.reduce(
    (acc, locale) => {
      acc[locale] = `${DMNO_PUBLIC_CONFIG.WEB_SITE_URL}/${locale}`;
      return acc;
    },
    {} as Record<Locale, string>,
  );

  const companyInfo = await getCompanyInfoCached(effectiveLocale)();

  const keywords =
    effectiveLocale === "de"
      ? ["Solarmodule", "Erneubare Energie", "Photovoltaik", "Photovoltaik Anlage"]
      : ["Solar Panel", "Renewable Energy", "Photovoltaic"];

  const openGraphImageSrc =
    companyInfo.data?.openGraphImage && typeof companyInfo.data.openGraphImage === "object"
      ? companyInfo.data.openGraphImage.url
      : null;

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    title: companyInfo.data?.name,
    description: companyInfo.data?.longDescription,
    url: DMNO_PUBLIC_CONFIG.WEB_SITE_URL,
    siteName: companyInfo.data?.name,
    locale: effectiveLocale,
    type: "website",
    ...(openGraphImageSrc && {
      images: [
        {
          url: getUrl(openGraphImageSrc),
          alt: companyInfo.data?.name,
        },
      ],
    }),
  };

  return {
    metadataBase: new URL(DMNO_PUBLIC_CONFIG.WEB_SITE_URL),
    title: companyInfo.data?.name,
    description: companyInfo.data?.longDescription,
    keywords,
    openGraph,
    twitter: {
      title: companyInfo.data?.name,
      description: companyInfo.data?.longDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: DMNO_PUBLIC_CONFIG.WEB_SITE_URL,
      languages,
    },
  };
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={inter.className}
      suppressHydrationWarning={DMNO_PUBLIC_CONFIG.WEB_APP_ENV === "production"}
    >
      <head>
        {/* <script src="https://cdn.jsdelivr.net/npm/react-scan/dist/auto.global.js" /> */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>
      <body
        className="flex min-h-screen flex-col antialiased [--header-height:calc(theme(spacing.14))]"
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <JotaiProvider>
            <NextIntlClientProvider locale={locale}>
              <SidebarProvider className="flex flex-col">
                <NotificationBar locale={locale} />
                <Header locale={locale} />
                <SidebarInset className="w-full max-w-none flex-1 mx-auto p-4 md:p-8">
                  {children}
                </SidebarInset>
                <CookieConsent />
                <Footer locale={locale} />
              </SidebarProvider>
            </NextIntlClientProvider>
          </JotaiProvider>
        </ThemeProvider>
        {DMNO_CONFIG.WEB_APP_ENV === "production" && DMNO_CONFIG.GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics />
        )}
      </body>
    </html>
  );
}
