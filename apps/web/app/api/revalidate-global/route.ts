import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import type { RevalidateGlobalBody, RevalidateGlobalTagName } from "@synoem/payload/types";
import { isValidLocale } from "@synoem/config";

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

  if (!body || typeof body !== "object" || !("type" in body) || !("locale" in body)) {
    return new Response(JSON.stringify({ message: "Invalid body" }), { status: 400 });
  }

  const { locale, type } = body as unknown as RevalidateGlobalBody;

  const tag: RevalidateGlobalTagName<typeof locale> =
    locale && isValidLocale(locale)
      ? (`global-${type}-${locale}` as RevalidateGlobalTagName<typeof locale>)
      : (`global-${type}` as RevalidateGlobalTagName<undefined>);

  try {
    revalidateTag(tag);

    return new Response(JSON.stringify({ revalidated: true, tag }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error revalidating" }), { status: 500 });
  }
}
