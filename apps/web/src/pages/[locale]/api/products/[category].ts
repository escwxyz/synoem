import { defaultLocale } from "@synoem/config";
import { getPayloadClient } from "@synoem/payload/client";
import type { APIRoute } from "astro";
import type { CollectionSlug, Locale } from "payload";
import { isValidLocale } from "~/i18n/utils";
import { PRODUCTS_CACHE_DURATION } from "@synoem/config";

export const GET: APIRoute = async ({ params, request, locals }) => {
  const { category } = params;
  const url = new URL(request.url);
  const limit = Number.parseInt(url.searchParams.get("limit") || "500");
  const sort = url.searchParams.get("sort") || "featured";

  const pathSegments = url.pathname.split("/").filter(Boolean);
  let localeFromPath: string | null = null;

  if (pathSegments.length > 2 && isValidLocale(pathSegments[0])) {
    localeFromPath = pathSegments[0];
  }

  const localeParam = url.searchParams.get("locale");

  const effectiveLocale =
    // @ts-ignore
    (locals.locale as string) ||
    (localeFromPath && isValidLocale(localeFromPath) ? localeFromPath : null) ||
    (localeParam && isValidLocale(localeParam) ? localeParam : null) ||
    defaultLocale;

  const payload = await getPayloadClient();

  try {
    const query = {
      collection: category as CollectionSlug,
      where: {
        _status: {
          equals: "published",
        },
      },
      limit,
      depth: 1,
      sort: sort === "newest" ? "-createdAt" : "order",
      locale: effectiveLocale as unknown as Locale,
    };

    // @ts-ignore
    const response = await payload.find(query);

    return new Response(
      JSON.stringify({
        products: response.docs,
        totalDocs: response.totalDocs,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `max-age=${PRODUCTS_CACHE_DURATION}`,
        },
      },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
