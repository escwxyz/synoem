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

interface InputFieldProps<T extends z.ZodSchema> {
  name: FieldPath<z.infer<T>>;
  className?: string;
  label?: string;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
}

export const InputField = <T extends z.ZodSchema>({
  name,
  className,
  label,
  required,
  readonly,
  placeholder,
}: InputFieldProps<T>) => {
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
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              value={field.value ?? ""}
              readOnly={readonly}
              placeholder={placeholder}
              required={required}
            />
          </FormControl>
          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
