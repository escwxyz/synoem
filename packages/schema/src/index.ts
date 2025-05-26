// TODO: i18n for validation messages

import { z } from "zod";
import {
  locales,
  PRODUCT_TYPES,
  type ProductTypeId,
  INQUIRY_FREQUENCIES,
  COUNTRIES_REGIONS,
  INQUIRY_TIMELINES,
} from "@synoem/config";

export const localeSchema = z.object({
  locale: z.enum(locales),
});

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

export const simpleInquiryFormSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(5),
    requirements: z.string().min(10),
  })
  .merge(termsSchema);

const metadataSchema = z.object({
  page: z.string(),
  ipAddress: z.string().nullable(),
  userAgent: z.string(),
});

export const simpleInquirySchema = simpleInquiryFormSchema.merge(metadataSchema);

export const productInquiryFormSchema = z
  .object({
    productTypeId: z.enum(
      Object.values(PRODUCT_TYPES).map((productType) => productType.id) as [
        ProductTypeId,
        ...ProductTypeId[],
      ],
    ),
    productName: z.string().min(2),
    quantity: z.number().min(1),
    quantityUnit: z.string(),
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
  })
  .merge(simpleInquiryFormSchema);

export const productInquirySchema = productInquiryFormSchema.merge(metadataSchema);

export const newsletterFormSchema = z.object({
  email: z.string().email(),
});

export const unsubscribeNewsletterFormSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});

export const newsletterSchema = newsletterFormSchema.merge(metadataSchema);

export const fileSchema = z.instanceof(File);
