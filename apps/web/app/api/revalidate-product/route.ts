import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== DMNO_CONFIG.WEB_SITE_REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: "Invalid secret" }), { status: 401 });
  }

  const body = await req.json();

  if (
    !body ||
    typeof body !== "object" ||
    !("locale" in body) ||
    !("productTypeId" in body) ||
    !("slug" in body)
  ) {
    return new Response(JSON.stringify({ message: "Invalid body" }), { status: 400 });
  }

  const { locale, productTypeId, slug } = body as {
    locale: string;
    productTypeId: string;
    slug: string;
  };

  const tag = `product-${productTypeId}-${locale}-${slug}`;

  // We will decide later if we want to use this or not
  //   const path = `/${locale}/products/${productTypeId}`; // TODO: this is not needed if we use client side revalidation

  try {
    revalidateTag(tag);
    // TODO: we also need to revalidate the sitemap
    // console.log("revalidating path", path);
    // revalidatePath(path); //

    return new Response(JSON.stringify({ revalidated: true, tag }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error revalidating" }), { status: 500 });
  }
}
