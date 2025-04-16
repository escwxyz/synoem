"use client";

import type { ProductFormValues } from "~/schemas/inquiry";
import {
  FormControl,
  FormMessage,
  FormLabel,
  FormItem,
  FormField,
  FormDescription,
} from "@synoem/ui/components/form";
import type { UseFormReturn } from "react-hook-form";
import {
  EmailField,
  PhoneField,
  SelectField,
  TermsField,
  TextField,
} from "./form-fields";
import { FileUploader } from "./FileUploader";
import { Textarea } from "@synoem/ui/components/textarea";
import { Input } from "@synoem/ui/components/input";
import { quantityUnits } from "@synoem/config";
import { Separator } from "@synoem/ui/components/separator";

export const ProductInquiryForm: React.FC<{
  form: UseFormReturn<ProductFormValues>;
}> = ({ form }) => {
  return (
    <div className="flex flex-col gap-4">
      <TextField name="name" form={form} label="Full Name" />
      <EmailField name="email" form={form} label="Email" />
      <PhoneField name="phone" form={form} label="Phone Number" />
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

      <TextField
        name="productCategory"
        form={form}
        label="Product Category"
        disabled
      />
      <TextField name="productName" form={form} label="Product Name" disabled />

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Estimated Quantity <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    value={field.value ?? 1}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1">
          <SelectField
            form={form}
            name="quantityUnit"
            options={quantityUnits}
          />
        </div>
      </div>
      <FormField
        control={form.control}
        name="attachments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Attachments (Optional, max 3 files)</FormLabel>
            <FormControl>
              <FileUploader
                onFilesChange={field.onChange}
                maxFiles={3}
                disabled={form.formState.isSubmitting}
                className="mt-2"
                label="Drag & drop files here or"
                description="click to browse files"
                supportedFileTypes="PDF, Word, Excel, JPG, PNG (max 3 files, 10MB total)"
              />
            </FormControl>
            <FormMessage />
            <FormDescription>
              Upload any relevant documents (PDF, Word, Excel) or images
            </FormDescription>
          </FormItem>
        )}
      />

      <TermsField form={form} name="terms" />
    </div>
  );
};
