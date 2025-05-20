// TODO: change color to better match darkmode

import { defaultLocale, type Locale, type ProductTypeId, PRODUCT_TYPES } from "@synoem/config";
import type { SolarPanelCategory, PumpControllerCategory } from "@synoem/types";
import { getLocale, getTranslations } from "next-intl/server";
import { isValidLocale } from "~/utils/is-valid-locale";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@synoem/ui/components/breadcrumb";
import React from "react";

interface ProductBreadcrumbProps {
  productCategory?: Pick<SolarPanelCategory, "slug"> | Pick<PumpControllerCategory, "slug">;
  productTypeId: ProductTypeId;
}

export const ProductBreadcrumbs = async ({
  productCategory,
  productTypeId,
}: ProductBreadcrumbProps) => {
  const t = await getTranslations("ProductBreadcrumb");

  const locale = await getLocale();

  const effectiveLocale = isValidLocale(locale) ? (locale as Locale) : defaultLocale;

  const productTypeSlug = PRODUCT_TYPES[productTypeId].id;

  return (
    <Breadcrumb className="font-semibold">
      <BreadcrumbList className="text-white dark:text-muted-foreground">
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${effectiveLocale}`}>{t("home")}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${effectiveLocale}/products`}>{t("products")}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${effectiveLocale}/products/${productTypeSlug}`}>
            {t(`${productTypeSlug}`)}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {productCategory && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${effectiveLocale}/products/${productTypeSlug}/${productCategory.slug}`}
              >
                {productCategory.slug.toUpperCase()}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
