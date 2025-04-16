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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@synoem/ui/components/select";

export const SelectField = <T extends z.ZodSchema>({
  form,
  name,
  options,
  label,
  className,
  required = false,
}: {
  form: UseFormReturn<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label?: string;
  options: { value: string; label: string }[];
  className?: string;
  required?: boolean;
  placeholder?: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={{
        required: required ? `${name} is required` : false,
      }}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>
            <span>{label || "\u00A0"}</span>
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ value, label }) => {
                return (
                  <SelectItem value={value} key={value}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
