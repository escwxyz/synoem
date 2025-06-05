"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@synoem/ui/components/form";
import { Input } from "@synoem/ui/components/input";
import { cn } from "@synoem/ui/lib/utils";
import { type FieldPath, useFormContext } from "react-hook-form";
import type { z } from "zod";

interface TermsFieldProps<T extends z.ZodSchema> {
  name: FieldPath<z.infer<T>>;
  className?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: boolean;
}

export const NameField = <T extends z.ZodSchema>({
  name,
  label = "Full Name",
  className,
  placeholder,
  autoComplete = true,
}: TermsFieldProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<z.infer<T>>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              {label} <span className="text-destructive">*</span>
            </FormLabel>
          )}

          <FormControl>
            <Input
              type="text"
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              required
              autoComplete={autoComplete ? "name" : "off"}
            />
          </FormControl>
          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
