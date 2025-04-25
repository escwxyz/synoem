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
import {
  AlertCircle,
  CheckIcon,
  Mail,
  SendHorizonal,
  Loader2,
} from "lucide-react";
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
          className="flex flex-col gap-2 max-w-sm my-2"
        >
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
              <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-xl border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                <Mail className="text-caption pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      aria-label={t("Component.Newsletter.emailPlaceholder")}
                      className="h-14 w-full bg-transparent pl-12 focus:outline-none border-none shadow-none focus:border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0"
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
                    className={`relative rounded-xl ${status === "submitting" ? "pl-8" : ""}`}
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
                        ? t("Component.Newsletter.subscribing")
                        : status === "success"
                          ? t("Component.Newsletter.subscribed")
                          : status === "error"
                            ? t("Component.Newsletter.failed")
                            : t("Component.Newsletter.subscribe")}
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
