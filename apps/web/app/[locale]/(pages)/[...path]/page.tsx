import { RenderBlocks } from "~/components/blocks/render-blocks.server";
import { LastUpdated } from "~/components/last-updated.server";
import { LivePreviewListener } from "~/components/live-preview-listener.client";
import { getDocumentByPathCached, getUniquePaths } from "~/data/get-document-by-path";
import { getPageMetadata } from "~/data/get-page-metadata";
import { isValidLocale } from "@synoem/config";
import { notFound } from "next/navigation";
import { normalizePath } from "~/utils";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{
    path: string[];
    locale: string;
  }>;
}

const extractPath = async ({ params }: PageProps): Promise<string> => {
  const { path = [] } = await params;

  return normalizePath(path, false);
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return;
  }

  const path = await extractPath({ params });

  const documentResponse = await getDocumentByPathCached(locale, path, 0)();

  if (!documentResponse || documentResponse.status === "error" || !documentResponse.data) {
    return;
  }

  return getPageMetadata({ locale, pageTitle: documentResponse.data.title });
}

export async function generateStaticParams() {
  const excludedPaths = ["/home", "/product", "/products"];

  const paths = await getUniquePaths(excludedPaths);

  return paths.map((path) => path.split("/").filter(Boolean));
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return notFound();
  }
  const path = await extractPath({ params });

  const documentResponse = await getDocumentByPathCached(locale, path)();

  if (!documentResponse || documentResponse.status === "error" || !documentResponse.data)
    return notFound();

  const document = documentResponse.data;

  if (document._collection === "pages") {
    const lastUpdated = document.showLastUpdated ? document.updatedAt : document.publishedAt;

    return (
      <>
        <LivePreviewListener />
        <RenderBlocks blocks={document.layout} />
        {lastUpdated && <LastUpdated date={lastUpdated} locale={locale} />}
      </>
    );
  }

  if (document._collection === "posts") {
    // TODO: implement post page based on blocks
    return <LivePreviewListener />;
  }

  return notFound();
}
