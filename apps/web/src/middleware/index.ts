import { defineMiddleware } from "astro:middleware";
import { defaultLocale } from "@synoem/config";
import { isValidLocale } from "~/i18n/utils";

export const onRequest = defineMiddleware(({ request, locals, redirect, params }, next) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/_actions/") || url.pathname.startsWith("/api/")) {
    // ignore actions
    return next();
  }

  const pathSegments = url.pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  if (url.pathname === "/" || url.pathname === "") {
    const selectedLocale = params.locale || defaultLocale;

    // @ts-ignore
    locals.locale = selectedLocale;

    return redirect(`/${selectedLocale}/`);
  }

  if (firstSegment && isValidLocale(firstSegment)) {
    // @ts-ignore
    locals.locale = firstSegment;
    return next();
  }
  if (pathSegments.length === 1) {
    return redirect(`/${defaultLocale}/`);
  }
  return redirect(`/${defaultLocale}${url.pathname}`);
});
