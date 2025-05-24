import { getPageCached } from "@/app/data/get-page";
import { isValidLocale } from "@/app/utils/is-valid-locale";
import type { Locale } from "@synoem/config";
import { getPayloadClient } from "@synoem/payload/client";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { LivePreviewListener } from "~/components/live-preview-listener.client";
import { RenderBlocks } from "~/components/blocks/render-blocks.server";

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

export default async function Page({
  params,
}: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

  const { isEnabled: draft } = await draftMode();

  if (!isValidLocale(locale)) {
    return notFound();
  }

  const pageResponse = await getPageCached(locale as Locale, slug)();

  if (pageResponse.status === "error" || !pageResponse.data) {
    return notFound();
  }

  return (
    <div>
      <h1>{pageResponse.data.title}</h1>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={pageResponse.data.layout} />
    </div>
  );
}
