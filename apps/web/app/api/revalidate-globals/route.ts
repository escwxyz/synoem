import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== DMNO_CONFIG.WEB_SITE_REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: "Invalid secret" }), { status: 401 });
  }

  const body = await req.json();

  if (!body || typeof body !== "object" || !("slug" in body) || !("locale" in body)) {
    return new Response(JSON.stringify({ message: "Invalid body" }), { status: 400 });
  }

  const { locale, slug } = body as {
    locale: string | undefined;
    slug: string;
  };

  const tag = locale ? `global-${slug}-${locale}` : `global-${slug}`;

  try {
    revalidateTag(tag);

    return new Response(JSON.stringify({ revalidated: true, tag }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error revalidating" }), { status: 500 });
  }
}
