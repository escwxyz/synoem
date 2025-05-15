import type { RouterClient } from "@orpc/server";
import { getHeader, getFooter, getSocialLinks } from "../procedures/globals";
import { generateProductParams } from "../procedures/paths";
import {
  getNotification,
  getProductBySlug,
  getProductCategoryBySlug,
  getProductFilterMetadata,
  getFaq,
  createSimpleInquiry,
  createProductInquiry,
  createNewsletter,
} from "../procedures/collections";

export const router = {
  globals: {
    getHeader,
    getFooter,
    getSocialLinks,
  },
  paths: {
    generateProductParams,
  },
  collections: {
    getNotification,
    getProductBySlug,
    getProductCategoryBySlug,
    getProductFilterMetadata,
    getFaq,
    createSimpleInquiry,
    createProductInquiry,
    createNewsletter,
  },
};

export type RouterDefinition = typeof router;
export type APIClient = RouterClient<RouterDefinition>;
