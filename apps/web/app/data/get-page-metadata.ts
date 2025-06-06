import "server-only";

import { locales, type Locale } from "@synoem/config";
import { getCompanyInfoCached } from "./get-globals";
import { getUrl } from "../utils/get-url";
import type { Metadata } from "next";

export const getPageMetadata = async ({
  locale,
  pageTitle,
}: { locale: Locale; pageTitle?: string }) => {
  const languages = locales.reduce(
    (acc, locale) => {
      acc[locale] = `${process.env.NEXT_PUBLIC_WEB_SITE_URL || ""}/${locale}`;
      return acc;
    },
    {} as Record<Locale, string>,
  );

  const companyInfo = await getCompanyInfoCached(locale)();

  const keywordMap: Record<Locale, string[]> = {
    de: ["Solarmodule", "Erneubare Energie", "Photovoltaik", "Photovoltaik Anlage"],
    en: ["Solar Panel", "Renewable Energy", "Photovoltaic"],
  };

  const keywords = keywordMap[locale] || keywordMap.en;

  const openGraphImageSrc =
    companyInfo.data?.openGraphImage && typeof companyInfo.data.openGraphImage === "object"
      ? companyInfo.data.openGraphImage.url
      : null;

  const companyName = companyInfo?.data?.name ?? "";
  const shortDescription = companyInfo?.data?.shortDescription ?? "";
  const longDescription = companyInfo?.data?.longDescription ?? "";

  let title = "";

  if (pageTitle && companyName) {
    title = `${pageTitle} | ${companyName}`;
  } else if (pageTitle) {
    title = pageTitle;
  } else if (companyName) {
    title = companyName;
  }

  if (title && shortDescription) {
    title += ` - ${shortDescription}`;
  } else if (!title && shortDescription) {
    title = shortDescription;
  }

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    title,
    description: longDescription,
    url: process.env.NEXT_PUBLIC_WEB_SITE_URL || "",
    siteName: companyName,
    locale,
    type: "website",
    ...(openGraphImageSrc && {
      images: [
        {
          url: getUrl(openGraphImageSrc),
          alt: companyName,
        },
      ],
    }),
  };

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_SITE_URL || ""),
    title,
    description: longDescription,
    keywords,
    openGraph,
    twitter: {
      title,
      description: longDescription,
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
      canonical: process.env.NEXT_PUBLIC_WEB_SITE_URL || "",
      languages,
    },
  };
};
