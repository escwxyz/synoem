"use client";

import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import { useTranslations } from "next-intl";
import {
  BasicInquiryForm,
  CompanyInquiryForm,
  ProductInquiryForm,
  type FormStep,
} from "../inquiry-form";
import { basicInquirySchema, productInquirySchema } from "@synoem/schema";

import { RequestQuoteMobile } from "./mobile";
import { RequestQuoteDesktop } from "./desktop";
import type { RequestQuoteButtonProps } from "./types";
import { useMemo } from "react";

export const RequestQuoteButton = ({
  product,
  productTypeId,
  locale,
  ...props
}: RequestQuoteButtonProps) => {
  const isMobile = useIsMobile();

  const t = useTranslations("RequestQuoteButton");

  const steps: FormStep[] = useMemo(
    () => [
      {
        id: "basic",
        title: t("basicInformation.title"),
        schema: basicInquirySchema,
        component: <BasicInquiryForm />,
      },
      {
        id: "product",
        title: t("productInformation.title"),
        schema: productInquirySchema,
        component: <ProductInquiryForm />,
      },
      {
        id: "contact",
        title: t("companyInformation.title"),
        schema: basicInquirySchema,
        component: <CompanyInquiryForm />,
      },
    ],
    [t],
  );

  if (isMobile) {
    return (
      <RequestQuoteMobile
        product={product}
        productTypeId={productTypeId}
        locale={locale}
        steps={steps}
        // step={step}
        {...props}
      />
    );
  }

  return (
    <RequestQuoteDesktop
      product={product}
      productTypeId={productTypeId}
      locale={locale}
      steps={steps}
      //   step={step}
      {...props}
    />
  );
};
