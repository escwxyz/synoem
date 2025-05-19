import { defineMiddleware } from "astro:middleware";
import { defaultLocale } from "@synoem/config";
import { isValidLocale } from "~/i18n/utils";

export const onRequest = defineMiddleware(({ request, redirect, params }, next) => {
  const url = new URL(request.url);

  if (
    url.pathname.startsWith("/_actions/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_image") ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico)$/)
  ) {
    return next();
  }

  const pathSegments = url.pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments?.[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return next();
  }

  // We only want to redirect if the path is the root or empty based on cookie or accept-language header
  if (url.pathname === "/" || url.pathname === "" || !firstSegment) {
    const cookieLocale = request.headers.get("cookie")?.match(/locale=([a-zA-Z-]+)/)?.[1];

    const acceptLanguage = request.headers.get("accept-language");

    const selectedLocale =
      cookieLocale || acceptLanguage?.split(",")[0]?.split("-")[0] || defaultLocale;

    const targetLocale = isValidLocale(selectedLocale) ? selectedLocale : defaultLocale;

    return redirect(`/${targetLocale}${url.pathname}`);
  }

  return redirect(`/${defaultLocale}${url.pathname}`);
});
