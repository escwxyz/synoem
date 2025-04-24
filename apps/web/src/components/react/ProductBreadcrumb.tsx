"use client";

import type { Locale } from "@synoem/config";
import type {
  Product,
  SolarPanelBlockType,
  PumpControllerBlockType,
} from "@synoem/payload/payload-types";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@synoem/ui/components/breadcrumb";
import { useTranslations } from "~/i18n/utils";
import { isPumpController, isSolarPanel } from "~/utils/check-product-type";

export const ProductBreadcrumb = ({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) => {
  const { category, solarPanel, pumpController } = product;

  const { t } = useTranslations(locale);

  if (
    (isSolarPanel(product) && isPumpController(product)) ||
    (!isSolarPanel(product) && !isPumpController(product))
  ) {
    throw new Error("Error in Product Hero");
  }

  let type: SolarPanelBlockType["type"] | PumpControllerBlockType["type"];

  if (isSolarPanel(product)) {
    type = solarPanel?.[0].type;
  } else if (isPumpController(product)) {
    type = pumpController?.[0].type;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            {t("Component.ProductBreadcrumb.home")}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/products">
            {t("Component.ProductBreadcrumb.products")}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href={`/products/${category}`}>
            {isSolarPanel(product)
              ? t("Component.ProductBreadcrumb.solarPanel")
              : t("Component.ProductBreadcrumb.pumpController")}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {type && (
          <BreadcrumbItem>
            <BreadcrumbLink href={`/products/${category}/${type}`}>
              {type.toUpperCase()}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
