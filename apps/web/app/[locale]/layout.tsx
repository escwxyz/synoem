import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { JotaiProvider } from "~/components/jotai-provider.client";
import { CookieConsent } from "~/components/cookie-consent.client";
import { ThemeProvider } from "~/components/theme-provider.client";
import { SidebarInset, SidebarProvider } from "~/components/sidebar.client";
import { Header } from "~/layouts/header-layout.server";
import { Footer } from "~/layouts/footer-layout.server";
import { MainLayout } from "~/layouts/main-layout";
// import { WebVitals } from "~/components/web-vitals.client";
import GoogleAnalytics from "~/components/google-analytics.client";

import { isValidLocale } from "~/utils/is-valid-locale";

import { NotificationBar } from "~/components/notification-bar.server";
import { ReactLenis } from "lenis/react";

import { RouteListener } from "~/components/route-listener.client";

import "@synoem/ui/web.css";

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
      // className={inter.className}
      suppressHydrationWarning={process.env.WEB_APP_ENV === "production"}
    >
      <head>
        {/* <script src="https://cdn.jsdelivr.net/npm/react-scan/dist/auto.global.js" /> */}
      </head>
      <body className="flex min-h-screen flex-col antialiased [--header-height:calc(theme(spacing.14))]">
        {/* <WebVitals /> */}
        <JotaiProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <ReactLenis root>
              <NextIntlClientProvider locale={locale}>
                <RouteListener />
                <SidebarProvider className="flex flex-col">
                  <NotificationBar locale={locale} />
                  <Header locale={locale} />
                  <MainLayout>{children}</MainLayout>
                  <CookieConsent />
                  <Footer locale={locale} />
                </SidebarProvider>
              </NextIntlClientProvider>
            </ReactLenis>
          </ThemeProvider>
          {process.env.WEB_APP_ENV === "production" &&
            process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && <GoogleAnalytics />}
        </JotaiProvider>
      </body>
    </html>
  );
}
