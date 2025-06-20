import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import type { RevalidateGlobalBody, RevalidateGlobalTagName } from "@synoem/payload/types";
import { isValidLocale } from "@synoem/config";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || !("type" in body) || !("locale" in body)) {
    return Response.json({ message: "Invalid body" }, { status: 400 });
  }

  const { locale, type } = body as unknown as RevalidateGlobalBody;

  const tag: RevalidateGlobalTagName<typeof locale> =
    locale && isValidLocale(locale)
      ? (`global-${type}-${locale}` as RevalidateGlobalTagName<typeof locale>)
      : (`global-${type}` as RevalidateGlobalTagName<undefined>);

  try {
    revalidateTag(tag);

    return Response.json({ revalidated: true, tag }, { status: 200 });
  } catch {
    return Response.json({ message: "Error revalidating" }, { status: 500 });
  }
}
