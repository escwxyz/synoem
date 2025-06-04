"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@synoem/ui/components/form";
import { Textarea } from "@synoem/ui/components/textarea";
import { cn } from "@synoem/ui/lib/utils";
import { type FieldPath, useFormContext } from "react-hook-form";
import type { z } from "zod";

interface MessageFieldProps<T extends z.ZodSchema> {
  name: FieldPath<z.infer<T>>;
  label?: string;
  className?: string;
  placeholder?: string;
}

export const MessageField = <T extends z.ZodSchema>({
  name,
  label = "Message",
  className,
  placeholder,
}: MessageFieldProps<T>) => {
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
            <Textarea
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              required
              rows={4}
            />
          </FormControl>
          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
