"use client";

import {
  mobileNavigationOpenAtom,
  requestQuoteMobileDrawerOpenAtom,
  scrollLockAtom,
} from "@/app/atoms";
import type { RequestQuoteMobileProps } from "./types";
import { useAtom, useSetAtom } from "jotai";
import { useRequestQuoteForm } from "@/app/hooks";
import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@synoem/ui/components/drawer";
import { Button } from "@synoem/ui/components/button";
import { FormStepIndicator } from "~/components/form-step-indicator.client";
import { Form } from "@synoem/ui/components/form";
import dynamic from "next/dynamic";
import { TermsField } from "~/components/inquiry-form";
import { Loader2 } from "lucide-react";
import { SubmissionConfirmation } from "~/components/submission-confirmation.client";

const Turnstile = dynamic(
  () => import("~/components/cloudflare-turnstile.client").then((mod) => mod.CloudflareTurnstile),
  {
    ssr: false,
  },
);

export const RequestQuoteMobile = ({
  product,
  productTypeId,
  locale,
  steps,
  buttonText,
  ...props
}: RequestQuoteMobileProps) => {
  const [open, setOpen] = useAtom(requestQuoteMobileDrawerOpenAtom);

  const formState = useRequestQuoteForm({
    product,
    productTypeId,
    steps,
  });

  if (!formState) {
    console.log("form is not ready");
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
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

  const t = useTranslations("RequestQuoteButton");

  const setScrollLock = useSetAtom(scrollLockAtom);
  const setMobileNavigationOpen = useSetAtom(mobileNavigationOpenAtom);

  const handleOpenChange = (open: boolean) => {
    setMobileNavigationOpen(false);
    setOpen(open);
    setScrollLock(false);
    if (!open) {
      handleReset();
    }
  };

  const text = buttonText ?? t("requestQuote");

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={handleOpenChange}
        disablePreventScroll
        preventScrollRestoration
      >
        <DrawerTrigger asChild>
          {/** TODO: polish the button */}
          <Button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
            }}
            {...props}
          >
            {text}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col h-full max-h-[90vh] pb-0">
          <DrawerHeader className="text-left shrink-0 border-b">
            <DrawerTitle className="text-center">{t("requestQuote")}</DrawerTitle>
            <DrawerDescription>{t("description")}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <FormStepIndicator
              style="progress"
              steps={steps.map((step) => ({ id: step.id, title: step.title ?? "" }))}
              currentStep={step}
            />
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
                  console.log("Form validation errors:", errors);
                })}
                className="flex flex-col flex-1 min-h-0 overflow-y-auto"
              >
                <div className="p-4 flex-1 min-h-0 overflow-y-auto">{steps[step]?.component}</div>

                <DrawerFooter className="pt-2 sticky border-t bottom-0 w-full backdrop-blur-md shrink-0 bg-background/80 safe-area-bottom">
                  {error && (
                    <div className="mb-4 rounded bg-destructive/10 p-2 text-destructive">
                      {error}
                    </div>
                  )}
                  {process.env.NODE_ENV === "production" && (
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
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button" // IMPORTANT: explicitly set type to button to prevent step reset
                      variant="outline"
                      className="w-full"
                      onClick={handlePrevStep}
                      disabled={step === 0 || isSubmitting}
                    >
                      {t("buttons.back")}
                    </Button>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {step < steps.length - 1 ? (
                        <>{t("buttons.next")}</>
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
                </DrawerFooter>
              </form>
            )}
          </Form>
        </DrawerContent>
      </Drawer>
    </>
  );
};
