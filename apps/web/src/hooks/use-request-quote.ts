"use client";
import { isSolarPanel } from "~/utils/check-product-type";
import { PRODUCT_CATEGORIES } from "@synoem/config";
import type { SolarPanel } from "@synoem/payload/payload-types";
import type { PumpController } from "@synoem/payload/payload-types";
import { useState } from "react";
import { actions } from "astro:actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormValues } from "~/schemas/inquiry";
import { useHookFormAstroAction } from "./use-form-with-astro-action";

export const useRequestQuote = ({
  product,
}: {
  product: SolarPanel | PumpController;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productCategory = isSolarPanel(product)
    ? PRODUCT_CATEGORIES.solarPanel.slug
    : PRODUCT_CATEGORIES.pumpController.slug;

  const productName = product.modelName;

  const relatedProductId = product.id;
  const relatedProductType = isSolarPanel(product) ? "solar-panels" : "pump-controllers";

  const { form } = useHookFormAstroAction({
    action: actions.inquiry.createProductInquiryAction,
    zodResolver: zodResolver(productFormSchema),
    options: {
      formProps: {
        defaultValues: {
          name: "",
          email: "",
          phone: "",
          requirements: "",
          terms: false,
          productCategory,
          productName,
          quantity: 1,
          quantityUnit: "pcs",
          attachments: [],
          relatedProductId,
          relatedProductType,
        },
      },
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("requirements", data.requirements);
    formData.append("productCategory", data.productCategory);
    formData.append("productName", data.productName);
    formData.append("quantity", String(data.quantity));
    formData.append("quantityUnit", data.quantityUnit);

    formData.append("relatedProductId", String(data.relatedProductId || relatedProductId));
    formData.append("relatedProductType", data.relatedProductType || relatedProductType);

    if (data.frequency) formData.append("frequency", data.frequency);
    if (data.destination) formData.append("destination", data.destination);
    if (data.timeline) formData.append("timeline", data.timeline);

    const attachmentFiles = data.attachments;
    if (Array.isArray(attachmentFiles) && attachmentFiles.length > 0) {
      for (const file of attachmentFiles) {
        formData.append("attachments", file);
      }
    }
    if (data.terms === true) {
      formData.append("terms", "on");
    }

    try {
      const result = await actions.inquiry.createProductInquiryAction(formData);

      if (result.error) {
        setError(result.error.message);
        return;
      }

      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return {
    isSubmitting,
    isSuccess,
    error,
    form,
    onSubmit,
  };
};
