"use client";

import { newsletterFormSchema } from "@synoem/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@synoem/ui/components/form";
import { Button } from "@synoem/ui/components/button";
import confetti from "canvas-confetti";
import { AlertCircle, CheckIcon, Mail, SendHorizonal, Loader2 } from "lucide-react";

import { Input } from "@synoem/ui/components/input";
import { actions } from "astro:actions";
import { useHookFormAstroAction } from "~/hooks/use-form-with-astro-action";
import type { Locale } from "@synoem/config";
import { useTranslations } from "~/i18n/utils";

interface NewsletterInputProps {
  locale: Locale;
}

export const NewsletterInput = ({ locale }: NewsletterInputProps) => {
  const { t } = useTranslations(locale);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { form, onSubmit, reset } = useHookFormAstroAction({
    zodResolver: zodResolver(newsletterFormSchema),
    action: actions.newsletter.subscribeNewsletterAction,
    options: {
      actionProps: {
        onExecute: () => {
          setStatus("submitting");
          setErrorMessage(null);
        },

        onSubmitError: (_error) => {
          setStatus("error");
          setErrorMessage(t("Newsletter.newsletter.action.error"));
        },

        onSubmitSuccess: () => {
          setStatus("success");
          const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
          const end = Date.now() + 2000;

          const runConfetti = () => {
            if (Date.now() > end) return;

            for (const config of [
              { angle: 60, origin: { x: 0, y: 0.5 } },
              { angle: 120, origin: { x: 1, y: 0.5 } },
            ]) {
              confetti({
                particleCount: 2,
                spread: 55,
                startVelocity: 60,
                colors,
                ...config,
              });
            }

            requestAnimationFrame(runConfetti);
          };

          runConfetti();

          setTimeout(() => {
            reset();
            setStatus("idle");
          }, 3000);
        },
      },
      formProps: {
        defaultValues: {
          email: "",
        },
      },
    },
  });

  const isButtonDisabled =
    status === "submitting" || status === "success" || !form.formState.isValid;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-muted-foreground">{t("Newsletter.title")}</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 max-w-sm my-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="bg-input has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-xl border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                <Mail className="text-caption pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      aria-label={t("Newsletter.emailPlaceholder")}
                      className="h-14 w-full bg-transparent pl-12 focus:outline-none border-none shadow-none focus:border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 text-foreground dark:text-foreground/60 placeholder:text-foreground/60 dark:placeholder:text-foreground/60 [&:-webkit-autofill]:[-webkit-text-fill-color:inherit]"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (status === "error") {
                          setStatus("idle");
                          setErrorMessage(null);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
                <div className="md:pr-1.5 lg:pr-0">
                  <Button
                    type="submit"
                    aria-label="Submit"
                    disabled={isButtonDisabled}
                    onClick={
                      status === "error"
                        ? () => {
                            setStatus("idle");
                            setErrorMessage(null);
                          }
                        : undefined
                    }
                    className={`text-foreground relative rounded-xl ${status === "submitting" ? "pl-8" : ""}`}
                    variant={
                      status === "success"
                        ? "secondary"
                        : status === "error"
                          ? "destructive"
                          : "default"
                    }
                  >
                    <span className="hidden md:block">
                      {status === "submitting"
                        ? t("Newsletter.subscribing")
                        : status === "success"
                          ? t("Newsletter.subscribed")
                          : status === "error"
                            ? t("Newsletter.failed")
                            : t("Newsletter.subscribe")}
                    </span>
                    <span className="block md:hidden">
                      {status === "submitting" ? (
                        <div className="animate-spin absolute inset-0 flex items-center justify-center">
                          <Loader2 className="h-4 w-4" />
                        </div>
                      ) : status === "success" ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : status === "error" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <SendHorizonal className="h-4 w-4" />
                      )}
                    </span>
                  </Button>
                </div>
              </div>
            )}
          />

          {status === "error" && errorMessage && (
            <div className="flex items-center gap-2 text-destructive text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
