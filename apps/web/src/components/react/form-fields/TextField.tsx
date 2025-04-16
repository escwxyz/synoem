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
import type { FieldPath } from "react-hook-form";
import { cn } from "@synoem/ui/lib/utils";
import { Input } from "@synoem/ui/components/input";

export const TextField = <T extends z.ZodSchema>({
  form,
  name,
  label,
  className,
  required = true,
  disabled = false,
}: {
  form: UseFormReturn<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input {...field} disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
