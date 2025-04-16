"use client";

import { Checkbox } from "@synoem/ui/components/checkbox";
import {
  FormControl,
  FormMessage,
  FormLabel,
  FormItem,
  FormDescription,
  FormField,
} from "@synoem/ui/components/form";
import type { FieldPath, UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { cn } from "@synoem/ui/lib/utils";

export const TermsField = <T extends z.ZodSchema>({
  form,
  name,
  className,
  required = true,
}: {
  form: UseFormReturn<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  className?: string;
  required?: boolean;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
            className,
          )}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>I have read and agree to the following:</FormLabel>
            <FormDescription className="text-xs">
              <a target="__blank" href="/privacy-policy">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a target="__blank" href="/terms">
                Terms
              </a>
            </FormDescription>
          </div>
          {required && <span className="text-red-500">*</span>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
