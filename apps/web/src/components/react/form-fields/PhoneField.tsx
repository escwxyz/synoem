"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@synoem/ui/components/form";
import type { z } from "zod";
import { z as zod } from "zod";
import type { FieldPath } from "react-hook-form";
import { cn } from "@synoem/ui/lib/utils";
import { Input } from "@synoem/ui/components/input";

const phoneSchema = zod
  .string()
  .regex(/^\d{10}$/, "Please enter a valid phone number");

export const PhoneField = <T extends z.ZodSchema>({
  form,
  name,
  label,
  className,
  required = true,
  placeholder = "Enter your phone number",
}: {
  form: UseFormReturn<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={{
        required: required ? "Phone number is required" : false,
        validate: (value) => {
          if (!value && !required) return true;
          const result = phoneSchema.safeParse(value);
          return result.success || "Please enter a valid phone number";
        },
      }}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="tel"
              placeholder={placeholder}
              autoComplete="tel"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
