// TODO: sitemap is only generated in the build time,
// TODO: so we need to run a payload job to periodically trigger rebuild?

import fs from "node:fs";
import path from "node:path";
import { locales, PRODUCT_TYPES } from "@synoem/config";

import type { MetadataRoute } from "next";
import { getPayloadClient } from "@synoem/payload/client";

const BASE_URL = DMNO_PUBLIC_CONFIG.WEB_SITE_URL;

interface PopulatedCategory {
  slug: string;
}
// TODO: improve this function to be more efficient and not to scan the whole app directory
async function getStaticPageRoutes(
  currentLocales: readonly string[],
): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const appDirPath = path.join(process.cwd(), "apps", "web", "app");

  async function scanDir(directory: string, currentRouteBase: string, currentLocale: string) {
    const items = await fs.promises.readdir(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = await fs.promises.stat(itemPath);

      if (
        // exclude all files and folders that are not pages
        (item.startsWith("[") && item.endsWith("]")) ||
        (item.startsWith("(") && item.endsWith(")")) ||
        [
          "api",
          "components",
          "layouts",
          "libs",
          "hooks",
          "data",
          "actions",
          "atoms",
          "types",
          "utils",
          "_lib",
          "sitemap.ts",
          "robots.ts",
          "manifest.ts",
          "favicon.ico",
          "opengraph-image.tsx",
          "apple-icon.tsx",
          "icon.tsx",
        ].includes(item) ||
        item.startsWith("_")
      ) {
        continue;
      }

      if (stat.isDirectory()) {
        await scanDir(itemPath, `${currentRouteBase}/${item}`, currentLocale);
      } else if (item.match(/^(page)\.(tsx|jsx|js|ts)$/)) {
        const routePath = currentRouteBase === "" ? "/" : currentRouteBase;

        const alternatesLanguages: Record<string, string> = {};
        for (const lang of currentLocales) {
          alternatesLanguages[lang] = `${BASE_URL}/${lang}${routePath === "/" ? "" : routePath}`;
        }

        entries.push({
          url: encodeURI(`${BASE_URL}/${currentLocale}${routePath === "/" ? "" : routePath}`),
          lastModified: new Date().toISOString(),
          changeFrequency: "monthly",
          priority: routePath === "/" ? 1.0 : 0.8,
          alternates: { languages: alternatesLanguages },
        });
      }
    }
  }

  // This part is not needed for now, but we keep it here for future reference
  for (const locale of currentLocales) {
    const localeAppPagesDir = path.join(appDirPath, locale);
    if (
      await fs.promises
        .access(localeAppPagesDir)
        .then(() => true)
        .catch(() => false)
    ) {
      if (
        (await fs.promises
          .access(path.join(localeAppPagesDir, "page.tsx"))
          .then(() => true)
          .catch(() => false)) ||
        (await fs.promises
          .access(path.join(localeAppPagesDir, "page.jsx"))
          .then(() => true)
          .catch(() => false))
      ) {
        const alternatesLanguages: Record<string, string> = {};
        for (const lang of currentLocales) {
          alternatesLanguages[lang] = `${BASE_URL}/${lang}`;
        }
        entries.push({
          url: encodeURI(`${BASE_URL}/${locale}`),
          lastModified: new Date().toISOString(),
          changeFrequency: "monthly",
          priority: 1.0,
          alternates: { languages: alternatesLanguages },
        });
      }

      await scanDir(localeAppPagesDir, "", locale);
    }
  }

  const uniqueEntries = Array.from(new Map(entries.map((e) => [e.url, e])).values());
  return uniqueEntries;
}

async function getDynamicProductRoutes(
  currentLocales: readonly string[],
): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const payload = await getPayloadClient();

  for (const productType of Object.values(PRODUCT_TYPES)) {
    try {
      const products = await payload.find({
        collection: productType.slug,
        where: { _status: { equals: "published" }, visible: { equals: true } },
        select: { slug: true, productCategory: true, updatedAt: true },
        depth: 1, // default populated fields on the product category
        pagination: false,
        limit: 0,
      });

      for (const product of products.docs) {
        if (!product.slug || !product.productCategory) continue;

        let categorySlug: string | undefined;
        if (
          typeof product.productCategory === "object" &&
          product.productCategory !== null &&
          "slug" in product.productCategory
        ) {
          categorySlug = (product.productCategory as PopulatedCategory).slug;
        } else {
          throw new Error(
            "Product category is not populated properly. Check the `defaultPopulate` field in Payload",
          );
        }

        if (!categorySlug) {
          console.warn(
            `Skipping product ${product.slug} (type: ${productType.id}) due to missing category slug.`,
          );
          continue;
        }

        const lastModified =
          product.updatedAt && typeof product.updatedAt === "string"
            ? new Date(product.updatedAt).toISOString()
            : new Date().toISOString();

        const mainUrl = `${BASE_URL}/products/${productType.id}/${categorySlug}/${product.slug}`;

        for (const locale of currentLocales) {
          const alternatesLanguages: Record<string, string> = {};

          alternatesLanguages[locale] =
            `${BASE_URL}/${locale}/products/${productType.id}/${categorySlug}/${product.slug}`;

          entries.push({
            url: encodeURI(mainUrl),
            lastModified: lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
            alternates: { languages: alternatesLanguages },
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching products for sitemap (type ${productType.id}):`, error);
    }
  }
  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let allEntries: MetadataRoute.Sitemap = [];

  const staticEntries = await getStaticPageRoutes(locales);
  allEntries = allEntries.concat(staticEntries);

  try {
    const productEntries = await getDynamicProductRoutes(locales);
    allEntries = allEntries.concat(productEntries);
  } catch (error) {
    console.error("Error generating dynamic product routes for sitemap:", error);
  }

  const uniqueEntries = Array.from(new Map(allEntries.map((e) => [e.url, e])).values());

  console.log("uniqueEntries", JSON.stringify(uniqueEntries, null, 2));

  return uniqueEntries;
}
