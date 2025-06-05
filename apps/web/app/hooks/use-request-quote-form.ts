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
  const [step, setStep] = useState<number>(0);

  const token = useAtomValue(cloudflareTurnstileTokenAtom);

  const currentSchema = steps[step]?.schema;

  if (!currentSchema) {
    console.error("No current schema");
    return {
      isSubmitting: false,
      isSuccess: false,
      error: "No current schema",
      form: undefined,
      handleNextStep: () => {},
      handlePrevStep: () => {},
      progress: 0,
      step: 0,
      formData: {},
      setFormData: () => {},
    };
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
    },
  });

  const handleNextStep = (data: Partial<FormData>) => {
    const allValues = form.getValues();
    const updatedData = { ...allValues, ...data };

    if (step < steps.length - 1) {
      setStep(step + 1);

      form.reset(updatedData as z.infer<typeof currentSchema>);
    } else {
      if (!token || !token.trim()) {
        setIsSuccess(false);
        setIsSubmitting(false);
        setError("Please complete the Turnstile challenge.");
        return;
      }
      setIsSubmitting(true);
      setTimeout(async () => {
        await action.executeAsync(updatedData as FormData);
        setIsSuccess(true);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handlePrevStep = () => {
    console.log("handlePrevStep", step);
    if (step === 0) {
      handleReset();
    }
    if (step > 0) {
      setStep(step - 1); // TODO: this is not working
    }
  };

  const handleReset = () => {
    form.reset();
    setIsSubmitting(false);
    setIsSuccess(false);
    setStep(0);
    setError(null);
  };

  useEffect(() => {
    if (token) {
      form.setValue("token", token);
    }
  }, [token, form]);

  return {
    isSubmitting,
    isSuccess,
    error,
    form,
    handleNextStep,
    handlePrevStep,
    handleReset,
    step,
  };
};
