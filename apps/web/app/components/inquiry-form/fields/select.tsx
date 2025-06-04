// TODO: support native select on mobile

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@synoem/ui/components/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@synoem/ui/components/form";
import { type Path, useFormContext } from "react-hook-form";
import type { z } from "zod";
import { cn } from "@synoem/ui/lib/utils";

interface SelectFieldProps<T extends z.ZodSchema> {
  name: Path<z.infer<T>>;
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export const SelectField = <T extends z.ZodSchema>({
  name,
  label,
  options,
  required,
  placeholder,
  className,
}: SelectFieldProps<T>) => {
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
            <Select {...field} value={field.value ?? ""} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
