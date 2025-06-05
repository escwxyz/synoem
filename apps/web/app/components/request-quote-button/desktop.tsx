"use client";

import type { RequestQuoteDesktopProps } from "./types";
import { useRequestQuoteForm } from "~/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { scrollLockAtom } from "@/app/atoms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@synoem/ui/components/dialog";
import { Button } from "@synoem/ui/components/button";
import { FormStepIndicator } from "../form-step-indicator.client";
import { Form } from "@synoem/ui/components/form";
import { SubmissionConfirmation } from "../submission-confirmation.client";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { TermsField } from "../inquiry-form";
import { ArrowLeft } from "lucide-react";

const Turnstile = dynamic(
  () => import("~/components/cloudflare-turnstile.client").then((mod) => mod.CloudflareTurnstile),
  {
    ssr: false,
  },
);

export const RequestQuoteDesktop = ({
  product,
  productTypeId,
  steps,
  buttonText,
  ...props
}: RequestQuoteDesktopProps) => {
  const formState = useRequestQuoteForm({
    product,
    productTypeId,
    steps,
  });

  if (!formState) {
    console.log("form is not ready");
    return null;
  }

  const {
    form,
    isSubmitting,
    isSuccess,
    handlePrevStep,
    step,
    handleNextStep,
    error,
    handleReset,
  } = formState;

  if (!form) {
    console.log("form is not ready");
    return null;
  }

  const [open, setOpen] = useState(false);

  const t = useTranslations("RequestQuoteButton");

  const setScrollLock = useSetAtom(scrollLockAtom);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    setScrollLock(open);
    if (!open) {
      handleReset();
    }
  };

  const text = buttonText ?? t("requestQuote");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" {...props}>
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden">
        <DialogHeader className="hidden">
          <DialogTitle className="text-2xl">{t("requestQuote")}</DialogTitle>
          <DialogDescription className="text-base">{t("description")}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 h-[700px]">
          <div className="bg-card p-8 flex flex-col h-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">{t("requestQuote")}</h2>
              <p className="text-muted-foreground mt-2">{t("description")}</p>
            </div>
            <FormStepIndicator
              style="default"
              orientation="vertical"
              steps={steps.map((step) => ({ id: step.id, title: step.title ?? "" }))}
              currentStep={step}
            />
            <div className="mt-auto">
              <div className="rounded-lg bg-secondary/50 p-4">
                <h4 className="text-sm font-medium leading-none mb-2">{t("support.title")}</h4>
                <p className="text-sm text-muted-foreground">{t("support.description")}</p>
                <Button variant="link" className="p-0 h-auto text-sm mt-2">
                  {t("support.button")}
                </Button>
              </div>
            </div>
          </div>
          <Form {...form}>
            {isSuccess ? (
              <SubmissionConfirmation
                title={t("confirmation.title")}
                message={t("confirmation.message")}
                onDismiss={handleReset}
              />
            ) : (
              <form
                onSubmit={form.handleSubmit(handleNextStep, (errors) => {
                  console.log("errors", errors);
                  // TODO: Send to sentry
                })}
                className="flex flex-col h-full overflow-y-auto"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    className="p-8 flex-1 min-h-0 overflow-y-auto"
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {steps[step]?.component}
                  </motion.div>
                </AnimatePresence>
                {error && (
                  <div className="mb-4 rounded bg-destructive/10 p-2 text-destructive">{error}</div>
                )}
                <div className="flex flex-col gap-4 p-4 pt-2 backdrop-blur-xl bg-background/50">
                  <input type="hidden" {...form.register("token")} />
                  <Turnstile />
                  <TermsField name="terms" />
                  <div className="flex justify-between border-t pt-4">
                    <Button
                      type="button" // IMPORTANT: explicitly set type to button to prevent step reset
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={isSubmitting}
                    >
                      {step === 0 ? (
                        <>
                          <X className="mr-2 h-4 w-4" /> {t("buttons.clearAll")}
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="mr-2 h-4 w-4" /> {t("buttons.back")}
                        </>
                      )}
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {step < steps.length - 1 ? (
                        <>
                          {t("buttons.next")} <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            t("buttons.submit")
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
