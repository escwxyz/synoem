import type { GlobalAfterChangeHook } from "payload";

export const revalidateGlobals: GlobalAfterChangeHook = async ({ global, req: { locale } }) => {
  const { slug } = global;
  const baseUrl = DMNO_PUBLIC_CONFIG.WEB_SITE_URL;
  const revalidatePath = "/api/revalidate-globals";
  const secret = DMNO_CONFIG.WEB_SITE_REVALIDATE_SECRET;

  const fullRevalidateUrl = `${baseUrl.replace(/\/$/, "")}${revalidatePath}?secret=${encodeURIComponent(secret)}`;

  try {
    const response = await fetch(fullRevalidateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locale: locale === "all" ? undefined : locale, // support non-localized globals
        slug,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to revalidate globals for slug '${slug}' (locale: ${locale}). Status: ${response.status}`,
      );
    }

    return true;
  } catch (error) {
    console.error(`Error in revalidateGlobals for slug '${slug}' (locale: ${locale}):`, error);
    throw error;
  }
};
