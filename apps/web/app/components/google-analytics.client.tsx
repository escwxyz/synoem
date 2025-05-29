"use client";

import Script from "next/script";
import { webEnvs } from "@synoem/env";

const GoogleAnalytics = () => {
  const gid = webEnvs.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gid}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gid}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
