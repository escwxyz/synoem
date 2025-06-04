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

interface PhoneFieldProps<T extends z.ZodSchema> {
  name: FieldPath<z.infer<T>>;
  className?: string;
  placeholder?: string;
  label?: string;
}

export const PhoneField = <T extends z.ZodSchema>({
  name,
  label = "Phone Number",
  className,
  placeholder,
}: PhoneFieldProps<T>) => {
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
              type="tel"
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              required
            />
          </FormControl>
          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
