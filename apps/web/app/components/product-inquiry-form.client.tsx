"use client";

// TODO: i18n & polish

import type { z } from "zod";
import type { productInquiryFormSchema } from "@synoem/schema";
import {
  FormControl,
  FormMessage,
  FormLabel,
  FormItem,
  FormField,
  FormDescription,
} from "@synoem/ui/components/form";
import type { UseFormReturn } from "react-hook-form";
import { FileUploader } from "./file-uploader.client";
import { Textarea } from "@synoem/ui/components/textarea";
import { Input } from "@synoem/ui/components/input";
import { Separator } from "@synoem/ui/components/separator";
import { useTranslations } from "next-intl";
import { Checkbox } from "@synoem/ui/components/checkbox";
import { QuantityInput } from "./quantity-input.client";

export const ProductInquiryForm: React.FC<{
  form: UseFormReturn<z.infer<typeof productInquiryFormSchema>>;
}> = ({ form }) => {
  const t = useTranslations("ProductInquiryForm");

  return (
    <div className="flex flex-col gap-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Requirements <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator />

      <FormField
        control={form.control}
        name="productTypeId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Category</FormLabel>
            <FormControl>
              <Input disabled {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="productName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input disabled {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <QuantityInput
        control={form.control}
        name="quantity"

        label={t("ProductInquiryForm.quantity.label")}
        description={t("ProductInquiryForm.quantity.description")}
      /> */}
      <FormField
        control={form.control}
        name="attachments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("attachments.label")}</FormLabel>
            <FormControl>
              <FileUploader
                onFilesChange={field.onChange}
                maxFiles={3}
                disabled={form.formState.isSubmitting}
                className="mt-2"
                label={t("attachments.uploader.label")}
                description={t("attachments.uploader.description")}
                supportedFileTypes={t("attachments.uploader.supportedFileTypes")}
              />
            </FormControl>
            <FormMessage />
            <FormDescription>{t("attachments.description")}</FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="terms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
            <span className="text-red-500">*</span>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
