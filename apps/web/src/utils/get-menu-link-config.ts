// import type { Industry, Page, Product } from "@synoem/payload/payload-types";
// import { getLocalizedPathname } from "~/i18n/utils";
// import { defaultLocale, type Locale } from "@synoem/config";
// import { getProductUrl } from "./get-product-url";

// interface LinkConfig {
//   type?: ("internal" | "external" | "relative") | null;
//   internal?:
//     | ({
//         relationTo: "pages";
//         value: number | Page;
//       } | null)
//     | ({
//         relationTo: "products";
//         value: number | Product;
//       } | null)
//     | ({
//         relationTo: "industries";
//         value: number | Industry;
//       } | null);
//   relative?: string | null;
//   external?: string | null;
//   appearance?: ("default" | "outline") | null;
// }

// export const getMenuLinkConfig = (
//   link?: LinkConfig | null,
//   locale?: Locale,
// ): {
//   href: string;
//   openInNewTab: boolean;
//   appearance?: "default" | "outline";
// } | null => {
//   if (!link) return null;

//   if (link.type === "external" && link.external) {
//     return {
//       href: link.external,
//       openInNewTab: true,
//       appearance: link.appearance ?? "default",
//     };
//   }

//   if (link.type === "relative" && link.relative) {
//     return {
//       href: getLocalizedPathname(link.relative, locale ?? defaultLocale),
//       openInNewTab: false,
//       appearance: link.appearance ?? "default",
//     };
//   }

//   if (link.type === "internal" && link.internal) {
//     if (typeof link.internal.value === "number") {
//       console.error("Internal link is not populated");
//       return null;
//     }

//     let href: string;

//     switch (link.internal.relationTo) {
//       case "pages":
//         href = getLocalizedPathname(link.internal.value.slug, locale ?? defaultLocale);
//         break;
//       case "products":
//         href = getLocalizedPathname(getProductUrl(link.internal.value), locale ?? defaultLocale);
//         break;
//       case "industries":
//         href = getLocalizedPathname(link.internal.value.slug, locale ?? defaultLocale);
//     }

//     return {
//       href,
//       openInNewTab: false,
//       appearance: link.appearance ?? "default",
//     };
//   }

//   return null;
// };
