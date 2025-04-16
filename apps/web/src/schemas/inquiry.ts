import { z } from "astro:schema";
import { termsSchema } from "./terms";

// TODO: validate phone number
const baseFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  requirements: z.string().min(10),
});

const productInquirySchema = z.object({
  productCategory: z.string().min(1),
  productName: z.string().min(2),
  quantity: z.number().min(1),
  quantityUnit: z.string(),
  frequency: z.string().optional(),
  destination: z.string().optional(),
  timeline: z.string().optional(),
  relatedProductId: z.number().optional(),
  relatedProductType: z.enum(["solar-panels", "pump-controllers"]).optional(),
  attachments: z.array(z.instanceof(File)).max(3).optional(),
});

export const simpleFormSchema = baseFormSchema.merge(termsSchema);

export const productFormSchema = baseFormSchema
  .merge(productInquirySchema)
  .merge(termsSchema);

export type SimpleFormValues = z.infer<typeof simpleFormSchema>;
export type ProductFormValues = z.infer<typeof productFormSchema>;
