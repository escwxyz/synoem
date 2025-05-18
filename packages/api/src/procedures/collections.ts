import { orpc } from "../orpc";
import type { APIResponse } from "../types/api-response";
import type { Notification } from "@synoem/payload/payload-types";
import type { ProductTypeId } from "@synoem/config";
import type { BasePayload } from "@synoem/payload/types";
import {
  localeSchema,
  productSchema,
  productFilterMetadataSchema,
  faqSchema,
  simpleInquirySchema,
  productInquirySchema,
  newsletterSchema,
} from "@synoem/schema";
import {
  getProductHelper,
  getProductCategoryHelper,
  getProductFilterMetadataHelper,
  getFaqHelper,
  getNotificationHelper,
  createSimpleInquiryHelper,
  createProductInquiryHelper,
  createNewsletterHelper,
  getProductsHelper,
} from "../helpers";

// ------------- Procedures -------------

export const getProducts = orpc
  .input(productFilterMetadataSchema)
  .handler(async ({ input, context }) => {
    return getProductsHelper<ProductTypeId>(input, context.payload);
  });

export const getNotification = orpc
  .input(localeSchema)
  .handler(async ({ input, context }): Promise<APIResponse<Notification | null>> => {
    return getNotificationHelper(input, context.payload);
  });

export const getProductBySlug = orpc.input(productSchema).handler(async ({ input, context }) => {
  return getProductHelper<ProductTypeId>(input, context.payload);
});

export const getProductCategoryBySlug = orpc
  .input(productSchema)
  .handler(async ({ input, context }) => {
    return getProductCategoryHelper<ProductTypeId>(input, context.payload);
  });

export const getProductFilterMetadata = orpc
  .input(productFilterMetadataSchema)
  .handler(async ({ input, context }) => {
    return getProductFilterMetadataHelper<ProductTypeId>(input, context.payload);
  });

export const getFaq = orpc.input(faqSchema).handler(async ({ input, context }) => {
  return getFaqHelper(input, context.payload);
});

export const createSimpleInquiry = orpc
  .input(simpleInquirySchema)
  .handler(async ({ input, context }) => {
    return createSimpleInquiryHelper(input, context.payload);
  });

export const createProductInquiry = orpc
  .input(productInquirySchema)
  .handler(async ({ input, context }) => {
    return createProductInquiryHelper(input, context.payload);
  });

export const createNewsletter = orpc.input(newsletterSchema).handler(async ({ input, context }) => {
  return createNewsletterHelper(input, context.payload);
});
