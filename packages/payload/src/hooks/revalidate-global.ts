import type { GlobalAfterChangeHook } from "payload";
import type { RevalidateGlobalBody } from "../types.js";

export const revalidateGlobal: GlobalAfterChangeHook = async ({
  global,
  req: { locale },
  context,
}) => {
  if (context.skipRevalidation) {
    return;
  }

  const { slug } = global;
  const baseUrl = DMNO_PUBLIC_CONFIG.WEB_SITE_URL;
  const revalidatePath = "/api/revalidate-global";
  const secret = DMNO_CONFIG.WEB_SITE_REVALIDATE_SECRET;

  const fullRevalidateUrl = `${baseUrl.replace(/\/$/, "")}${revalidatePath}?secret=${encodeURIComponent(secret)}`;

  try {
    const body: RevalidateGlobalBody = {
      type: slug,
      locale: locale === "all" ? undefined : locale,
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
        `Failed to revalidate globals for slug '${slug}' (locale: ${locale}). Status: ${response.status}`,
      );
    }

    return true;
  } catch (error) {
    console.error(`Error in revalidateGlobal for slug '${slug}' (locale: ${locale}):`, error);
    throw error;
  }
};
