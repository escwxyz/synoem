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

const emailSchema = zod
  .string()
  .email({ message: "Please enter a valid email address" });

type EmailFieldProps<T extends z.ZodSchema> = {
  form: UseFormReturn<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
};

export const EmailField = <T extends z.ZodSchema>({
  form,
  name,
  label,
  className,
  required = true,
  placeholder = "Enter your email address",
  ...props
}: EmailFieldProps<T>) => {
  return (
    <FormField
      {...props}
      control={form.control}
      name={name}
      rules={{
        required: required ? "Email is required" : false,
        validate: (value) => {
          if (!value && !required) return true;
          const result = emailSchema.safeParse(value);
          return result.success || "Please enter a valid email address";
        },
      }}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder={placeholder}
              autoComplete="email"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
