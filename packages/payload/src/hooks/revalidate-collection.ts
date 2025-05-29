import type { CollectionAfterChangeHook } from "payload";
import type { RevalidateCollectionBody } from "../types";

export const revalidateCollection: CollectionAfterChangeHook = async ({
  req: { payload, locale },
  collection,
  doc,
  context,
}) => {
  if (context.skipRevalidation) {
    return;
  }

  const { slug } = doc;

  if (!slug) {
    payload.logger.warn("Revalidation skipped: slug is not set for the collection");
    return;
  }

  if (locale === "all") {
    payload.logger.warn("Revalidation skipped: locale is 'all' for this collection");
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_WEB_SITE_URL || "";
  const revalidatePath = "/api/revalidate-collection";
  const secret = process.env.REVALIDATE_SECRET || "";

  const fullRevalidateUrl = `${baseUrl.replace(/\/$/, "")}${revalidatePath}?secret=${encodeURIComponent(secret)}`;

  try {
    const body: RevalidateCollectionBody = {
      type: collection.slug,
      locale: locale,
      slug,
    };

    const response = await fetch(fullRevalidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to revalidate collection '${collection.slug}' for slug '${slug}' (locale: ${locale}). Status: ${response.status}`,
      );
    }

    return true;
  } catch (error) {
    payload.logger.error(
      `Failed to revalidate collection '${collection.slug}' for slug '${slug}' (locale: ${locale}):`,
      error,
    );
    throw error;
  }
};
