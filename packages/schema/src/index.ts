// TODO: i18n for validation messages
// https://next-safe-action.dev/docs/define-actions/validation-errors#create-custom-validation-errors

import { z } from "zod";
import {
  locales,
  PRODUCT_TYPES,
  type ProductTypeId,
  INQUIRY_FREQUENCIES,
  COUNTRIES_REGIONS,
  INQUIRY_TIMELINES,
  CUSTOMER_TYPES,
  INQUIRY_EMPLOYEES,
} from "@synoem/config";

const createEnumSchema = <T extends readonly { value: string }[]>(values: T) =>
  z.enum(values.map((v) => v.value) as [string, ...string[]]);

export const localeSchema = z.object({
  locale: z.enum(locales),
});

export const globalSlugSchema = z
  .object({
    slug: z.string(),
  })
  .merge(localeSchema);

export const productSchema = z
  .object({
    slug: z.string(),
    productTypeId: z.enum(
      Object.values(PRODUCT_TYPES).map((productType) => productType.id) as [
        ProductTypeId,
        ...ProductTypeId[],
      ],
    ),
  })
  .merge(localeSchema);

export const productFilterMetadataSchema = z
  .object({
    productTypeId: z.enum(
      Object.values(PRODUCT_TYPES).map((productType) => productType.id) as [
        ProductTypeId,
        ...ProductTypeId[],
      ],
    ),
  })
  .merge(localeSchema);

export const faqSchema = z
  .object({
    type: z.enum(["general", ...Object.values(PRODUCT_TYPES).map((category) => category.id)]),
  })
  .merge(localeSchema);

export const termsSchema = z.object({
  terms: z.coerce.boolean().refine((bool) => bool === true, {
    message: "You must agree to our terms and conditions", // TODO:return message key instead
  }),
});

export const basicInquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, "Invalid phone number format"),
  message: z.string().min(10),
  contactEmail: z.boolean().optional(),
  contactPhone: z.boolean().optional(),
  contactWhatsapp: z.boolean().optional(),
});

export const companyInquirySchema = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  type: createEnumSchema(CUSTOMER_TYPES).optional(),
  country: createEnumSchema(COUNTRIES_REGIONS).optional(),
  website: z.string().optional(),
  employees: createEnumSchema(INQUIRY_EMPLOYEES).optional(),
});

export const productInquirySchema = z.object({
  productTypeId: z
    .enum(
      Object.values(PRODUCT_TYPES).map((productType) => productType.id) as [
        ProductTypeId,
        ...ProductTypeId[],
      ],
    )
    .optional(),
  productName: z.string().optional(),
  quantity: z.number().optional(),
  quantityUnit: z.string().optional(),
  frequency: createEnumSchema(INQUIRY_FREQUENCIES).optional(),
  destination: createEnumSchema(COUNTRIES_REGIONS).optional(),
  timeline: createEnumSchema(INQUIRY_TIMELINES).optional(),
  relatedProductId: z.string().optional(),
  attachments: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= 10 * 1024 * 1024)
        .refine(
          (file) =>
            ["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(file.type), // TODO
        ),
    )
    .max(3)
    .optional(),
});

const metadataSchema = z.object({
  page: z.string(),
  ipAddress: z.string().nullable(),
  userAgent: z.string(),
});

export const inquiryFormSchema = basicInquirySchema
  .merge(companyInquirySchema)
  .merge(productInquirySchema)
  .merge(termsSchema)
  .merge(
    z.object({
      token: z.string(),
    }),
  );

export const newsletterFormSchema = z.object({
  email: z.string().email(),
});

export const unsubscribeNewsletterFormSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});

export const newsletterSchema = newsletterFormSchema.merge(metadataSchema);

export const pageSchema = z
  .object({
    slug: z.string(),
  })
  .merge(localeSchema);

export const pathSchema = z
  .object({
    path: z.string(),
    depth: z.number().optional().default(2),
  })
  .merge(localeSchema);
