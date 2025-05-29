import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import type {
  RevalidateCollectionBody,
  RevalidateCollectionListTagName,
  RevalidateCollectionTagName,
} from "@synoem/payload/types";
import { isValidLocale } from "@synoem/config";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: "Invalid secret" }), { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON" }), { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("locale" in body) ||
    !("type" in body) ||
    !("slug" in body)
  ) {
    return new Response(JSON.stringify({ message: "Invalid body" }), { status: 400 });
  }

  const { locale, type, slug } = body as unknown as RevalidateCollectionBody;

  const collectionTag: RevalidateCollectionTagName<string, typeof locale> =
    locale && isValidLocale(locale)
      ? (`collection-${type}-${locale}-${slug}` as RevalidateCollectionTagName<
          string,
          typeof locale
        >)
      : (`collection-${type}-${slug}` as RevalidateCollectionTagName<string, undefined>);

  const collectionsListTag: RevalidateCollectionListTagName<typeof locale> =
    locale && isValidLocale(locale)
      ? (`collections-${type}-${locale}` as RevalidateCollectionListTagName<typeof locale>)
      : (`collections-${type}` as RevalidateCollectionListTagName<undefined>);

  try {
    await Promise.all([revalidateTag(collectionTag), revalidateTag(collectionsListTag)]);

    return new Response(
      JSON.stringify({ revalidated: true, tags: [collectionTag, collectionsListTag] }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error revalidating" }), { status: 500 });
  }
}
