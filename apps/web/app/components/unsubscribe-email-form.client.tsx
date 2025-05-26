"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { unsubscribeNewsletter } from "~/actions";
import { unsubscribeNewsletterFormSchema } from "@synoem/schema";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@synoem/ui/components/form";
import { Input } from "@synoem/ui/components/input";
import { Button } from "@synoem/ui/components/button";
import { useTranslations } from "next-intl";
import { AlertCircle, CheckIcon, Loader2, Mail, UserMinus2 } from "lucide-react";

export const UnsubscribeEmailForm = () => {
  const t = useTranslations("UnsubscribePage");
  const params = useSearchParams();

  const email = params.get("email") || "";
  const token = params.get("token") || "";

  const [status, setStatus] = useState<"idle" | "success" | "error" | "pending">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { form, handleSubmitWithAction, resetFormAndAction } = useHookFormAction(
    unsubscribeNewsletter,
    zodResolver(unsubscribeNewsletterFormSchema),
    {
      formProps: {
        defaultValues: {
          email,
          token,
        },
      },
      actionProps: {
        onSuccess: ({ data }) => {
          if (data?.status === "error") {
            setStatus("error");
            setErrorMessage(t(`${data.messageKey}`));
            return;
          }
          setStatus("success");
          resetFormAndAction();
        },
        onError: (_error) => {
          setStatus("error");
          setErrorMessage(t("api.unsubscribeNewsletter.error"));
        },
        onExecute: () => {
          setStatus("pending");
        },
      },
    },
  );

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction}>
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
                      className="h-14 w-full bg-transparent pl-12 focus:outline-none border-none shadow-none focus:border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 text-foreground dark:text-foreground/60 placeholder:text-foreground/60 dark:placeholder:text-foreground/60 [&:-webkit-autofill]:[-webkit-text-fill-color:inherit]"
                      {...field}
                      readOnly
                    />
                  </FormControl>
                </FormItem>
                <div className="md:pr-1.5 lg:pr-0">
                  <Button
                    type="submit"
                    aria-label="Submit"
                    disabled={status === "pending" || status === "success"}
                    onClick={
                      status === "error"
                        ? () => {
                            setStatus("idle");
                            setErrorMessage(null);
                          }
                        : undefined
                    }
                    className={`relative rounded-xl ${status === "pending" ? "pl-8" : ""}`}
                    variant={
                      status === "success"
                        ? "secondary"
                        : status === "error"
                          ? "ghost"
                          : "destructive"
                    }
                  >
                    <span className="hidden md:block">
                      {status === "pending"
                        ? t("unsubscribing")
                        : status === "success"
                          ? t("unsubscribed")
                          : status === "error"
                            ? t("failed")
                            : t("unsubscribe")}
                    </span>
                    <span className="block md:hidden">
                      {status === "pending" ? (
                        <div className="animate-spin absolute inset-0 flex items-center justify-center">
                          <Loader2 className="h-4 w-4" />
                        </div>
                      ) : status === "success" ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : status === "error" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <UserMinus2 className="h-4 w-4" />
                      )}
                    </span>
                  </Button>
                </div>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="password" {...field} readOnly />
                </FormControl>
              </FormItem>
            )}
          />
          {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
        </form>
      </Form>
    </div>
  );
};
