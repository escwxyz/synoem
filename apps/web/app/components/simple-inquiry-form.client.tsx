"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquiryFormSchema } from "@synoem/schema";
import { Form } from "@synoem/ui/components/form";
import { Button } from "@synoem/ui/components/button";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { sendInquiry } from "@/app/actions";
import { SubmissionConfirmation } from "~/components/submission-confirmation.client";
import { useAtomValue } from "jotai";
import { cloudflareTurnstileTokenAtom } from "~/atoms";
import { cn } from "@synoem/ui/lib/utils";
import {
  NameField,
  EmailField,
  PhoneField,
  TermsField,
  MessageField,
} from "~/components/inquiry-form";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

const Turnstile = dynamic(
  () => import("~/components/cloudflare-turnstile.client").then((mod) => mod.CloudflareTurnstile),
  {
    ssr: false,
  },
);

export const SimpleInquiryForm = ({
  className,
  buttonText,
}: { className?: string; buttonText?: string }) => {
  const t = useTranslations("InquiryFormFields");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const token = useAtomValue(cloudflareTurnstileTokenAtom);

  const { form, resetFormAndAction, handleSubmitWithAction } = useHookFormAction(
    sendInquiry,
    zodResolver(inquiryFormSchema),
    {
      actionProps: {
        onExecute: () => {
          setIsSubmitting(true);
          setErrorMessage(null);

          if (!token || !token.trim()) {
            setIsSuccess(false);
            setIsSubmitting(false);
            setErrorMessage("cloudflareTokenRequired.message");
            return;
          }
        },
        onSuccess: (data) => {
          setIsSubmitting(false);
          if (data.data?.status === "success") {
            setIsSuccess(true);
            setTimeout(() => {
              resetFormAndAction();
            }, 1000);
          } else {
            setErrorMessage(data.data?.messageKey ?? "An error occurred. Please try again."); // TODO: i18n
          }
        },
      },

      formProps: {
        defaultValues: {
          name: "",
          email: "",
          phone: "",
          message: "",
          token: token ?? "",
          terms: false,
        },
      },
    },
  );

  useEffect(() => {
    if (token) {
      form.setValue("token", token);
    }
  }, [token, form]);

  const text = buttonText ?? t("buttons.submit");

  if (isSuccess) {
    return (
      <SubmissionConfirmation
        title={t("confirmation.title")}
        message={t("confirmation.message")}
        onDismiss={() => {
          resetFormAndAction();
          setIsSuccess(false);
        }}
        buttonText={t("buttons.newInquiry")}
      />
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-md rounded-lg bg-card/40 p-6 shadow-lg", className)}>
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction} className="space-y-4" autoComplete="on">
          <NameField name="name" />
          <EmailField name="email" />
          <PhoneField name="phone" />
          <MessageField name="message" />
          {process.env.WEB_APP_ENV === "production" && (
            <>
              <input
                type="hidden"
                {...form.register("token", {
                  required: t("cloudflareTokenRequired.message"),
                })}
              />
              <Turnstile />
            </>
          )}
          <TermsField name="terms" />
          {errorMessage && (
            <div className="mb-4 rounded bg-destructive/10 p-2 text-destructive">
              {t(errorMessage)}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : text}
          </Button>
        </form>
      </Form>
    </div>
  );
};
