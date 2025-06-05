"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@synoem/ui/components/form";
import { Input } from "@synoem/ui/components/input";
import { cn } from "@synoem/ui/lib/utils";
import { type FieldPath, useFormContext } from "react-hook-form";
import type { z } from "zod";

interface EmailFieldProps<T extends z.ZodSchema> {
  name: FieldPath<z.infer<T>>;
  label?: string;
  className?: string;
  placeholder?: string;
  autoComplete?: boolean;
}

export const EmailField = <T extends z.ZodSchema>({
  name,
  label = "Email",
  className,
  placeholder,
  autoComplete = true,
}: EmailFieldProps<T>) => {
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
              type="email"
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              required
              autoComplete={autoComplete ? "email" : "off"}
            />
          </FormControl>
          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
