"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@synoem/ui/components/form";
import { Checkbox } from "@synoem/ui/components/checkbox";
import { cn } from "@synoem/ui/lib/utils";
import { type FieldPath, useFormContext } from "react-hook-form";
import type { z } from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface TermsFieldProps<T extends z.ZodSchema> {
  name: FieldPath<z.infer<T>>;
  className?: string;
  required?: boolean;
}

export const TermsField = <T extends z.ZodSchema>({
  name,
  className,
  required = true,
}: TermsFieldProps<T>) => {
  const t = useTranslations("InquiryFormFields");
  const {
    control,
    formState: { errors },
  } = useFormContext<z.infer<T>>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4",
            className,
          )}
        >
          <FormControl>
            <Checkbox
              {...field}
              checked={!!field.value}
              onCheckedChange={field.onChange}
              required={required}
              className="h-6 w-6"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              {t("terms.label", {
                terms: t("terms.terms"),
                privacyPolicy: t("terms.privacyPolicy"),
              })}
              {required && <span className="text-destructive">*</span>}
            </FormLabel>
            <FormDescription className="text-xs flex flex-col gap-1">
              <Link target="__blank" href="/privacy-policy">
                - {t("terms.privacyPolicy")}
              </Link>
              <Link target="__blank" href="/terms">
                - {t("terms.terms")}
              </Link>
            </FormDescription>
          </div>

          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
