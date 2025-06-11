"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { inquiryFormSchema } from "@synoem/schema";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import type { SolarPanel, PumpController } from "@synoem/types";
import { sendInquiry } from "~/actions";

import type { z } from "zod";
import type { FormStep } from "../components/inquiry-form/types";
import type { ProductTypeId } from "@synoem/config";
import { useAtomValue } from "jotai";
import { cloudflareTurnstileTokenAtom } from "~/atoms";
import { useTranslations } from "next-intl";

type FormData = z.infer<typeof inquiryFormSchema>;

export const useRequestQuoteForm = ({
  productTypeId,
  product,
  steps,
}: {
  productTypeId?: ProductTypeId;
  steps: FormStep[];
  product?: Pick<SolarPanel | PumpController, "modelName" | "id">;
}) => {
  const tApiErrors = useTranslations("apiErrors");

  if (steps.length === 0) {
    throw new Error("Steps array cannot be empty");
  }

  const [step, setStep] = useState(0);

  const token = useAtomValue(cloudflareTurnstileTokenAtom);

  const currentSchema = steps[step]?.schema;

  if (!currentSchema) {
    return undefined;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productName = product?.modelName || "";

  const relatedProductId = product?.id;

  const { form, action } = useHookFormAction(sendInquiry, zodResolver(currentSchema), {
    formProps: {
      defaultValues: {
        productTypeId,
        relatedProductId,
        productName,
      },
      shouldUnregister: false,
    },
  });

  const handleNextStep = async (data: Partial<FormData>) => {
    const allValues = form.getValues();
    const updatedData = { ...allValues, ...data };

    const valid = await form.trigger();

    if (valid) {
      if (step < steps.length - 1) {
        setStep((prev) => prev + 1);

        form.reset(updatedData as z.infer<typeof currentSchema>);
      } else {
        setIsSubmitting(true);

        const response = await action.executeAsync(updatedData as FormData);

        if (response.data?.status === "success") {
          setIsSuccess(true);
          setIsSubmitting(false);
        } else {
          setError(
            response.data?.messageKey
              ? tApiErrors(response.data.messageKey)
              : tApiErrors("action.sendInquiry.error"),
          );
          setIsSubmitting(false);
          setIsSuccess(false);
          return;
        }
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    console.log("handleReset");
    form.clearErrors();
    form.reset({ productTypeId, relatedProductId, productName });
    setIsSubmitting(false);
    setIsSuccess(false);
    setStep(0);
    setError(null);
    console.log(form.getValues());
  };

  useEffect(() => {
    if (token) {
      form.setValue("token", token);
    }
  }, [token, form]);

  return {
    step,
    isSubmitting,
    isSuccess,
    error,
    form,
    handleNextStep,
    handlePrevStep,
    handleReset,
  };
};
