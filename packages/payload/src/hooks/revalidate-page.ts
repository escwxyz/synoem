import type { Page } from "@synoem/types";
import type { CollectionAfterChangeHook } from "payload";

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  req: { locale, payload },
}) => {
  if (locale === "all" || !locale) {
    payload.logger.warn(
      "Revalidation skipped: locale is not set or is 'all' for a create/update operation",
    );
    return;
  }

  // TODO: consider supporting draft mode?

  const { slug } = doc;
  const baseUrl = DMNO_PUBLIC_CONFIG.WEB_SITE_URL;
  const revalidatePath = "/api/revalidate-page";
  const secret = DMNO_CONFIG.WEB_SITE_REVALIDATE_SECRET;

  const fullRevalidateUrl = `${baseUrl.replace(/\/$/, "")}${revalidatePath}?secret=${encodeURIComponent(secret)}`;

  try {
    const response = await fetch(fullRevalidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locale,
        slug,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to revalidate page for slug '${slug}' (locale: ${locale}). Status: ${response.status}`,
      );
    }

    return true;
  } catch (error) {
    console.error(`Error in revalidatePage for slug '${slug}' (locale: ${locale}):`, error);
    throw error;
  }

  // todo support delete
};
