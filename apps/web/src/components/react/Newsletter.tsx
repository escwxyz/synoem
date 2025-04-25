"use client";

import {
  newsletterSchema,
  type NewsletterFormValues,
} from "~/schemas/newsletter";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@synoem/ui/components/form";
import { Button } from "@synoem/ui/components/button";
import confetti from "canvas-confetti";
import { AlertCircle, CheckIcon } from "lucide-react";
import type { Locale } from "@synoem/config";
import { useTranslations } from "~/i18n/utils";
import { z } from "zod";
import { Input } from "@synoem/ui/components/input";

import { useForm } from "react-hook-form";

const emailSchema = z.string().email();

export const Newsletter = ({ locale }: { locale: Locale }) => {
  const { t } = useTranslations(locale);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("email", data.email);

      const result =
        await actions.newsletter.subscribeNewsletterAction(formData);

      if (result.error) {
        setStatus("error");
        setErrorMessage(t(`Component.Newsletter.${result.error.message}`));
        return;
      }

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
        form.reset();
        setStatus("idle");
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(t("Component.Newsletter.newsletter.action.error"));
    }
  };

  const isButtonDisabled =
    status === "submitting" || status === "success" || !form.formState.isValid;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-muted-foreground">
        {t("Component.Newsletter.title")}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="email"
              rules={{
                validate: (value) => {
                  const result = emailSchema.safeParse(value);
                  return (
                    result.success || t("Component.Newsletter.email.invalid")
                  );
                },
              }}
              render={({ field }) => (
                <FormItem className="flex-1 max-w-[240px]">
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="example@email.com"
                      aria-label={t("Component.Newsletter.emailPlaceholder")}
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
              )}
            />

            <Button
              type="submit"
              disabled={isButtonDisabled}
              className={`relative ${status === "submitting" ? "pl-8" : ""}`}
              variant={
                status === "success"
                  ? "secondary"
                  : status === "error"
                    ? "destructive"
                    : "default"
              }
            >
              {status === "submitting" && (
                <div className="absolute left-2 flex items-center justify-center">
                  <svg
                    className="animate-spin h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <title>Loading...</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              )}

              {status === "submitting"
                ? t("Component.Newsletter.subscribing")
                : status === "success"
                  ? t("Component.Newsletter.subscribed")
                  : status === "error"
                    ? t("Component.Newsletter.failed")
                    : t("Component.Newsletter.subscribe")}

              {status === "success" && <CheckIcon className="ml-2 w-4 h-4" />}
            </Button>
          </div>

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
