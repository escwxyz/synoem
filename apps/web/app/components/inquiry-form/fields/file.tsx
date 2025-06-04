"use client";

import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@synoem/ui/components/form";
import { cn } from "@synoem/ui/lib/utils";
import { useTranslations } from "next-intl";
import { type FieldPath, useFormContext } from "react-hook-form";
import type { z } from "zod";
import { FileUploader } from "~/components/file-uploader.client";

interface FileFieldProps<T extends z.ZodSchema> {
  name: FieldPath<z.infer<T>>;
  className?: string;
  label?: string;
  required?: boolean;
}

export const FileField = <T extends z.ZodSchema>({
  name,
  className,
  label,
  required,
}: FileFieldProps<T>) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<z.infer<T>>();

  const t = useTranslations("InquiryFormFields");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <FileUploader
              onFilesChange={field.onChange}
              maxFiles={3}
              disabled={isSubmitting}
              label={t("attachments.uploader.label")}
              description={t("attachments.uploader.description")}
              supportedFileTypes={t("attachments.uploader.supportedFileTypes")}
            />
          </FormControl>
          {errors[name] && <FormMessage>{errors[name]?.message as string}</FormMessage>}
        </FormItem>
      )}
    />
  );
};
