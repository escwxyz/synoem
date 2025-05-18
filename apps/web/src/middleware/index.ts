import { defineMiddleware } from "astro:middleware";
import { defaultLocale } from "@synoem/config";
import { isValidLocale } from "~/i18n/utils";

export const onRequest = defineMiddleware(({ request, redirect, params }, next) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/_actions/") || url.pathname.startsWith("/api/")) {
    return next();
  }

  const pathSegments = url.pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments?.[0];

  const cookieLocale = request.headers.get("cookie")?.match(/locale=([a-zA-Z-]+)/)?.[1];

  const acceptLang = request.headers.get("accept-language");
  const browserLocale = acceptLang?.split(",")[0]?.split("-")[0];

  let selectedLocale = cookieLocale || browserLocale || defaultLocale;

  if (!isValidLocale(selectedLocale)) selectedLocale = defaultLocale;

  if (url.pathname === "/" || url.pathname === "") {
    return redirect(`/${selectedLocale}/`);
  }

  if (firstSegment && isValidLocale(firstSegment)) {
    return next();
  }
  if (pathSegments.length === 1) {
    return redirect(`/${defaultLocale}/`);
  }
  return redirect(`/${defaultLocale}${url.pathname}`);
});
