import { isValidLocale } from "~/utils/is-valid-locale";
import { defaultLocale } from "@synoem/config";

import { getDocumentByPathCached } from "@/app/data/get-document-by-path";
import { notFound } from "next/navigation";
import { LivePreviewListener } from "@/app/components/live-preview-listener.client";
import { RenderBlocks } from "@/app/components/blocks/render-blocks.server";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const effectiveLocale = isValidLocale(locale) ? locale : defaultLocale;

  const homePageResponse = await getDocumentByPathCached(effectiveLocale, "/home")();

  if (homePageResponse?.status === "error" || !homePageResponse?.data) {
    return notFound();
  }

  const homePageData = homePageResponse.data;

  if (homePageData._collection !== "pages") {
    return notFound();
  }

  return (
    <>
      <LivePreviewListener />
      <RenderBlocks blocks={homePageData.layout} />
    </>
  );
}
