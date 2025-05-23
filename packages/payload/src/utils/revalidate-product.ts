import type { productSchema } from "@synoem/schema";
import type { z } from "zod";

export const revalidateProduct = async (productInfo: z.infer<typeof productSchema>) => {
  const { slug, locale, productTypeId } = productInfo;

  const baseUrl = DMNO_PUBLIC_CONFIG.WEB_SITE_URL;
  const revalidatePath = "/api/revalidate-product";
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
        productTypeId,
        slug,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to revalidate product tags for slug '${slug}' (locale: ${locale}, type: ${productTypeId}). Status: ${response.status}`,
      );
    }

    return true;
  } catch (error) {
    console.error(`Error in revalidateTag for product slug '${slug}':`, error);
    throw error;
  }
};
