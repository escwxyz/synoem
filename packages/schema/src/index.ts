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
    message: "You must agree to our terms and conditions",
  }),
});

export const basicInquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().min(10),
});

export const companyInquirySchema = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  type: z
    .enum(Object.values(CUSTOMER_TYPES).map((type) => type.value) as [string, ...string[]])
    .optional(),
  country: z
    .enum(Object.values(COUNTRIES_REGIONS).map((country) => country.value) as [string, ...string[]])
    .optional(),
  website: z.string().optional(),
  employees: z
    .enum(
      Object.values(INQUIRY_EMPLOYEES).map((employee) => employee.value) as [string, ...string[]],
    )
    .optional(),
  contactEmail: z.boolean().optional(),
  contactPhone: z.boolean().optional(),
  contactWhatsapp: z.boolean().optional(),
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
  frequency: z
    .enum(
      Object.values(INQUIRY_FREQUENCIES).map((frequency) => frequency.value) as [
        string,
        ...string[],
      ],
    )
    .optional(),
  destination: z
    .enum(
      Object.values(COUNTRIES_REGIONS).map((destination) => destination.value) as [
        string,
        ...string[],
      ],
    )
    .optional(),
  timeline: z
    .enum(
      Object.values(INQUIRY_TIMELINES).map((timeline) => timeline.value) as [string, ...string[]],
    )
    .optional(),
  relatedProductId: z.string().optional(),
  attachments: z.array(z.instanceof(File)).max(3).optional(),
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
