import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== DMNO_CONFIG.WEB_SITE_REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: "Invalid secret" }), { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON" }), { status: 400 });
  }

  if (!body || typeof body !== "object" || !("locale" in body) || !("slug" in body)) {
    return new Response(JSON.stringify({ message: "Invalid body" }), { status: 400 });
  }

  const { locale, slug } = body as {
    locale: string;
    slug: string;
  };

  try {
    const pageTag = `page-${slug}-${locale}`;

    revalidateTag(pageTag);

    return new Response(
      JSON.stringify({
        revalidated: true,
        tags: [pageTag],
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error revalidating" }), { status: 500 });
  }
}
