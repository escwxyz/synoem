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

  try {
    const productTag = `product-${productTypeId}-${locale}-${slug}`;
    const productsListTag = `products-${productTypeId}-${locale}`;

    await Promise.all([revalidateTag(productTag), revalidateTag(productsListTag)]);

    return new Response(
      JSON.stringify({
        revalidated: true,
        tags: [productTag, productsListTag],
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error revalidating" }), { status: 500 });
  }
}
