"use client";

import type { ActionError, SafeResult } from "astro:actions";
import {
  useForm,
  type UseFormProps,
  type FieldValues,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";

interface Options<TValues extends FieldValues> {
  formProps?: UseFormProps<TValues>;
  actionProps?: {
    onExecute?: () => void;
    onSubmitSuccess?: () => void;
    onSubmitError?: (error: ActionError<TValues>) => void;
  };
}

interface Props<TValues extends FieldValues> {
  action: (input: FormData) => Promise<SafeResult<TValues, unknown>>;
  zodResolver: Resolver<TValues>;
  options?: Options<TValues>;
}

export const useHookFormAstroAction = <TValues extends FieldValues>(
  props: Props<TValues>,
) => {
  const { action, zodResolver, options } = props;

  const form = useForm<TValues>({
    resolver: zodResolver,
    ...options?.formProps,
  });

  // default submit handler, only works with form data (i.e. accpet: "form")
  const onSubmit: SubmitHandler<TValues> = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value) && value[0] instanceof File) {
        for (const file of value) {
          formData.append(key, file);
        }
      } else if (typeof value === "boolean" && value === true) {
        formData.append(key, "on");
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    const result = await action(formData);

    if (result.error) {
      options?.actionProps?.onSubmitError?.(result.error);
      return;
    }

    options?.actionProps?.onSubmitSuccess?.();
  };

  const reset = () => {
    form.reset();
  };

  return {
    form,
    onSubmit,
    reset,
  };
};
