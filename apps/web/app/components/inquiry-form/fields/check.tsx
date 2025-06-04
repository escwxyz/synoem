"use client";

import { Checkbox } from "@synoem/ui/components/checkbox";
import { FormControl, FormItem, FormField, FormLabel } from "@synoem/ui/components/form";
import { cn } from "@synoem/ui/lib/utils";
import { useFormContext } from "react-hook-form";

interface CheckFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const CheckField = ({ name, label, required, className }: CheckFieldProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex items-center space-x-3", className)}>
          <FormControl>
            <Checkbox
              {...field}
              checked={!!field.value}
              onCheckedChange={field.onChange}
              className="h-5 w-5"
            />
          </FormControl>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
        </FormItem>
      )}
    />
  );
};
