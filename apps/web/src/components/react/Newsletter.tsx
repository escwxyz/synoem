"use client";

import { useHookFormAstroAction } from "~/hooks/use-form-with-astro-action";
import { newsletterSchema } from "~/schemas/newsletter";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { useState } from "react";
import { Form } from "@synoem/ui/components/form";
import { EmailField } from "./form-fields/EmailField";
import { SubmissionConfirmation } from "./SubmissionConfirmation";

export const Newsletter = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const { form, onSubmit } = useHookFormAstroAction({
    action: actions.newsletter.subscribeNewsletterAction,
    zodResolver: zodResolver(newsletterSchema),
    options: {
      formProps: {
        defaultValues: {
          email: "",
          name: "",
          terms: false,
        },
      },
      actionProps: {
        onSubmitSuccess: () => {
          setIsSuccess(true);
          setIsSubmitting(false);
        },
        onSubmitError: (error) => {
          setError(error.message);
        },
      },
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {isSuccess ? (
            <SubmissionConfirmation />
          ) : (
            <EmailField form={form} name="email" label="Email" required />
          )}
        </form>
      </Form>
    </>
  );
};
